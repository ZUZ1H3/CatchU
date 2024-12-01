import React, { useEffect, useRef, useState } from "react";
import "../style/Practicing.css";
import { useLocation, useNavigate } from "react-router-dom";

const Practicing = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { question } = location.state || { question: "" };
  const questionsArray = question.split("., ");

  const [currentQidx, setCurrentQidx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [highlightChunks, setHighlightChunks] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [dotVisible, setDotVisible] = useState(true);

  useEffect(() => {
    setIsRecording(true);
  }, []);
  
  // 카메라 스트림 초기화
  useEffect(() => {
    if (isRecording && !mediaStream) {
      const initializeStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setMediaStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.style.transform = "scaleX(-1)";
          }

          const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
          setMediaRecorder(recorder);

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setHighlightChunks((prev) => [...prev, event.data]);
            }
          };
          recorder.start();
        } catch (error) {
          console.error("카메라 및 마이크 스트림 초기화 오류:", error);
          alert("카메라에 접근할 수 없습니다.");
        }
      };

      initializeStream();
    } else if (!isRecording && mediaStream) {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
      mediaStream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setMediaStream(null);
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isRecording]);

  // 타이머 관리 및 점 깜빡임
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        setDotVisible((prevVisible) => !prevVisible);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const submitAnswer = () => {
    if (isRecording) {
      toggleRecording(); // 녹화를 중지
    }

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    try {
      const highlightBlob = new Blob(highlightChunks, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(highlightBlob);

      setVideoUrls((prev) => {
        const updatedVideoUrls = [...prev, videoUrl];

        if (currentQidx < questionsArray.length - 1) {
          // 다음 질문으로 이동
          setCurrentQidx(currentQidx + 1);
          setTimer(0);
          setHighlightChunks([]); // 다음 질문을 위해 초기화
        } else {
          setTimeout(() => {
            navigate("/end-practice", { state: { videoUrls: updatedVideoUrls }, replace: true });
          }, 0);
        }

        return updatedVideoUrls;
      });
    } catch (error) {
      console.error("비디오 URL 생성 실패:", error);
      alert("비디오 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
      setIsRecording(false);
    }
  };

  const finish = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    navigate(-1);
  };

  return (
    <div className="practicing-container">
      <div id="header-container">
        <img src="/logo2.png" className="logo" alt="Logo" />
        <img src="/progress2.png" className="step" alt="Progress" />
        <button id="finish-button" onClick={finish}>
          끝내기
        </button>
      </div>
      <div className="question-box">
        <div id="q">
          질문 {currentQidx + 1} / {questionsArray.length}
        </div>
        <p>{questionsArray[currentQidx]}</p>
        <div className="video-container">
          <video ref={videoRef} className="video" autoPlay muted />
          <div className="rec-indicator">
            <div
              className="red-circle"
              style={{ visibility: dotVisible ? "visible" : "hidden" }}
            ></div>
            <button className="rec-button" onClick={toggleRecording}>
              {isRecording ? "REC" : "STOP"}
            </button>
          </div>
          <div className="timer-container">
            <div className="timer">
              {`${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`}
            </div>
            <button id="submit-button" onClick={submitAnswer}>
              답변 제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practicing;
