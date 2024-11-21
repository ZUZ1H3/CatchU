// src/components/TabContent.js
import React from 'react';
import Dashboard from '../pages/Dashboard';  // 대시보드 컴포넌트
import Introduction from '../pages/Introduction';  // 서비스소개 컴포넌트
import Practice from '../pages/Practice';  // 면접연습 컴포넌트
import AIInterview from '../pages/AIInterview.js';  // 모의면접 컴포넌트
import MyPage from '../pages/MyPage';  // 마이페이지 컴포넌트
import FAQ from '../pages/FAQ'; //FAQ 컴포넌트
import AptitudeTest from '../pages/AptitudeTest.js'; // 적성검사 페이지 컴포넌트 가져오기

const TabContent = ({ currentTab }) => {
  switch (currentTab) {
    case "대시보드":
      return <Dashboard />;
    case "서비스소개":
      return <Introduction />;
    case "면접연습":
      return <Practice />;
    case "모의면접":
      return <AIInterview />;
    case "적성검사":
      return <AptitudeTest />;
    case "마이페이지":
      return <MyPage />;
    case "FAQ":
        return <FAQ />;
    default:
      return <div>해당 탭이 없습니다.</div>;
  }
};

export default TabContent;
