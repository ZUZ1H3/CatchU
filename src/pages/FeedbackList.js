import "../style/FeedbackList.css";
import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import ChartDataLabels from "chartjs-plugin-datalabels";
import { feedbackData } from "../data/FeedbackData_Interview.js"; // feedbackData 가져오기
import { practiceData } from "../data/FeedbackData_Practice.js"; // practiceData 가져오기
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

// Chart.js 필수 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const FeedbackList = () => {
    const [activeTab, setActiveTab] = useState("mockInterview"); // 현재 활성화된 탭
    const chartContainerRef = useRef(null); // 차트 컨테이너 참조
    const navigate = useNavigate(); // React Router navigate function

    // 데이터 동적 생성 함수
    const createChartData = (dataSource) => {
        const labels = Object.keys(dataSource); // 날짜 목록
        const scores = labels.map((date) => {
            const radarChart = dataSource[date].radarChart;
            const total = Object.values(radarChart).reduce((sum, score) => sum + score, 0);
            return Math.round(total / Object.keys(radarChart).length); // 평균 점수
        });

        const backgroundColor = scores.map((score) => {
            if (score >= 80) return "#836DF4"; // 80 이상
            else if (score >= 60) return "#AB9BFF"; // 60 이상
            else if (score >= 40) return "#D4CBFF"; // 40 이상
            return "#E9E5FF"; // 그 이하
        });

        return {
            labels,
            datasets: [
                {
                    label: "모의 면접 점수",
                    data: scores,
                    backgroundColor,
                    borderWidth: 0,
                    borderRadius: 8, // 막대 모서리를 둥글게
                    barThickness: 20, // 막대 두께 고정
                },
            ],
        };
    };


    const createPracticeChartData = (dataSource) => {
        const labels = Object.keys(dataSource); // 날짜 목록
        const scores = labels.map((date) => {
            const radarChart = dataSource[date].radarChart;
            // radarChart의 평균 점수를 계산
            const total = Object.values(radarChart).reduce((sum, value) => sum + value, 0);
            return Math.round(total / Object.keys(radarChart).length);
        });
    
        const backgroundColor = scores.map((score) => {
            if (score >= 80) return "#FF6384"; // 80 이상
            else if (score >= 60) return "#FF85A1"; // 60 이상
            else if (score >= 40) return "#FFB2C9"; // 40 이상
            return "#FFE4E9"; // 그 이하
        });
    
        return {
            labels,
            datasets: [
                {
                    label: "면접 연습 점수",
                    data: scores,
                    backgroundColor,
                    borderWidth: 0,
                    borderRadius: 8, // 막대 모서리를 둥글게
                    barThickness: 20, // 막대 두께 고정
                },
            ],
        };
    };
    
        //동적 생성
        const mockInterviewData = createChartData(feedbackData);
        const practiceChartData = createPracticeChartData(practiceData);
    

    const data = activeTab === "mockInterview" ? mockInterviewData : practiceChartData;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            datalabels: {
                display: true, // 데이터 표시 활성화
                color: "#000", // 점수 텍스트 색상
                font: {
                    size: 10, // 텍스트 크기
                },
                anchor: "end", // 막대 위로 고정
                align: "end", // 텍스트를 막대 상단에 배치
                formatter: (value) => `${value}`, // 점수 뒤에 "점" 추가
            },
        },
        layout: {
            padding: {
                top: 25, // 상단 여백 추가
            },
        },
        scales: {
            x: {
                grid: { display: false }, // X축 그리드 숨김
            },
            y: {
                max: 100, // y축 최대값을 100으로 고정
                ticks: { display: true, stepSize: 20 }, // Y축 레이블 표시
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index; // 클릭한 막대의 인덱스
                const label = data.labels[index]; // 클릭한 막대의 레이블
                const type = activeTab; // 현재 활성화된 탭 (mockInterview 또는 practice)
                navigate(`/feedback/${type}/${label}`); // 타입과 레이블로 이동
            }
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
                        className={`toggle-button ${activeTab === "mockInterview" ? "active" : ""
                            }`}
                        onClick={() => setActiveTab("mockInterview")}
                    >
                        모의 면접
                    </button>
                    <span>|</span>
                    <button
                        className={`toggle-button ${activeTab === "practice" ? "active" : ""
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
