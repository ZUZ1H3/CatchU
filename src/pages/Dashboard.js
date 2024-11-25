import React from 'react';
import '../style/Dashboard.css';
import MyCalendar from "./Calendar.js";
import MySkill from "./MySkill.js";
import FeedbackList from "./FeedbackList.js";

const Dashboard = ({ profileData }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">안녕하세요, {profileData.name}님! 👋</div>
      <div className="top-section">
        <div className="box">
        </div>
        <div className="box">
          <MySkill />
        </div>
        <div className="box">
          <MyCalendar />
        </div>
      </div>
      <div className="bottom-section">
        <div className="box">
        <FeedbackList />
        </div>
        <div className="box">적성 검사</div>
      </div>
    </div>
  );
};

export default Dashboard;
