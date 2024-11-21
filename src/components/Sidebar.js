import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // 현재 URL 경로 가져오기
  const tabs = [
    { name: "대시보드", path: "/" },
    { name: "서비스소개", path: "/introduction" },
    { name: "모의면접", path: "/AI-interview" },
    { name: "면접연습", path: "/practice" },
    { name: "적성검사", path: "/aptitude-test" },
    { name: "FAQ", path: "/FAQ" },
  ];

  return (
    <div className="sidebar">
      <img src="/logo.png" alt="Web Logo" />
      {tabs.map((tab, index) => (
        <Link
          key={index}
          to={tab.path} // 경로 설정
          className={`tab ${location.pathname === tab.path ? "active" : ""}`} // 현재 경로와 비교해 active 클래스 추가
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
