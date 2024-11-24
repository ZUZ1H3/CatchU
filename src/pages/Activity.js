import '../style/Activity.css';
import React, { useEffect, useRef } from "react";
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

const ActivityBox = ({ averageScore }) => {
    const chartContainerRef = useRef(null); // 차트 컨테이너 참조

    const getGrade = (score) => {
        if (score >= 80) return "A";
        if (score >= 60) return "B";
        if (score >= 40) return "C";
        return "D";
    };

    const grade = getGrade(averageScore);

    // 차트 데이터
    const data = {
        labels: ["10일", "12일", "12일", "12일", "12일"],
        datasets: [
            {
                label: "활동량",
                data: [20, 40],
                backgroundColor: ["rgba(102, 110, 255, 0.6)"],
                borderWidth: 0,
                barThickness: 20, // 막대 두께 고정
            },
        ],
    };

    // 차트 옵션
    const options = {
        responsive: true,
        maintainAspectRatio: false, // 비율 유지 비활성화
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                grid: { display: false },
                ticks: { beginAtZero: true },
            },
        },
    };

    useEffect(() => {
        const totalLabels = data.labels.length;
        const baseWidth = 200; // 기준 너비
        const additionalWidthPerLabel = 50; // 초과된 데이터당 추가 너비

        if (totalLabels > 7 && chartContainerRef.current) {
            const newWidth = baseWidth + (totalLabels - 7) * additionalWidthPerLabel;
            chartContainerRef.current.style.width = `${newWidth}px`;
        }
    }, [data.labels.length]);

    return (
        <div className="activity">
            <div className="activity-header">
                <div className="activity-title">평균 점수</div>
                <div className="activity-score">
                    {averageScore}점, {grade}
                </div>
            </div>

            <div className="activity-chart">
                <div ref={chartContainerRef} className="chart-wrapper">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ActivityBox;
