import React, { useState, useEffect } from "react";
import "../style/AIInterview.css";

const AIInterview = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(""); // 선택된 산업군
  const [jobs, setJobs] = useState([]); // 선택된 직무 리스트
  const [selectedJob, setSelectedJob] = useState(""); // 선택된 직무
  const [showConfirmation, setShowConfirmation] = useState(false); // 화면 전환 상태
  const [countdown, setCountdown] = useState(10); // 카운트다운 상태
  const [showRecordingScreen, setShowRecordingScreen] = useState(false); // 녹화 화면 표시 상태
  const [microphoneStatus, setMicrophoneStatus] = useState(""); // 마이크 상태
  const [microphoneImage, setMicrophoneImage] = useState(""); // 마이크 이미지 경로

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
    setShowRecordingScreen(true); // 녹화 화면으로 전환
  };

  useEffect(() => {
    if (showRecordingScreen && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      // setShowAIInterviewScreen(true); // 모의면접 화면으로 전환
    }
  }, [showRecordingScreen, countdown]);

  useEffect(() => {
    if (showRecordingScreen) {
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
  }, [showRecordingScreen]);

  if (showRecordingScreen) {
    return (
      <div className="recording-screen">
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
          <img
            src={microphoneImage}
            alt="마이크"
          />
          <p>{microphoneStatus}</p>
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
          <div className="table-divider"></div>
          <div className="table-column industry-column">
            <div className="table-header">산업군</div>
            {Object.keys(industryJobs).map((industry) => (
              <div
                key={industry}
                onClick={() => handleIndustryClick(industry)}
                className={`table-cell ${
                  selectedIndustry === industry ? "selected" : ""
                }`}
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
                onClick={() => handleJobClick(job)}
                className={`table-cell ${
                  selectedJob === job ? "selected" : ""
                }`}
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