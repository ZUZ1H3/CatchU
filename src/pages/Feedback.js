import React from 'react';
import { useParams } from "react-router-dom";
import '../style/Feedback.css';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { feedbackData } from "../data/FeedbackData_Interview.js";
import { practiceData } from "../data/FeedbackData_Practice.js"; // 면접 연습 데이터
import profileData from "../data/ProfileData.js";
import { Radar, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(ChartDataLabels);

// 점수 평균 계산 함수
const calculateAverage = (radarChart) => {
  const total = Object.values(radarChart).reduce((sum, score) => sum + score, 0);
  return total / Object.keys(radarChart).length;
};

// 등급 계산 함수
const calculateGrade = (averageScore) => {
  if (averageScore >= 80) return "우수";
  if (averageScore >= 60) return "양호";
  if (averageScore >= 40) return "보통";
  return "부족";
};

// 점수 문자열 변환 함수
const getScoreLabel = (score) => {
  if (score >= 80) return "우수";
  if (score >= 60) return "양호";
  if (score >= 40) return "보통";
  return "미흡";
};
const formatDateTime = (dateTime) => {
  const { date, time } = dateTime;

  const year = `20${date.slice(0, 2)}`; // 연도: 앞 두 자리에 "20" 추가
  const month = date.slice(2, 4); // 월
  const day = date.slice(4, 6); // 일
  const hour = time.slice(0, 2); // 시간
  const minute = time.slice(2, 4); // 분

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

//평균 시간을 나타낸다
const parseTimeToSeconds = (timeString) => {
  const [minutes, seconds] = timeString.split("분").map((part) => parseInt(part) || 0);
  return minutes * 60 + seconds;
};

const exportToPDF = (feedback, userName) => {
  const element = document.getElementById("feedback-container");
  if (!element) return;

  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210; // A4 너비 (mm)
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // 파일명 생성
    const formattedName = userName.replace(/ /g, "_"); // 이름에서 공백 제거
    const formattedDate = feedback.dateTime.date; // 숫자 형식 날짜
    const formattedTime = feedback.dateTime.time; // 숫자 형식 시간
    const fileName = `모의면접_${formattedName}_${formattedDate}_${formattedTime}.pdf`;

    pdf.save(fileName); // PDF 저장
  });
};


const Feedback = ({ profileData }) => {
  const { type, id } = useParams(); // URL에서 타입과 ID 가져오기

  // 데이터 선택
  const dataSource = type === "mockInterview" ? feedbackData : practiceData;
  const feedback = dataSource[id]; // 해당 ID의 데이터를 가져옴

  if (!feedback) {
    return <p>피드백을 찾을 수 없습니다.</p>; // 데이터가 없을 때 처리
  }

  const { summary, radarChart, feedbackDetails } = feedback;
  const userName = profileData.name; // 프로필 데이터에서 이름 가져오기

    // 제목 설정
    const title =
    type === "mockInterview"
      ? `${userName}님의 모의 면접 분석 결과`
      : `${userName}님의 면접 연습 분석 결과`;


  // 동적으로 점수 및 등급 계산
  const averageScore = calculateAverage(radarChart);
  const grade = calculateGrade(averageScore);

  // 이상적 답변 시간 (90초) 50%로 설정
  const idealTimeInSeconds = 90; // 90초
  const maxTimeInSeconds = 120; // 120초를 100%로 설정
  const averageTimeInSeconds = parseTimeToSeconds(summary.averageTimePerQuestion);

  // 백분율 계산
  const progressPercentage = Math.min(
    (averageTimeInSeconds / maxTimeInSeconds) * 100,
    100
  );
  // 피드백 메시지
  let feedbackMessage = "평균 답변 시간이 대체로 적절합니다.";
  if (averageTimeInSeconds > maxTimeInSeconds) {
    feedbackMessage = "평균 답변 시간이 초과되었습니다.";
  } else if (averageTimeInSeconds < idealTimeInSeconds * 0.5) {
    feedbackMessage = "평균 답변 시간이 너무 짧습니다.";
  }
  // 레이더 차트 데이터 구성
  const radarData = {
    labels: Object.keys(radarChart),
    datasets: [
      {
        label: "평가 점수",
        data: Object.values(radarChart),
        backgroundColor: "rgba(102, 110, 255, 0.3)",
        borderColor: "rgba(102, 110, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          beginAtZero: true, // 0에서 시작
          max: 100,         // 최대값 100으로 설정
          stepSize: 20, // 20 단위로 표시
          display: false, // 레이더 차트에 점수(숫자) 숨김
        },
        min: 0,               // 반지름의 최소값
        max: 100,             // 반지름의 최대값
      },
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false, // 데이터 라벨 비활성화
      },
    },
  };


  return (
    <>
      <div className="print-button-container">
        <button onClick={() => exportToPDF(feedback, userName)} className="export-button">
          PDF로 저장
        </button>

      </div>
      <div className="feedback-container" id="feedback-container">
        <div className="feedback-header">
          <div>{title}</div>
          <p>{`${formatDateTime(feedback.dateTime)}`}</p> 
          </div>

        <div className="feedback-main">
          <div className="feedback-summary">
            <div className="total-score">
              <div className='feedback-title'>종합 평가 점수</div>
              <div id='score'>{Math.round(averageScore)}점, {grade}</div>
            </div>

            {/* 응시 개요 */}
            <div className="overview">
              <div className="feedback-title">응시 개요</div>
              <div className="feedback-item">
                <span className="feedback-label">응답 문항</span>
                <span className="feedback-value">{summary.totalQuestions}문항</span>
              </div>
              <div className="feedback-item">
                <span className="feedback-label">응시 시간</span>
                <span className="feedback-value">{summary.totalTime}</span>
              </div>
              <div className="feedback-item">
                <span className="feedback-label">불성실 답변</span>
                <span className="feedback-value">{summary.mistakes}</span>
              </div>
            </div>

            {/* 평균 답변 시간 */}
            <div className="average-time">
              <div className='feedback-title'>문항 별 평균 답변 시간</div>
              <div id="progress-bar" className="feedback-body">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="feedback-body" id="sec">{summary.averageTimePerQuestion}</div>
              <div className="feedback-body">{feedbackMessage}</div>
            </div>

            {/* 레이더 차트 */}
            <div className="radar-chart">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>

        {/* 지표별 해석 */}
        <div className="feedback-details-header">
          <div>지표별 해석</div>
        </div>

        <div className="feedback-details">
          {feedbackDetails.map((detail, index) => {
            const myScore = radarChart[detail.category] || 0; // radarChart에서 내 점수 가져오기
            const scoreLabel = getScoreLabel(myScore);

            const scoreStyle = scoreLabel === "미흡" ? { color: "red", fontWeight: "bold" } : {};


            // 막대 그래프 데이터
            const barData = {
              labels: ["평균", "내 점수"],
              datasets: [
                {
                  label: "점수 비교",
                  data: [60, myScore], // 예시 평균값
                  backgroundColor: ["#FA6E7A", "#8187FB"], // 빨간색, 파란색
                  borderWidth: 0,
                  barThickness: 22,
                  borderRadius: 5, // 막대 모서리를 둥글게
                },
              ],
            };

            const barOptions = {
              plugins: {
                legend: { display: false }, // 범례 숨김
                datalabels: {
                  display: true, // 데이터 표시 활성화
                  color: "#000", // 텍스트 색상
                  font: {
                    size: 10, // 텍스트 크기
                  },
                  anchor: "end", // 텍스트 위치
                  align: "end", // 막대 위에 고정
                  formatter: (value) => `${value}`,
                },
              },
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  top: 20, // 상단 여백 추가
                },
              },
              scales: {
                x: {
                  ticks: { font: { size: 10 } }, // x축 글자 크기
                  grid: { drawOnChartArea: false, drawTicks: false }, // x축 선 제거
                },
                y: {
                  beginAtZero: true,
                  max: 100, // y축 최대값을 100으로 고정
                  ticks: { display: false }, // y축 숫자 숨기기
                  grid: { drawTicks: false, display: false }, // y축 선 제거
                },
              },
            };

            return (
              <div key={index} className="feedback-detail-item">
                <div className="feedback-detail-text">
                  <div className="feedback-detail-header">
                    <div className="feedback-detail-title">{detail.category}</div>
                    <div className="feedback-detail-score" style={scoreStyle} >
                      {scoreLabel}
                    </div>
                  </div>
                  <div className="feedback-detail-description">{detail.description}</div>
                </div>
                {/* 막대 그래프 */}
                <div className="feedback-bar-chart">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Feedback;
