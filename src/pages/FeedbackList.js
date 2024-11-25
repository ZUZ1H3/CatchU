import "../style/FeedbackList.css";
import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

// Chart.js 필수 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FeedbackList = () => {
    const [activeTab, setActiveTab] = useState("mockInterview"); // 현재 활성화된 탭
    const chartContainerRef = useRef(null); // 차트 컨테이너 참조

    // 차트 데이터
    const mockInterviewData = {
        labels: ["10일", "12일", "13일", "15일", "16일"],
        datasets: [
            {
                label: "모의 면접 점수",
                data: [76, 82, 71, 90, 65],
                backgroundColor: "rgba(102, 110, 255, 0.6)",
                borderWidth: 0,
                borderRadius: 8, // 막대 모서리를 둥글게
                barThickness: 20, // 막대 두께 고정
            },
        ],
    };

    const practiceData = {
        labels: ["10일", "12일", "14일", "16일", "18일"],
        datasets: [
            {
                label: "면접 연습 활동량",
                data: [30, 50, 25, 45, 100],
                backgroundColor: "rgba(255, 105, 97, 0.6)",
                borderWidth: 0,
                borderRadius: 8, // 막대 모서리를 둥글게
                barThickness: 20,
            },
        ],
    };

    const data = activeTab === "mockInterview" ? mockInterviewData : practiceData;

    // 차트 옵션
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false }, // X축 그리드 숨김
            },
            y: {
                ticks: { display: false }, // Y축 레이블 숨김
                grid: { display: false }, // Y축 가로 줄 표시
            },
        },
        
    };

    // 차트 컨테이너의 동적 크기 설정
    useEffect(() => {
        const totalLabels = data.labels.length;
        const baseWidth = 200;
        const additionalWidthPerLabel = 50;

        if (totalLabels > 7 && chartContainerRef.current) {
            const newWidth = baseWidth + (totalLabels - 7) * additionalWidthPerLabel;
            chartContainerRef.current.style.width = `${newWidth}px`;
        }
    }, [data.labels.length]);

    return (
        <div className="feedbackList">
            {/* 헤더와 토글 버튼 */}
            <div className="feedbackList-header">
                <div className="feedbackList-title">
                    <button
                        className={`toggle-button ${
                            activeTab === "mockInterview" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("mockInterview")}
                    >
                        모의 면접
                    </button>
                    <span>|</span>
                    <button
                        className={`toggle-button ${
                            activeTab === "practice" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("practice")}
                    >
                        면접 연습
                    </button>
                </div>
            </div>

            {/* 차트 */}
            <div className="feedbackList-chart">
                <div ref={chartContainerRef} className="chart-wrapper">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default FeedbackList;
