import React from 'react';
import '../style/Dashboard.css';

const Dashboard = () => {
  // D-Day 계산 로직
  const targetDate = new Date('2023-12-05'); // 면접 날짜 입력
  const currentDate = new Date();
  const diffInDays = Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="dashboard-container">
        안녕하세요, 김신입씨! 👋
    </div>
  );
};

export default Dashboard;
