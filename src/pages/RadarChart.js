// RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
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

const RadarChart = () => {
    const data = {
        labels: ["적극성", "태도", "유창성", "표현력", "전공"],
        datasets: [
            {
                data: [80, 65, 90, 39, 100],
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
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
                
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            
        },
    };

    return (
        <div style={{ width: "100%", fontFamily: "Paperlogy6" }}>
            <div style={{ marginBottom: "1em" }}>나의 면접 스킬</div>
            <Radar data={data} options={options} />
        </div>

    );
};

export default RadarChart;
