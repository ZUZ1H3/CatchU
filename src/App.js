import './style/App.css';
import React from "react";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Introduction from "./pages/Introduction";
import Practice from "./pages/Practice";
import AIInterview from "./pages/AIInterview";
import AptitudeTest from "./pages/AptitudeTest.js";
import JobValueTest from './pages/JobValueTest.js';
import JobAptitudeTest from './pages/JobAptitudeTest.js';
import FAQ from "./pages/FAQ";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();

  // 대시보드 페이지인지 확인
  const isDashboard = location.pathname === '/';

  // 대시보드 또는 적성검사에서 배경색 변경
  const isGrayBackground = location.pathname === '/' || location.pathname === '/aptitude-test';

  return (
    <div className="app">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className={`content-container ${isGrayBackground ? 'gray-background' : ''} ${isDashboard ? 'dashboard-width' : ''
          }`}>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/AI-interview" element={<AIInterview />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/job-value-test" element={<JobValueTest />} />
          <Route path="/job-aptitude-test" element={<JobAptitudeTest />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>

      {isDashboard && <Profile />}
    </div>
  );
};

export default App;
