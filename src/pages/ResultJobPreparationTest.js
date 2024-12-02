import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "../style/ResultJobPreparationTest.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResultJobPreparationTest = ({ profileData }) => {
  const userName = profileData.name;
  const location = useLocation();

  // 결과 데이터 우선 처리
  const results = location.state?.results || {};
  const dataDate = results.date;

  // 현재 날짜 가져오기
  const currentDate = new Date().toLocaleDateString();
  const displayDate = dataDate || currentDate; // 데이터의 date가 없으면 현재 날짜를 사용

  // 카테고리와 점수 초기화
  const defaultCategoryScores = [
    { category: "경제적 취약성 적응도", score: 3.7 },
    { category: "사회적 취약성 적응도", score: 10.2 },
    { category: "자아 존중감", score: 10.1 },
    { category: "자기 효능감", score: 6.5 },
    { category: "경력의 유동화 능력", score: 8.1 },
    { category: "고용정보 수집활동", score: 2.3 },
  ];
  
  // 데이터에서 제공된 값, 테스트 점수, 기본값 순으로 우선 처리
  const categoryScores = results.categoryScores || 
    (results.labels && results.scores
      ? results.labels.map((label, index) => ({
          category: label,
          score: results.scores[index],
        }))
      : defaultCategoryScores);

  // 카테고리와 점수 분리
  const selectedCategories = categoryScores.map((item) => item.category);
  const selectedScores = categoryScores.map((item) => item.score);

  const chartData = {
    labels: selectedCategories,
    datasets: [
      {
        label: "구직준비도 점수",
        data: selectedScores,
        backgroundColor: "#9BA1FF", // 변경된 색상
        borderColor: "#9BA1FF", // 변경된 색상
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // 차트 비율 유지 안 함
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const exportToPDF = () => {
    const element = document.getElementById("result-container");
    if (!element) return;

    html2canvas(element, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210; // A4 너비(mm)
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userName}님의 구직준비도검사결과_${currentDate}.pdf`);
    });
  };

 // 점수 기반 설명 동적 생성
  const descriptions = {
    "경제적 취약성 적응도": {
      high: "귀하는 현재 경제적으로 안정적인 상태에 있으며, 구직 성공 가능성이 높습니다. 이러한 안정성은 구직활동에 집중할 수 있는 여건을 제공하며, 심리적 안정감 또한 높아질 가능성이 큽니다. 다만, 경제적 여유를 활용해 추가적인 자기개발이나 구직 전략 수립에 투자한다면 더욱 유리할 것입니다.",
      low: "현재 경제적으로 심각하게 취약한 상태에 있으며, 앞으로 생활이 더 어려워질 가능성이 있습니다. 경제적 어려움이 지속되면 심리적, 사회적 어려움이 더욱 커지고 구직에 성공할 가능성은 더 낮아집니다. 신속하게 전문상담원에게 상담을 요청해서 구직활동 중 경제적 부담을 줄이는 방법을 알아보시기 바랍니다.",
    },
    "사회적 취약성 적응도": {
      high: "가족 이외의 지인들에게 정서적 도움을 어느 정도 받고 있는 편입니다. 구직의 어려움을 극복하는 데 주변의 지원이 큰 힘이 될 수 있으므로 더욱 적극적으로 지원을 요청하시기 바랍니다.",
      low: "사회적 네트워크가 부족하여 정서적 지원이 부족할 가능성이 있습니다. 이러한 상황은 구직 활동의 스트레스를 가중시킬 수 있습니다. 주변의 도움을 요청하고, 새로운 인적 네트워크를 구축하려는 노력을 기울이세요. 취업 지원 센터나 관련 커뮤니티를 활용하여 필요한 도움을 적극적으로 요청하시기 바랍니다.",
    },
    "자아 존중감": {
      high:  "귀하는 자기 자신에 대해 대체로 긍정적으로 평가하고 있으며, 비교적 자신감을 가지고 어려운 상황에 대처해 나가려고 노력하고 있습니다. 또한 자신을 비교적 가치 있고, 성공할 만하며, 행복할 자격이 있는 사람으로 생각하는 편입니다. 그러나, 자신에 대해 좀 더 자신감을 가지고 어려움에 대해 적극적으로 대처해 나가며, 자신을 좀 더 존중할 필요가 있습니다.",
      low: "귀하는 스스로에 대한 긍정적 평가가 부족하고, 자신감이 낮을 가능성이 있습니다. 이는 구직 활동에서의 어려움을 더욱 심화시킬 수 있습니다. 자신에 대한 신뢰를 키우기 위해 전문 상담 프로그램이나 자기계발 활동에 참여하는 것을 고려해 보세요. 작은 성공 경험을 반복하며 자신감을 회복하고, 자신을 더 존중하는 태도를 갖추는 것이 중요합니다.",
    },
    "자기 효능감": {
      high: "귀하는 구직에 필요한 자신의 능력을 확신하고 있으며, 자신감 있게 취업 준비를 진행할 수 있습니다. 이러한 자기 효능감은 면접과 같은 구직 과정에서 긍정적으로 작용하며, 취업 성공 가능성을 높이는 중요한 요인입니다. 현재의 자신감을 유지하면서, 구체적인 직무 역량을 더욱 강화한다면 더 나은 결과를 얻을 수 있을 것입니다.",
      low: "귀하는 구직에 대한 자신의 능력을 확신하지 못하며, 자신의 능력에 맞는 직업을 구하는 절차에 대해서도 파악하지 못하고 있습니다. 따라서 상당한 불안감과 스트레스를 경험하고 있을 가능성이 높습니다. 구직에 필요한 상담 프로그램 및 훈련에 반드시 참여할 필요가 있습니다.",
    },
    "경력의 유동화 능력": {
      high: "귀하는 구직에 필요한 정보를 잘 알고 있으며, 직무에 필요한 능력을 유동적으로 활용할 수 있는 역량을 갖추고 있습니다. 이러한 유동화 능력은 다양한 직무와 환경에 빠르게 적응할 수 있는 장점을 제공합니다. 추가적인 면접 기술과 의사소통 능력을 개발하여 자신을 더 잘 표현할 수 있다면 구직 과정에서 큰 성공을 거둘 가능성이 높습니다.",
      low: "귀하는 구직에 필요한 회사정보, 채용기준, 면접 및 서류 작성 등에 관하여 어느 정도 알고 있습니다. 그러나 구직을 도와주는 전문상담원과의 상담을 통해 좀 더 구체적인 구직 과정을 알아볼 필요가 있습니다. 또한 자신의 의사를 적절하게 설명하는데 많은 어려움을 가지고 있습니다. 이는 면접시에 매우 불리하게 작용합니다. 취업지원 프로그램에 참여해서 효과적인 의사전달훈련을 받으시기 바랍니다.",
    },
    "고용정보 수집활동": {
      high: "귀하는 구직에 필요한 정보를 효과적으로 수집하고 활용할 수 있는 능력을 갖추고 있습니다. 이를 통해 구직 과정에서 유리한 위치를 선점할 수 있으며, 다양한 기회를 보다 적극적으로 탐색할 수 있습니다. 추가적으로 네트워크를 강화하고, 전문적인 정보 수집 채널을 활용한다면 더 나은 결과를 기대할 수 있습니다.",
      low: "귀하는 구직에 도움이 되는 인적 네트워크가 매우 부족합니다. 귀하의 현재 상황을 주변에 널리 알리고 도움을 요청해야 구직에 성공할 가능성이 높아집니다. 전문상담원에게 상담을 받으시기 바랍니다. 또한 구직을 위한 정보를 수집하기 위해 자료를 조사하고 정리하는 데 어려움을 보이고 있습니다. 귀하에게 맞는 구직 정보를 신속하게 수집하고 활용하지 않으면 구직에 매우 어려움을 겪을 가능성이 높습니다. 전문상담원에게 상담을 받으시기 바랍니다.",
    },
  };


  return (
    <>
      <div className="print-button-container">
        <button onClick={exportToPDF} className="export-button">
          PDF로 저장
        </button>
      </div>

      <div className="result-job-value-container" id="result-container">
        <div className="result-job-value-header">
          <div>{userName}님의 구직준비도 검사 결과</div>
          <p>검사 날짜: {displayDate}</p>
        </div>

        <div className="result-job-value-detail-header">
          <div>차원별 프로파일</div>
        </div>

        <div className="result-job-value-main">
          <div className="result-chart-section">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="result-job-value-detail-header">
          <div>결과 해석</div>
        </div>

        <div className="result-job-value-main">
          <div className="preparation-table-section">
            <table className="preparation-table">
              <tbody>
              {categoryScores.map((item) => (
                  <tr key={item.category}>
                    <th>{item.category}</th>
                    <td>
                      {item.score >= 6
                        ? descriptions[item.category]?.high
                        : descriptions[item.category]?.low}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultJobPreparationTest;
