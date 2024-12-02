import './style/App.css';
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Introduction from "./pages/Introduction";
import SettingPractice from "./pages/SettingPractice.js";
import Practice from "./pages/Practice";
import Practicing from "./pages/Practicing.js";
import EndPractice from './pages/EndPractice.js';
import AIInterview from "./pages/AIInterview";
import AptitudeTest from "./pages/AptitudeTest.js";
import JobValueTest from './pages/JobValueTest.js';
import JobAptitudeTest from './pages/JobAptitudeTest.js';
import JobPreparationTest from './pages/JobPreparationTest.js';
import ResultJobAptitudeTest from './pages/ResultJobAptitudeTest.js';
import ResultJobValueTest from './pages/ResultJobValueTest.js';
import ResultJobPreparationTest from './pages/ResultJobPreparationTest.js';
import FAQ from "./pages/FAQ";
import FeedbackList from "./pages/FeedbackList";
import Feedback from "./pages/Feedback";
import TestList from './pages/TestList.js';
import profileDataFile from "./data/ProfileData.js"; // 정확한 경로 확인
//src\data\ProfileData.js
const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const [profileData, setProfileData] = useState(profileDataFile); // 상태 관리

  const location = useLocation();

  // 대시보드 페이지인지 확인
  const isDashboard = location.pathname === '/';

  // 대시보드 또는 적성검사에서 배경색 변경
  const isGrayBackground = location.pathname === '/' || location.pathname === '/aptitude-test' || location.pathname.startsWith('/feedback');
  // 면접 연습 진행 화면에서 배경색 변경
  const isPracticing = location.pathname === '/setting-practice' || location.pathname === '/practicing' || location.pathname === '/end-practice';
  const isAIInterview = location.pathname === '/AI-interview';
  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData); // 상태 업데이트
  };

  useEffect(() => {
    if (isPracticing) {
      document.body.classList.add('practicing-mode');
    } else {
      document.body.classList.remove('practicing-mode');
    }
  }, [isPracticing]);

  useEffect(() => {
    if(isAIInterview) {
      document.body.classList.add('AIInterview-mode');
    } else {
      document.body.classList.remove('AIInterview-mode');
    }
  }, [isAIInterview]);

  return (
    <div className="app"> {!isPracticing && (
      <div className="sidebar-container">
        <Sidebar />
      </div>
    )}
      <div className={`content-container ${isGrayBackground ? 'gray-background' : ''} ${isDashboard ? 'dashboard-width' : ''} ${isPracticing ? 'practicing' : ''
        }`}>
        <Routes>
          <Route path="/" element={<Dashboard profileData={profileData} />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/setting-practice" element={<SettingPractice />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practicing" element={<Practicing />} />
          <Route path="/end-practice" element={<EndPractice />} />
          <Route path="/AI-interview" element={<AIInterview />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/job-value-test" element={<JobValueTest />} />
          <Route path="/job-aptitude-test" element={<JobAptitudeTest />} />
          <Route path="/job-preparation-test" element={<JobPreparationTest />} />
          <Route path="/result-job-aptitude-test" element={<ResultJobAptitudeTest  profileData={profileData} />} />
          <Route path="/result-job-value-test" element={<ResultJobValueTest  profileData={profileData} />} />
          <Route path="/result-job-preparation-test" element={<ResultJobPreparationTest  profileData={profileData} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/feedback-list" element={<FeedbackList />} />
          <Route path="/feedback/:type/:id" element={<Feedback profileData={profileData} />} />
          <Route path="/test-list" element={<TestList />} />
          </Routes>
      </div>

      {isDashboard && <Profile profileData={profileData} onUpdate={handleProfileUpdate} />}
    </div>
  );
};

export default App;
