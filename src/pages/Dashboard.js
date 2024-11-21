// src/pages/Dashboard.js
import React from 'react';
import '../style/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>주지혜님의 모의 면접 분석 결과</h2>
        <p className="dashboard-date">2024년 11월 20일 15시 30분</p>
      </div>

      <div className="dashboard-body">
        {/* 종합 평가 점수 */}
        <div className="dashboard-score">
          <h3>종합 평가 점수</h3>
          <p className="score-value">76점</p>
          <p className="score-subtext">전체 응시자 기준 상위 20%에 속합니다.</p>
        </div>

      </div> 
    </div>//컨테이디
    


  );
};

export default Dashboard;
