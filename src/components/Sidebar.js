// src/components/Sidebar.js
import React from 'react';
import '../style/Sidebar.css';

const Sidebar = ({ currentTab, setActiveTab }) => {
  const tabs = ["대시보드", "서비스소개", "면접연습", "모의면접", "마이페이지"];

  return (
    <div className="sidebar">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${currentTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
