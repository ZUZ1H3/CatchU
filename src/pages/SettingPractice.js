import React, { useRef, useState } from "react";
import "../style/SettingPractice.css";
import { useLocation, useNavigate } from "react-router-dom";

const SettingPractice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null); // 비디오 태그 참조
  const canvasRef = useRef(null); // 캔버스 태그 참조 (오디오 시각화)
  const audioContextRef = useRef(null); // Web Audio API AudioContext
  const analyserRef = useRef(null); // AnalyserNode
  const animationRef = useRef(null); // 애니메이션 프레임 ID
  const { question } = location.state || { question: "" }; // 전에 선택한 질문

  const [isImageVisible, setIsImageVisible] = useState(true); // 이미지 표시 여부 관리
  const [isCameraOn, setIsCameraOn] = useState(false); // 카메라 상태 관리
  const [hasBorder, setHasBorder] = useState(false); // 테두리 상태 관리
  const [faceRecognitionStatus, setFaceRecognitionStatus] = useState("default"); // 얼굴 인식 상태
  const [micRecognitionStatus, setMicRecognitionStatus] = useState("default"); // 마이크 인식 상태
  const [buttonText, setButtonText] = useState("시작하기"); // 버튼 텍스트 관리
  const [visualizationType, setVisualizationType] = useState("bar"); // 시각화 타입 선택 상태

  // 카메라 켜기 및 끄기
  const toggleCamera = async () => {
    if (isCameraOn) {
      // 카메라 끄기
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
      stopAudioVisualization();
    } else {
      // 카메라 켜기
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.style.transform = "scaleX(-1)";
          videoRef.current.srcObject = stream;
        }
        
        setIsCameraOn(true);
        startAudioVisualization(stream, visualizationType);
        // 3초 후 "얼굴 인식 성공" 상태로 변경
        setTimeout(() => {
          setFaceRecognitionStatus("success");
        }, 3000);
      } catch (err) {
        console.error("웹캠과 마이크 권한을 허용해주세요:", err);
        setFaceRecognitionStatus("failure");
        setMicRecognitionStatus("failure");
      }
    }
  };

  // 오디오 시각화
  const startAudioVisualization = (stream, type = "bar") => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
  
    analyser.fftSize = 256; // 분석 크기 설정
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    source.connect(analyser);
  
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    let silenceTimer = null; // 음량 변화 감지 타이머
    let audioDetected = false; // 음량 감지 여부
  
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      // 캔버스 배경을 명시적으로 설정
      canvasCtx.fillStyle = "rgb(0, 0, 0)"; // 검정색 배경
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height); // 배경 칠하기

      analyser.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  
      if (type === "bar") {
        // 막대그래프 스타일
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        audioDetected = false; // 기본적으로 음량 없음

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;
  
          if (barHeight > 10) {
            // 음량이 일정 수준 이상이면 감지됨
            audioDetected = true;
          }

        // 음량에 따라 색상과 투명도 조정
        const opacity = Math.min(1, barHeight / 128);
        canvasCtx.fillStyle = `rgba(57, 62, 104, ${opacity})`;
        
        const yOffset = 20; // 위로 이동할 픽셀 수
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight - yOffset, // 바닥에서 위로 약간 띄움
          barWidth,
          barHeight
        );
    
        x += barWidth + 1;  
        }
        
      } else if (type === "wave") {
        // 파동 스타일
        analyser.getByteTimeDomainData(dataArray);
  
        canvasCtx.lineWidth = 10;
        canvasCtx.strokeStyle = "rgb(255, 255, 255)"; // 흰색
        canvasCtx.beginPath();
  
        const sliceWidth = canvas.width / bufferLength;
        let x = 0;
        audioDetected = false; // 기본적으로 음량 없음
  
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (v > 1.05 || v < 0.95) {
            // 일정 데시벨 변화 감지
            audioDetected = true;
          }
  
          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
  
          x += sliceWidth;
        }
  
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }
      micDetection();
    };
  
    // 오디오 감지
    const micDetection = () => {
      if (audioDetected) {
        silenceTimer = setTimeout(() => {
          setMicRecognitionStatus("success"); // 음성 인식 성공
          stopAudioVisualization(); // 성공 시 오디오 시각화 중단
        }, 3000); // 3초 동안 지속되면 성공으로 간주
      } else {
        clearTimeout(silenceTimer);
        setMicRecognitionStatus("default");
      }
    };

    draw();
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
  };
  // 오디오 시각화 중지
  const stopAudioVisualization = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const getCameraImage = () => {
    switch (faceRecognitionStatus) {
      case "success":
        return "/setting-camera-success.png";
      case "failure":
        return "/setting-camera-failed.png";
      default:
        return "/setting-camera.png";
    }
  };

  const getMicImage = () => {
    switch (micRecognitionStatus) {
      case "success":
        return "/setting-mic-success.png";
      case "failure":
        return "/setting-mic-failed.png";
      default:
        return "/setting-mic.png";
    }
  };
  const finish = () => {
    navigate(-1);
  };

  // 시작, 다시하기 버튼
  const handleButtonClick = () => {
    toggleCamera();
    if (buttonText === "시작하기") {
      // 시작하기 버튼 클릭 시
      setIsImageVisible(false); // 설정 이미지 숨기기
      setHasBorder(true); // 테두리 표시
      setButtonText("다시하기");
      
    } else {
      // 다시하기 버튼 클릭 시
      setButtonText("시작하기");
      setIsImageVisible(true);
      setHasBorder(false); // 테두리 제거
      setFaceRecognitionStatus("default"); // 얼굴 인식 상태 기본
      setMicRecognitionStatus("default"); // 마이크 인식 상태 기본
  
      // 오디오 시각화 정지 및 캔버스 초기화
      stopAudioVisualization();
    }
  };

  const goToPracting = () => {
    if (faceRecognitionStatus === "success" && micRecognitionStatus === "success") {
      // 모든 화면 중단
      stopAudioVisualization();
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
  
      // 다음 화면으로 이동
      navigate("/practicing", { state: { question }, replace: true });
    }
  };
  

  return (
    <div className="setting-practice-container">
      <div id="header-container">
        <img src="/logo2.png" className="logo" alt="Logo" />
        <img src="/progress1.png" className="step" alt="Progress" />
        <button id="finish-button" onClick={finish}>
          끝내기
        </button>
      </div>
      <div id="body-container">
      <h3 id="setting">
        웹캠과 마이크 체크를 시작합니다.
        <br />
        시작하기 버튼을 누르고 가이드 선 안에 얼굴을 위치시켜 <br />
        5초 이내에{" "}
        <span id="color">“안녕하세요 만나서 반갑습니다”</span> 문구를 소리내어
        읽어주세요.
      </h3>

      <div className="video-and-settings-section">
      <div className="video-section">
        <div id="video-box" className={hasBorder ? "video-box-with-border" : "video-box-no-border"}
        >
          {isImageVisible && (
            <img src="/setting.png" alt="Img" id="setting-img" />
        )}
          <video ref={videoRef} className="video-feed" autoPlay muted />
        </div>

        <div className="recognition-status">
          {/* 얼굴 인식 상태 박스 */}
          <div id="setting-boxes">
          <img src={getCameraImage()} alt="Camera Status" id="status-setting-img" />
          <div id="setting-text-container">
              <p id="setting-title">
                {faceRecognitionStatus === "success"
                  ? "얼굴 인식 성공"
                  : faceRecognitionStatus === "failure"
                  ? "얼굴 인식 실패"
                  : "얼굴 인식 대기 중"}
              </p>
              <p id="setting-text">
                {faceRecognitionStatus === "success"
                  ? "얼굴이 인식되었어요."
                  : faceRecognitionStatus === "failure"
                  ? "얼굴 인식에 실패했어요."
                  : "얼굴을 가이드 선 안에 위치해주세요."}
              </p>
            </div>
          </div>

          {/* 음성 인식 상태 박스 */}
          <div id="setting-boxes">
            <img src={getMicImage()} alt="Mic Status" id="status-setting-img" />
            <div id="setting-text-container">
              <p id="setting-title">
                {micRecognitionStatus === "success"
                  ? "음성 인식 성공"
                  : micRecognitionStatus === "failure"
                  ? "음성 인식 실패"
                  : "음성 인식 대기 중"}
              </p>
              <p id="setting-text">
                {micRecognitionStatus === "success"
                  ? "음성이 인식되었어요."
                  : micRecognitionStatus === "failure"
                  ? "음성 인식에 실패했어요."
                  : "음성을 가이드에 맞춰 말해주세요."}
              </p>
            </div>
          </div>
          </div>

          {/* 오디오 시각화 캔버스 */}
          <div className="audio-visualizer-section">
            {faceRecognitionStatus === "success" && micRecognitionStatus === "success" ? (
              <div className="success-container">
                <img src="/setting-checked.png" alt="Mic Status" id="mic-setting-img" />
                <p id="success-text">얼굴과 음성이 모두 정상적으로 인식되었습니다.</p>
              </div>
            ) : (
              <canvas ref={canvasRef} id="audio-visualizer" />
            )}
            <div className="audio-buttons">
              <button id="btn-audio" onClick={() => setVisualizationType("bar")}>
                막대
              </button>
              <button id="btn-audio" onClick={() => setVisualizationType("wave")}>
                파형
              </button>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div id="buttons-group">
            <button id="again-button" onClick={handleButtonClick}>
              {buttonText}
            </button>
            <button id="start-button" onClick={goToPracting}
              disabled={faceRecognitionStatus !== "success" || micRecognitionStatus !== "success"}>              면접 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SettingPractice;
