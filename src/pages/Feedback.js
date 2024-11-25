// src/pages/Feedback.js
import React from 'react';
import { useParams } from "react-router-dom";
import '../style/Feedback.css';
import { feedbackData } from "../data/FeedbackData.js";

const Feedback = () => {
  const { id } = useParams(); // URL에서 레이블(ID)을 가져옴
  // 피드백 데이터 (데모용 더미 데이터)
  const feedback = feedbackData[id]; // 피드백 데이터 가져오기

  if (!feedback) {
    return <p>피드백을 찾을 수 없습니다.</p>; // 데이터가 없을 때 처리
  }
  
  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>주지혜님의 모의 면접 분석 결과</h2>
        <p className="feedback-date">2024년 11월 20일 15시 30분</p>
      </div>

      <div className="feedback-body">
        {/* 종합 평가 점수 */}
        <div className="feedback-score">
          <h3>종합 평가 점수</h3>
          <p className="score-value">76점</p>
          <p className="score-subtext">전체 응시자 기준 상위 20%에 속합니다.</p>
        </div>

      </div>

      <div className="feedback-container">
        <h2>피드백 상세 ({id})</h2>
        <p>점수: {feedback?.score}</p>
        <p>코멘트: {feedback?.comment}</p>
      </div>
    </div>//컨테이디



  );
};

export default Feedback;
