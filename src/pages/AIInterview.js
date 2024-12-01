import React, { useState, useEffect, useRef } from "react";
import "../style/AIInterview.css";

// 산업군 - 직무
const industryJobs = {
  "IT / 데이터": [
    "소프트웨어 / 웹 / 앱",
    "빅데이터",
    "인공지능",
    "정보보안",
    "네트워크 / 서버",
    "클라우드 엔지니어",
    "데이터 분석가",
    "머신러닝 엔지니어",
    "UI/UX 디자이너",
    "IT 프로젝트 매니저",
    "블록체인 개발자",
    "QA 엔지니어",
    "DevOps 엔지니어",
  ],
  "화학 / 에너지 / 환경": [
    "환경 엔지니어",
    "화학 연구원",
    "에너지 컨설턴트",
    "신재생에너지 전문가",
    "수질 관리 엔지니어",
    "대기 환경 엔지니어",
    "화학 공정 엔지니어",
    "에너지 효율 전문가",
    "에너지 거래 분석가",
    "폐기물 처리 전문가",
    "재활용 전문가",
  ],
  "목재 / 가구 / 제지": [
    "목재 디자이너",
    "가구 제작자",
    "제지 기술자",
    "가구 CAD 디자이너",
    "가구 품질 관리 전문가",
    "목재 가공 기술자",
    "친환경 소재 전문가",
    "목공 예술가",
    "가구 마케팅 전문가",
    "제지 공정 관리자",
  ],
  "판매 / 유통 / 영업 / 무역": [
    "영업 사원",
    "무역 전문가",
    "유통 관리사",
    "B2B 영업 전문가",
    "해외 영업 전문가",
    "물류 관리 전문가",
    "전자상거래 관리자",
    "브랜드 매니저",
    "소매 관리자",
    "구매 기획자",
    "시장 분석가",
    "제품 카테고리 매니저",
  ],
  "식품": [
    "식품 연구원",
    "품질 관리 전문가",
    "식품 디자이너",
    "식품 영양사",
    "식품 공정 관리자",
    "HACCP 전문가",
    "신제품 개발자",
    "음료 제조 전문가",
    "농산물 유통 전문가",
    "푸드 마케팅 전문가",
    "식품 포장 디자이너",
  ],
  "외국어 면접": [
    "영어 통역사",
    "중국어 번역가",
    "일본어 전문가",
    "프랑스어 번역가",
    "스페인어 전문가",
    "독일어 번역가",
    "다국어 고객지원 전문가",
    "외국어 강사",
    "국제회의 통역사",
    "자막 번역가",
  ],
  "정치": [
    "정치 컨설턴트",
    "정책 분석가",
    "공공 행정 전문가",
    "의회 보좌관",
    "정치 홍보 전문가",
    "정책 연구원",
    "공공 정책 컨설턴트",
    "정부 관계 전문가",
    "정책 캠페인 매니저",
    "국제 관계 전문가",
    "지역 개발 전문가",
  ],
};

// 확인 다이얼로그 컴포넌트
const Dialog = ({ open, message, onClose }) => {
  if (!open) return null; // 다이얼로그가 닫혀 있으면 렌더링하지 않음
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

// 확인+취소 다이얼로그
const ConfirmationDialog = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button className="dialog-button" onClick={onConfirm}>
            확인
          </button>
          <button className="dialog-button" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

const AIInterview = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(""); // 선택된 산업군
  const [jobs, setJobs] = useState([]); // 선택된 직무 리스트
  const [selectedJob, setSelectedJob] = useState(""); // 선택된 직무
  const [showConfirmation, setShowConfirmation] = useState(false); // 화면 전환 상태
  const [countdown, setCountdown] = useState(10); // 카운트다운 상태
  const [showPreparingScreen, setShowPreparingScreen] = useState(false); // 준비 화면 표시 상태
  const [showAIInterviewScreen, setShowAIInterviewScreen] = useState(false); // AI 면접 화면 상태
  const [micOn, setMicOn] = useState(true); // 마이크 상태
  const [cameraOn, setCameraOn] = useState(true); // 카메라 상태
  const [microphoneImage, setMicrophoneImage] = useState(""); // 마이크 이미지 경로
  const [currentStep, setCurrentStep] = useState(1); // 현재 면접 단계
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // 현재 영상 인덱스 (0: 메인, 1: listening)
  const [listeningTimer, setListeningTimer] = useState(0); // listening 영상 타이머 상태
  const [isRecording, setIsRecording] = useState(false); // 녹화 상태 추적
  const [isPrematureEnd, setIsPrematureEnd] = useState(false); // 중도 종료 여부 관리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filteredIndustryJobs, setFilteredIndustryJobs] = useState(industryJobs); // 필터링된 데이터 상태
  const [alertDialog, setAlertDialog] = useState({ open: false, message: "" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, message: "", onConfirm: null });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState("");

  const cameraStreamRef = useRef(null); // 카메라 스트림
  const mediaRecorderRef = useRef(null); // MediaRecorder 참조
  const recordedChunksRef = useRef([]); // 녹화된 데이터 저장

  // 산업군 클릿시
  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setJobs(industryJobs[industry] || []);
    setSelectedJob(""); // 새로운 산업군을 선택하면 직무 선택 초기화
  };

  // 직무 클릭시
  const handleJobClick = (job) => {
    setSelectedJob(job); // 선택된 직무 업데이트
  };

  // 검색
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    if (!value) {
      // 검색어가 없으면 원래 데이터로 복원
      setFilteredIndustryJobs(industryJobs);
      setSelectedIndustry("");
      setSelectedJob("");
      return;
    }
  
    // 검색어로 직무 필터링
    const matchingEntry = Object.entries(industryJobs).find(([industry, jobs]) =>
      jobs.some((job) => job.toLowerCase().includes(value))
    );
  
    // 검색 결과 있을 때
    if (matchingEntry) {
      const [industry, jobs] = matchingEntry;
      const matchingJob = jobs.find((job) => job.toLowerCase().includes(value));
  
      setSelectedIndustry(industry); // 첫 번째 일치하는 산업군 선택
      setSelectedJob(matchingJob); // 해당 직무 선택
      setFilteredIndustryJobs({ [industry]: jobs }); // 선택된 산업군만 표시
    } else {
      // 검색 결과가 없을 때 초기화
      setFilteredIndustryJobs({ "검색 결과 없음": [] });
      setSelectedIndustry("");
      setSelectedJob("");
    }
  };  

  // Enter 키 이벤트 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm) {
      const firstMatch = Object.entries(filteredIndustryJobs).find(
        ([, jobs]) => jobs.length > 0
      );
      if (firstMatch) {
        const [firstIndustry, jobs] = firstMatch;
        const firstJob = jobs[0];
        handleIndustryClick(firstIndustry); // 첫 번째 산업군 선택
        handleJobClick(firstJob); // 첫 번째 직무 선택
      }
    }
  };

  // 확인 버튼 클릭시
  const handleConfirmClick = () => {
    // 산업군&직무 다 선택했을 때
    if (selectedIndustry && selectedJob) {
      setShowConfirmation(true); // 화면 전환
    } else {
      setAlertDialog({
        open: true,
        message: "산업군과 직무를 모두 선택해주세요!",
      });
    }
  };

  // 이전으로 버튼
  const handleGoBack = () => {
    setShowConfirmation(false); // 이전 화면으로 돌아가기
  };

  // 시작하기 버튼
  const handleStartClick = () => {
    setShowPreparingScreen(true); // 준비 화면으로 전환
  };

  // 다이얼로그 닫기
  const handleDialogClose = () => {
    setAlertDialog({ open: false, message: "" });
  };

  // 모의면접 중단 여부 다시 확인
  const handleConfirm = () => {
    setIsPrematureEnd(true); // 중도 종료로 설정
    handleEndInterview(currentStep != 6); // 면접 종료 처리
    setConfirmDialogOpen(false); // 다이얼로그 닫기
  };

  // 다이얼로그 취소시
  const handleCancel = () => {
    setConfirmDialogOpen(false); // 다이얼로그 닫기
  };

  useEffect(() => {
    // 면접 준비 화면
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
    // 면접 준비 화면
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
    // 모의면접 화면
    if (showAIInterviewScreen) {
      // 상태 초기화
      setIsPrematureEnd(false);
      setShowConfirmation(false);
      setAlertDialog({ open: false, message: "" });
      setConfirmDialogOpen(false);
      setConfirmDialogMessage("");

      const videoElement = document.querySelector("#user-camera");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            cameraStreamRef.current = stream;
            videoElement.srcObject = stream;
            videoElement.play();

           // MediaRecorder로 녹화 시작
           const mediaRecorder = new MediaRecorder(stream);
           mediaRecorderRef.current = mediaRecorder;

           mediaRecorder.ondataavailable = (event) => {
             if (event.data.size > 0) {
               recordedChunksRef.current.push(event.data); // 데이터 저장
             }
           };

           mediaRecorder.start(); // 녹화 시작
           setIsRecording(true); // 녹화 상태를 true로 설정

          mediaRecorder.onstop = () => {
            setIsRecording(false); // 녹화 종료 시 false로 설정
          };
        })
        .catch((err) => {
          console.error("카메라를 사용할 수 없습니다:", err);
        });
      }
    }

    // 컴포넌트가 unmount될 때 스트림과 MediaRecorder 정리
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [showAIInterviewScreen]);

  // 현재 비디오 인덱스
  useEffect(() => {
    if (currentVideoIndex === 1) {
      setListeningTimer(0);
      const interval = setInterval(() => {
        setListeningTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentVideoIndex]);

  // 비디오가 끝날 때
  const handleVideoEnd = () => {
    if (currentVideoIndex === 1) {
      // listening 영상일 때
      const videoElement = document.querySelector(".interviewer-video");
      videoElement.currentTime = 0; // 영상 재생 위치 초기화
      videoElement.play(); // 무한 반복 재생
    } else if (currentStep < 6 && currentVideoIndex === 0) {
      // 메인 영상 끝 → listening 영상으로 전환
      setCurrentVideoIndex(1);
    } else {
      // step6 메인 영상 끝 → 다음 단계로 이동
      handleNextStep();
    }
  };

  // 다음 단계로 갈 때
  const handleNextStep = () => {
    setCurrentVideoIndex(0); // 메인 영상으로 초기화
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsPrematureEnd(false); // 정상 종료로 설정
      handleEndInterview(); // 면접 종료 처리 호출
      setSelectedIndustry(false); // 면접 종료
    }
  };

  // 모의면접 중단 확인 시
  const handleEndInterviewConfirmation = () => {
    setConfirmDialogOpen(true);
    setConfirmDialogMessage(
      "모의면접을 진행 중입니다. 지금 종료하시면 진행 과정이 저장되지 않습니다! 그래도 종료하시겠습니까?"
    );
  
    console.error("test")
    setConfirmDialog({
      open: true,
      message: confirmDialogMessage,
      onConfirm: () => {
        setConfirmDialogOpen(false);
      },
      onCancel: () => {
        setConfirmDialogOpen(false);
      },
    });
  };
  
  // 모의면접 끝날 때
  const handleEndInterview = (prematureEnd = false) => {
    const selectedDate = "10일"; // 예시로 "10일" 데이터를 참조

    console.error(prematureEnd)
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
      cameraStreamRef.current = null;
    }

    const videoElement = document.querySelector("#user-camera");
    if (videoElement) {
      videoElement.srcObject = null;
    }

    if (!prematureEnd && recordedChunksRef.current.length > 0) {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "interview_recording.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }

    recordedChunksRef.current = [];

    if (!prematureEnd) {
      setAlertDialog({
        open: true,
        message: "수고하셨습니다! 면접이 종료되었습니다. 피드백 페이지로 이동 중입니다...",
      });
    }
    
    const redirectUrl = prematureEnd ? "/AI-Interview" : `/feedback/mockInterview/${selectedDate}`;

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
  };

  const getStepVideo = () => {
    const steps = [
      "interviewer_step1_cc.mp4",
      "interviewer_listening_mute.mp4",
      "interviewer_step2_cc.mp4",
      "interviewer_listening_mute.mp4",
      "interviewer_step3_cc.mp4",
      "interviewer_listening_mute.mp4",
      "interviewer_step4_cc.mp4",
      "interviewer_listening_mute.mp4",
      "interviewer_step5_cc.mp4",
      "interviewer_listening_mute.mp4",
      "interviewer_step6_cc.mp4",
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

  // 마이크 제어 함수
  const toggleMic = () => {
    if (cameraStreamRef.current) {
      const audioTrack = cameraStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled; // 마이크 끄기/켜기
        setMicOn(audioTrack.enabled); // 상태 갱신
      }
    }
  };

  // 카메라 제어 함수
  const toggleCamera = () => {
    if (cameraStreamRef.current) {
      const videoTrack = cameraStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled; // 카메라 끄기/켜기
        setCameraOn(videoTrack.enabled); // 상태 갱신
      }
    }
  };

  // 모의면접 화면
  if (showAIInterviewScreen) {
    return (
      <div className="ai-interview-screen">
        {/* ConfirmationDialog 다이얼로그 렌더링 */}
        <ConfirmationDialog
          open={confirmDialogOpen}
          message={confirmDialogMessage}
          onConfirm={handleConfirm}  // 확인 클릭 시 면접 종료 처리
          onCancel={handleCancel}  // 취소 클릭 시 다이얼로그 닫기
        />
        <Dialog
          open={alertDialog.open}
          message={alertDialog.message}
          onClose={handleDialogClose}
        />
        {/* 맨 위 바 */}
        <div className="top-bar-container">
          <img src="../bar_top.png" alt="Top Bar" className="bar-top" />
          <img
            src={`../progress_step${currentStep}.png`}
            alt={`Progress Step ${currentStep}`}
            className="progress-indicator"
          />
          {currentVideoIndex === 1 && (
            <div className="listening-timer">{listeningTimer}</div>
          )}
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

          {/* 녹화중 텍스트 */}
          {isRecording && (
            <div className="recording-status">
              <p>녹화중</p>
            </div>
          )}

          {/* "다음" 버튼 */}
          {currentVideoIndex === 1 && (
            <button
              className="next-step-button"
              onClick={handleNextStep}
            >
              다음
            </button>
          )}
  
        {/* 맨 아래 바 */}
        <div className="bottom-bar-container">
          <img src="../bar_bottom.png" alt="Bottom Bar" className="bar-bottom" />
          <div className="status-buttons">
            <img
              src={micOn ? "../mic.png" : "../mic_no.png"}
              alt="Mic Status"
              className="mic-status"
              onClick={toggleMic} // 마이크 상태 변경
              />
            <img
              src={cameraOn ? "../video.png" : "../video_no.png"}
              alt="Video Status"
              className="video-status"
              onClick={toggleCamera} // 비디오 상태 변경
              />
            <button
              className="end-interview-button"
              onClick={handleEndInterviewConfirmation} // 팝업 창 처리 함수 호출
            >
              종료
            </button>
          </div>
        </div>
      </div>
    );
  }  

  // 모의면접 준비 화면
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

  // 시작하기 화면
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

  // 산업군&직무 고르기 화면
  return (
    <div>
      {/* 다이얼로그 */}
      <Dialog
        open={alertDialog.open}
        message={alertDialog.message}
        onClose={handleDialogClose}
      />
  
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
          value={searchTerm}
          onChange={handleSearch} // 검색어 변경 이벤트
          onKeyDown={handleKeyDown} // Enter 키 이벤트
        />
      </div>
  
      <div className="ai-interview-container">
        <div className="table-wrapper">
          <div className="table-column industry-column">
            <div className="table-header">산업군</div>
            {Object.keys(filteredIndustryJobs).map((industry) => (
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

          {/* 구분선 */}
          <div className="table-divider"></div>

          <div className="table-column job-column">
            <div className="table-header">직무</div>
            {(filteredIndustryJobs[selectedIndustry] || []).map((job) => (
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