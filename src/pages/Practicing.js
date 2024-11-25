import React, { useEffect, useRef, useState } from "react";
import "../style/Practicing.css";
import { useLocation } from "react-router-dom";

const Practicing = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const { question } = location.state || { question: "" }; // 전달된 질문 또는 기본값

  const [timer, setTimer] = useState(0); // 타이머 상태
  const [isRecording, setIsRecording] = useState(false); // 녹화 상태
  const [mediaStream, setMediaStream] = useState(null); // 미디어 스트림 상태

  // 카메라 스트림 설정 및 자동 녹화 시작
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream); // 스트림을 상태에 저장
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = "scaleX(-1)"; // 카메라 좌우 반전
        }
        setIsRecording(true); // 자동으로 녹화 시작
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getUserMedia();

    return () => {
      // 컴포넌트 언마운트 시 스트림 종료
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // 한 번만 실행되도록 빈 의존성 배열 사용

  // 타이머 관리
  useEffect(() => {
    let interval = null;

    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRecording, timer]);

  // 녹화 상태 토글
  const toggleRecording = () => {
    if (isRecording) {
      // 녹화 중지 및 카메라 끄기
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      setMediaStream(null); // 스트림 상태 초기화
    } else {
      // 녹화 다시 시작 (카메라 재설정)
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = "scaleX(-1)";
        }
      });
    }
    setIsRecording(!isRecording); // 녹화 상태 토글
  };

  const finish = () => {
    window.history.back();
  };

  const handleNextQuestion = () => {
    alert("모든 질문이 완료되었습니다.");
    setTimer(0); // 타이머 초기화
    setIsRecording(false); // 녹화 상태 초기화
  };

  return (
    <div className="practicing-container">
      <div className="header-container">
        <img src="/logo2.png" className="logo" alt="Logo" />
        <img src="/progress2.png" className="step" alt="Progress" />
        <button className="finish-button" onClick={finish}>
          끝내기
        </button>
      </div>
      <div className="question-box">
        <p>{question ? question : "질문이 없습니다. 돌아가서 선택해주세요."}</p>
        <div className="video-container">
          <video ref={videoRef} className="video" autoPlay muted />
          <div className="timer-container">
            <div className="timer">
              {`${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(
                timer % 60
              ).padStart(2, "0")}`}
            </div>
            <button id="submit-button" onClick={handleNextQuestion}>
              답변 제출하기
            </button>
            <div className="recorder">
              <div className="rec-indicator">
                <div className="red-circle"></div>
                <button className="rec-button" onClick={toggleRecording}>
                  {isRecording ? "STOP" : "REC"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practicing;
