// src/components/TabContent.js
import React from 'react';
import Dashboard from '../pages/Dashboard';  // 대시보드 컴포넌트
import Introduction from '../pages/Introduction';  // 서비스소개 컴포넌트
import InterviewPractice from '../pages/Practice';  // 면접연습 컴포넌트
import MockInterview from '../pages/AI_Interview';  // 모의면접 컴포넌트
import MyPage from '../pages/MyPage';  // 마이페이지 컴포넌트

const TabContent = ({ currentTab }) => {
  switch (currentTab) {
    case "대시보드":
      return <Dashboard />;
    case "서비스소개":
      return <Introduction />;
    case "면접연습":
      return <InterviewPractice />;
    case "모의면접":
      return <MockInterview />;
    case "마이페이지":
      return <MyPage />;
    default:
      return <div>해당 탭이 없습니다.</div>;
  }
};

export default TabContent;
