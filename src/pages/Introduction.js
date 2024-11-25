// src/pages/Introduction.js
import React from 'react';
import '../style/Introduction.css'; // 스타일을 별도의 CSS 파일에서 관리


const Introduction = () => {
  return (
    <div className="container">
      <img src="/introduction.png" alt="서비스 소개 이미지" className="intro-image" />
    </div>
  )
};

export default Introduction;
