import React from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "../style/ResultJobAptitudeTest.css";
import profileData from "../data/ProfileData.js";

const ResultJobAptitudeTest = () => {
  const location = useLocation();
  const { results } = location.state;
  const userName = profileData.name;

  const data = {
    labels: [
      "언어력",
      "수리력",
      "추리력",
      "공간 지각력",
      "사물 지각력",
      "상황 판단력",
      "기계능력",
      "집중력",
      "색채 지각력",
      "문제 해결능력",
      "사고 유창력",
    ],

    datasets: [
      {
        label: "점수",
        data: [114, 127, 123, 123, 110, 98, 106, 117, 117, 85, 109],
        fill: false,
        borderColor: "#666eff",
        backgroundColor: "#666eff",
        tension: 0.4,
      },
    ],
  };

  // 그래프 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false, // 부모 크기에 맞게 조정
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 40,
        max: 150,
        title: {
          display: true,
          text: "점수",
        },
      },
      x: {
        title: {
          display: true,
          text: "적성 요인",
        },
      },
    },
  };

  // 새롭게 추가된 그래프 데이터
  const recommendData = {
    labels: [
      "언어력",
      "수리력",
      "추리력",
      "공간 지각력",
      "사물 지각력",
      "상황 판단력",
      "기계능력",
      "집중력",
      "색채 지각력",
      "문제 해결능력",
      "사고 유창력",
    ],
    datasets: [
      {
        type: "line",
        label: "나",
        data: [114, 127, 123, 123, 110, 98, 106, 117, 117, 85, 109],
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        tension: 0.4,
        fill: false,
      },
      {
        type: "bar",
        label: "법률 전문가",
        data: [114, 115, 109, 106, 101, 102, 105, 104, 109, 103, 106],
        backgroundColor: "rgba(255, 223, 71, 0.7)",
      },
    ],
  };

  const recommendOptions = {
    responsive: true,
    maintainAspectRatio: false, // 부모 크기에 맞게 조정
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        min: 40,
        max: 150,
        title: {
          display: true,
          text: "점수",
        },
      },
      x: {
        title: {
          display: true,
          text: "적성 요인",
        },
      },
    },
  };

  return (
    <div className="resultaptitude-container">
      <div className="resultaptitude-header">
        <div>{userName}님의 직업적성검사 결과</div>
      </div>

      {/* 지표별 해석 */}
      <div className="resultaptitude-details-header">
        <div>프로파일 해석</div>
      </div>

      <div className="resultaptitude-main">
        {/* 그래프 */}
        <div className="resultaptitude-graph">
          <div style={{ width: "100%", height: "300px" }}>
            <Line data={data} options={options} />
          </div>
        </div>
        <br></br>
        {/* 표 */}
        <div className="resultaptitude-table">
          <table>
            <thead>
              <tr>
                <th>구분</th>
                {data.labels.map((label, index) => (
                  <th key={index}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>수준</th>
                <td>상</td>
                <td>최상</td>
                <td>최상</td>
                <td>최상</td>
                <td>중상</td>
                <td>중하</td>
                <td>중상</td>
                <td>상</td>
                <td>상</td>
                <td>하</td>
                <td>중상</td>
              </tr>
              <tr>
                <th>변환점수</th>
                {data.datasets[0].data.map((score, index) => (
                  <td key={index}>{score}</td>
                ))}
              </tr>
              <tr>
                <th>백분위</th>
                <td>82</td>
                <td>96</td>
                <td>94</td>
                <td>93</td>
                <td>74</td>
                <td>44</td>
                <td>66</td>
                <td>86</td>
                <td>87</td>
                <td>15</td>
                <td>73</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 지표별 해석 */}
      <div className="resultaptitude-details-header">
        <div>직업 추천 결과</div>
      </div>

      <div className="resultaptitude-main">
        <p>나의 적합특성에 적합한 직업</p>
        <div className="resultaptitude-table">
          <table>
            <thead>
              <tr>
                <th>추천 순위</th>
                <th>직 업</th>
                <th>세부 직업</th>
                <th>중요직성 요인</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>법률 전문가</td>
                <td>판사 및 검사, 변호사, 법무사 및 집행관, 변리사</td>
                <td>언어력/추리력/수리력</td>
              </tr>
              <tr>
                <td>2</td>
                <td>약사 및 한약사</td>
                <td>약사 및 한약사</td>
                <td>수리력/추리력/언어력/문제해결능력</td>
              </tr>
              <tr>
                <td>3</td>
                <td>의사</td>
                <td>전문의사, 일반의사, 한의사, 치과의사, 수의사</td>
                <td>수리력/언어력/추리력/상황판단력</td>
              </tr>
              <tr>
                <td>4</td>
                <td>회계·세무·감정평가 전문가</td>
                <td>회계사, 세무사, 관세사, 감정평가사, 감정사 (예술품·보석·식품)</td>
                <td>수리력/추리력/언어력</td>
              </tr>
              <tr>
                <td>5</td>
                <td>중등교사</td>
                <td>중등교사</td>
                <td>언어력/문제해결능력/수리력</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <p>추천직업과의 비교: 법률 전문가</p>
        {/*그래프 */}
        <div className="resultaptitude-graph2">
          <div style={{ width: "100%", height: "400px" }}>
            <Line data={recommendData} options={recommendOptions} />
          </div>
        </div>
        <br></br>
        <div className="resultaptitude-table">
          <table>
            <thead>
              <tr>
                <th>구분</th>
                {recommendData.labels.map((label, index) => (
                  <th key={index}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{userName} 님</th>
                {recommendData.datasets[0].data.map((score, index) => (
                  <td key={index}>{score}</td>
                ))}
              </tr>
              <tr>
                <th>추천직업</th>
                {recommendData.datasets[1].data.map((score, index) => (
                  <td key={index}>{score}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultJobAptitudeTest;
