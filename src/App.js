import './style/App.css';
import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Introduction from "./pages/Introduction";
import Practice from "./pages/Practice";
import Practicing from "./pages/Practicing.js";
import AIInterview from "./pages/AIInterview";
import AptitudeTest from "./pages/AptitudeTest.js";
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
  // 면접 연습 진행 화면에서 배경색 변경
  const isPracticing = location.pathname === '/practicing';
  
  useEffect(() => {
    if (isPracticing) {
      document.body.classList.add('practicing-mode');
    } else {
      document.body.classList.remove('practicing-mode');
    }
  }, [isPracticing]);

  return (
    <div className="app"> {!isPracticing && (
      <div className="sidebar-container">
        <Sidebar />
      </div>
       )}
      <div className={`content-container ${isGrayBackground ? 'gray-background' : ''} ${isDashboard ? 'dashboard-width' : ''} ${isPracticing ? 'practicing' : ''
          }`}>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practicing" element={<Practicing />} />
          <Route path="/AI-interview" element={<AIInterview />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>

      {isDashboard && <Profile />}
    </div>
  );
};

export default App;
