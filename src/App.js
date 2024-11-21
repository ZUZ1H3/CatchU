import './style/App.css';
import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Introduction from "./pages/Introduction";
import Practice from "./pages/Practice";
import AIInterview from "./pages/AIInterview";
import MyPage from "./pages/MyPage";
import AptitudeTest from "./pages/AptitudeTest.js";
import FAQ from "./pages/FAQ";

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/AI-interview" element={<AIInterview />} />
            <Route path="/aptitude-test" element={<AptitudeTest />} /> {/* 여기 경로 확인 */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
