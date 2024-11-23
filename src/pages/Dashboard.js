import React from 'react';
import '../style/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">안녕하세요, 김신입씨! 👋</div>
      <div className="top-section">
        <div className="box">활동</div>
        <div className="box">나의 면접 스킬</div>
        <div className="box">달력</div>
      </div>
      <div className="bottom-section">
        <div className="box">모의 면접</div>
        <div className="box">면접 연습</div>
      </div>
    </div>
  );
};

export default Dashboard;
