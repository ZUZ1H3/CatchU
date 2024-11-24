import React from 'react';
import '../style/Dashboard.css';
import MyCalendar from "./Calendar.js"; // 캘린더 컴포넌트 import
import MySkill from "./MySkill.js"; // 캘린더 컴포넌트 import
import Activity from "./Activity.js"; // 캘린더 컴포넌트 import

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">안녕하세요, 김신입씨! 👋</div>
      <div className="top-section">
        <div className="box">
          <Activity averageScore={76} />
        </div>
        <div className="box">
          <MySkill />
        </div>
        <div className="box">
          <MyCalendar />
        </div>
      </div>
      <div className="bottom-section">
        <div className="box">모의 면접</div>
        <div className="box">면접 연습</div>
      </div>
    </div>
  );
};

export default Dashboard;
