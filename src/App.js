import './style/App.css';
import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Introduction from "./pages/Introduction";
import Practice from "./pages/Practice";
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

  // 대시보드와 적성검사에서만 배경색 변경
  const isBlueBackground = location.pathname === '/' || location.pathname === '/aptitude-test';

  return (
    <div className={`app ${isBlueBackground ? 'blue-background' : ''}`}>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/AI-interview" element={<AIInterview />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
