import React, { useState, useEffect } from "react";
import "../style/AIInterview.css";

const AIInterview = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(""); // 선택된 산업군
  const [jobs, setJobs] = useState([]); // 선택된 직무 리스트
  const [selectedJob, setSelectedJob] = useState(""); // 선택된 직무
  const [showConfirmation, setShowConfirmation] = useState(false); // 화면 전환 상태
  const [countdown, setCountdown] = useState(10); // 카운트다운 상태
  const [showPreparingScreen, setShowPreparingScreen] = useState(false); // 녹화 화면 표시 상태
  const [showAIInterviewScreen, setShowAIInterviewScreen] = useState(false); // AI 면접 화면 상태
  const [micOn, setMicOn] = useState(true); // 마이크 상태
  const [cameraOn, setCameraOn] = useState(true); // 카메라 상태
  const [microphoneImage, setMicrophoneImage] = useState(""); // 마이크 이미지 경로
  const [currentStep, setCurrentStep] = useState(1); // 현재 면접 단계
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // 현재 영상 인덱스 (0: 메인, 1: listening)

  const industryJobs = {
    // 산업군 및 직무 데이터
    "IT / 데이터": ["소프트웨어 / 웹 / 앱", "빅데이터", "인공지능", "정보보안", "네트워크 / 서버"],
    "화학 / 에너지 / 환경": ["환경 엔지니어", "화학 연구원", "에너지 컨설턴트"],
    "목재 / 가구 / 제지": ["목재 디자이너", "가구 제작자", "제지 기술자"],
    "판매 / 유통 / 영업 / 무역": ["영업 사원", "무역 전문가", "유통 관리사"],
    "식품": ["식품 연구원", "품질 관리 전문가", "식품 디자이너"],
    "외국어 면접": ["영어 통역사", "중국어 번역가", "일본어 전문가"],
    "정치": ["정치 컨설턴트", "정책 분석가", "공공 행정 전문가"],
  };

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setJobs(industryJobs[industry] || []);
    setSelectedJob(""); // 새로운 산업군을 선택하면 직무 선택 초기화
  };

  const handleJobClick = (job) => {
    setSelectedJob(job); // 선택된 직무 업데이트
  };

  const handleConfirmClick = () => {
    if (selectedIndustry && selectedJob) {
      setShowConfirmation(true); // 화면 전환
    } else {
      alert("산업군과 직무를 모두 선택해주세요!");
    }
  };

  const handleGoBack = () => {
    setShowConfirmation(false); // 이전 화면으로 돌아가기
  };

  const handleStartClick = () => {
    setShowPreparingScreen(true); // 준비 화면으로 전환
  };

  useEffect(() => {
    if (showPreparingScreen && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      setShowPreparingScreen(false);
      setShowAIInterviewScreen(true); // 모의면접 화면으로 전환
    }
  }, [showPreparingScreen, countdown]);

  useEffect(() => {
    if (showPreparingScreen) {
      const videoElement = document.querySelector("#camera-feed");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true }) // 오디오 포함 요청
          .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();
            setMicrophoneImage("../mic.png"); // 마이크 정상 이미지
          })
          .catch((err) => {
            console.error("마이크 또는 카메라를 사용할 수 없습니다:", err);
            setMicrophoneImage("../mic_no.png"); // 마이크 비정상 이미지
          });
      }
    }
  }, [showPreparingScreen]);

  useEffect(() => {
    if (showAIInterviewScreen) {
      const videoElement = document.querySelector("#user-camera");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();
          })
          .catch((err) => {
            console.error("카메라를 사용할 수 없습니다:", err);
          });
      }
    }
  }, [showAIInterviewScreen]);

  const handleVideoEnd = () => {
    if (currentStep < 6 && currentVideoIndex === 0) {
      // 메인 영상 끝 → listening 영상으로 전환
      setCurrentVideoIndex(1);
    } else {
      // listening 영상 끝 or step6 영상 끝 → 다음 단계로 이동
      setCurrentVideoIndex(0); // 메인 영상으로 초기화
      if (currentStep < 6) {
        setCurrentStep((prev) => prev + 1);
      } else {
        alert("면접이 완료되었습니다!");
        setShowAIInterviewScreen(false); // 면접 종료
      }
    }
  };

  const getStepVideo = () => {
    const steps = [
      "interviewer_step1.mp4",
      "interviewer_listening.mp4",
      "interviewer_step2.mp4",
      "interviewer_listening.mp4",
      "interviewer_step3.mp4",
      "interviewer_listening.mp4",
      "interviewer_step4.mp4",
      "interviewer_listening.mp4",
      "interviewer_step5.mp4",
      "interviewer_listening.mp4",
      "interviewer_step6.mp4",
    ];
  
    const stepIndex = (currentStep - 1) * 2; // 단계별 시작 인덱스 계산
    if (currentStep < 6) {
      // step1~step5는 step과 listening까지 포함
      return steps[stepIndex + currentVideoIndex]; // 0: step, 1: listening
    } else {
      // step6은 "listening" 없이 해당 영상만 재생
      return steps[stepIndex];
    }
  };  

  if (showAIInterviewScreen) {
    return (
      <div className="ai-interview-screen">
        {/* 맨 위 바 */}
        <div className="top-bar-container">
          <img src="../bar_top.png" alt="Top Bar" className="bar-top" />
          <img
            src={`../progress_step${currentStep}.png`}
            alt={`Progress Step ${currentStep}`}
            className="progress-indicator"
          />
        </div>
  
        {/* 면접관 동영상 */}
        <video
          className="interviewer-video"
          src={`../${getStepVideo()}`}
          autoPlay
          onEnded={handleVideoEnd}
          controls={false}
        ></video>
  
        {/* 사용자 카메라 화면 */}
        <div className="user-camera-container">
          <video id="user-camera" autoPlay muted></video>
        </div>
  
        {/* 맨 아래 바 */}
        <div className="bottom-bar-container">
          <img src="../bar_bottom.png" alt="Bottom Bar" className="bar-bottom" />
          <div className="status-buttons">
            <img
              src={micOn ? "../mic.png" : "../mic_no.png"}
              alt="Mic Status"
              className="mic-status"
              onClick={() => setMicOn((prev) => !prev)}
            />
            <img
              src={cameraOn ? "../video.png" : "../video_no.png"}
              alt="Video Status"
              className="video-status"
              onClick={() => setCameraOn((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    );
  }  

  if (showPreparingScreen) {
    return (
      <div className="preparing-screen">
        <div className="countdown-timer">{countdown}</div>
        <div className="camera-container">
          <video id="camera-feed" autoPlay muted></video>
        </div>
        <div className="instructions">
          면접이 {countdown}초 뒤에 시작됩니다.
          <br />
          카메라 및 마이크의 작동 여부를 확인해주세요.
        </div>
        <div className="microphone-status">
          <img src={microphoneImage} alt="마이크" />
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="confirmation-screen">
        <label htmlFor="confirmation" className="confirmation-label">
          <span className="highlight-text">{selectedIndustry}</span> 산업군의{" "}
          <span className="highlight-text">{selectedJob}</span> 직무로{" "}
          <br />
          AI 모의면접을 시작하겠습니까?
        </label>
        <div className="button-container2">
          <button className="back-button" onClick={handleGoBack}>
            이전으로
          </button>
          <button className="start-button" onClick={handleStartClick}>
            시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 검색 및 선택 화면 */}
      <div className="search-container">
        <label htmlFor="search" className="search-label">
          직무를 선택해주세요.
        </label>
        <input
          type="text"
          id="search"
          className="search-input"
          placeholder="직무 키워드를 검색해 보세요"
        />
      </div>

      <div className="ai-interview-container">
        <div className="table-wrapper">
          <div className="table-column industry-column">
            <div className="table-header">산업군</div>
            {Object.keys(industryJobs).map((industry) => (
              <div
                key={industry}
                className={`table-cell ${
                  selectedIndustry === industry ? "selected" : ""
                }`}
                onClick={() => handleIndustryClick(industry)}
              >
                {industry}
              </div>
            ))}
          </div>

          <div className="table-column job-column">
            <div className="table-header">직무</div>
            {jobs.map((job) => (
              <div
                key={job}
                className={`table-cell ${
                  selectedJob === job ? "selected" : ""
                }`}
                onClick={() => handleJobClick(job)}
              >
                {job}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="confirm-button" onClick={handleConfirmClick}>
          확인
        </button>
      </div>
    </div>
  );
};

export default AIInterview;