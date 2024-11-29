// RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
import { feedbackData } from "../data/FeedbackData_Interview.js";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

// 필요한 구성 요소 등록
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Example feedbackData 가져오기
const calculateCategoryAverages = (data) => {
    const categoryTotals = {};
    const categoryCounts = {};

    // 데이터를 순회하며 카테고리별 총합과 개수를 계산
    Object.values(data).forEach(({ radarChart }) => {
        Object.entries(radarChart).forEach(([category, score]) => {
            categoryTotals[category] = (categoryTotals[category] || 0) + score;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
    });

    // 평균 계산
    return Object.entries(categoryTotals).map(
        ([category, total]) => total / categoryCounts[category]
    );
};

const MySkill = () => {
    const categories = ["적극성", "태도", "유창성", "표현력", "전공"];
    const averages = calculateCategoryAverages(feedbackData);

    const data = {
        labels: categories,
        datasets: [
            {
                data: averages,
                backgroundColor: "rgba(102, 110, 255, 0.2)",
                borderColor: "rgba(102, 110, 255, 1)",
                borderWidth: 1,
                pointBackgroundColor: "rgba(102, 110, 255, 1)",
                pointRadius: 2, // 점의 크기
                pointHoverRadius: 5, // 점에 마우스를 올렸을 때 크기
                pointHitRadius: 5, // 클릭할 수 있는 범위
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    color: "rgba(200, 200, 200, 0.5)", // 더 은은한 선
                },
                ticks: {
                    beginAtZero: true,
                    max: 100,         // 최대값 100으로 설정
                    stepSize: 20, // 20 단위로 표시
                    display: false, // 레이더 차트에 점수(숫자) 숨김
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false, // 데이터 라벨 비활성화
            },
        },
    };

    return (
        <div style={{ width: "100%", fontFamily: "Paperlogy6" }}>
            <div style={{ marginBottom: "1em", fontWeight: "bold", fontSize: "1.2em" }}>
                나의 면접 스킬
            </div>
            <Radar data={data} options={options} />
        </div>
    );
};

export default MySkill;
