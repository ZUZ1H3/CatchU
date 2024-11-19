// src/App.js
import './style/App.css';
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TabContent from "./components/TabContent";

const App = () => {   // 초기 탭은 대시보드~
  const [currentTab, setCurrentTab] = useState("대시보드");

  return (
    <div className="app">
      <div className="sidebar-container">
        <Sidebar currentTab={currentTab} setActiveTab={setCurrentTab} />
      </div>
      <div className="content-container">
        <TabContent currentTab={currentTab} />
      </div>
    </div>
  );
};

export default App;
