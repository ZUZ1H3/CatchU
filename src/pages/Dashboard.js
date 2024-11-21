import React from 'react';
import '../style/Dashboard.css';

const Dashboard = () => {
  // D-Day 계산 로직
  const targetDate = new Date('2023-12-05'); // 면접 날짜 입력
  const currentDate = new Date();
  const diffInDays = Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="dashboard-container">
      {/* 왼쪽 섹션 */}
      <div className="left-section">
        <p>안녕하세요, 김신입씨! 👋</p>
      </div>

      {/* 오른쪽 섹션 */}
      <div className="right-section">
        <div className="profile">
          <img src="/images/profile.png" alt="Profile" className="profile-img" />
          <h2>김신입</h2>
          <p>‘배달의 민족’ 면접일 까지</p>
          <div className="countdown">D-{diffInDays}</div>
        </div>

        <div className="icons">
          <img src="/images/icon1.png" alt="Icon 1" />
          <img src="/images/icon2.png" alt="Icon 2" />
          <img src="/images/icon3.png" alt="Icon 3" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
