// src/pages/Tip.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate
import '../style/Tip.css'; // CSS 파일 추가

const Tip = () => {
    const tips = [
        "본인의 약점은 무엇이며, 이를 어떻게 극복하려고 노력했나요?",
        "팀 프로젝트에서의 갈등 상황을 어떻게 해결했나요?",
        "가장 큰 실패 경험은 무엇이었고, 이를 통해 무엇을 배웠나요?",
        "우리 회사가 직면한 가장 큰 도전 과제가 무엇이라고 생각하나요?",
        "왜 우리 회사가 당신을 채용해야 하나요?",
        "5년 후 본인의 모습은 어떨 것 같나요?",
        "회사의 정책 중 개선이 필요한 부분이 있다면 무엇인가요?",
        "최근 관심 있는 기술 트렌드와 이를 활용한 프로젝트 경험은 무엇인가요?",
        "다른 후보자와 비교해 본인의 차별화된 강점은 무엇인가요?",
        "이전에 맡았던 역할에서 가장 어려웠던 의사결정은 무엇인가요?",
    ];

    const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];
    const [currentTip, setCurrentTip] = useState(getRandomTip);
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    const handleNewTip = () => {
        setCurrentTip(getRandomTip());
    };

    const handlePracticeClick = () => {
        navigate('/practice'); // '/practice' 경로로 이동
    };

    return (
        <div className="tip-container">
            <div className="tip-title">면접 Check!!</div>
            <div className='text'>어려웠던 질문을 다시 연습해봐요.</div>
            <p className="tip-content">{currentTip}</p>
            <div className="tip-buttons">
                <button onClick={handleNewTip} className="tip-button">
                    새 질문
                </button>
                <button onClick={handlePracticeClick} className="tip-button">
                    연습하기
                </button>
            </div>
        </div>
    );
};

export default Tip;
