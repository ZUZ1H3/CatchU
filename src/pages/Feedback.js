// src/pages/Feedback.js
import React from 'react';
import '../style/Feedback.css';

const Feedback = () => {
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
    </div>//컨테이디
    


  );
};

export default Feedback;
