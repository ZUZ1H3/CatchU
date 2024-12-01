import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/EndPractice.css";

const EndPractice = () => {
  const { state } = useLocation();
  const { videoUrls } = state || {}; // 이전 화면에서 가져온 videoUrls 배열을 추출합니다.
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);
  const [validVideos, setValidVideos] = useState([]); // 유효한 비디오 URL만 저장
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Received videoUrls:", videoUrls);

    // 유효한 비디오만 필터링
    const filteredUrls = (videoUrls || []).filter((url) => {
      // URL 형식 확인
      console.log("Checking video URL:", url);
      return url.startsWith("blob:");
    });

    setValidVideos(filteredUrls);

    const timer = setTimeout(() => {
      setShowFeedbackButton(true);
    }, 5000); // 5초 후에 버튼을 보여줍니다.

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [videoUrls]);

  const goToFeedback = () => {
    navigate("/feedback/practice/18일"); // 피드백 데이터 화면으로 이동
  };

  return (
    <div className="end-practice-container">
      <div id="practice-header-container">
        <img src="/logo2.png" className="logo" alt="Logo" />
        <img src="/progress3.png" className="step" alt="Progress" />
        <button
          id="finish-button"
          style={{ visibility: showFeedbackButton ? "visible" : "hidden" }}
          onClick={goToFeedback}
        >
          피드백 보러 가기
        </button>
      </div>
      <h1 id="practice-title">연습이 끝났습니다!</h1>
      <div>
        {validVideos.length > 0 ? (
          validVideos.map((url, index) => (
            <div className="video-wrapper" key={url}>
              <video
                controls
                autoPlay
                muted
                playsInline
                onError={() => console.error(`Failed to load video: ${url}`)}
              >
                <source src={url} type="video/webm" />
                비디오를 불러오는 데 실패했습니다.
              </video>
            </div>
          ))
        ) : (
          <p>비디오가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default EndPractice;
