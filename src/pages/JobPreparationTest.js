import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/JobPreparationTest.css";

const JobPreparationTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(20).fill(null)); // 총 20문항
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계

  const questions = [
    "나는 구직 목표를 명확히 설정하고 있다.",
    "나는 현재의 경제적 상황을 잘 이해하고 있다.",
    "나는 취업과 관련된 정보를 충분히 알고 있다.",
    "나는 새로운 환경에서 유연하게 적응할 수 있다.",
    "나는 자신감 있게 자신의 역량을 설명할 수 있다.",
    "나는 스트레스를 효과적으로 관리할 수 있다.",
    "나는 취업 준비 과정에서 시간을 효율적으로 관리한다.",
    "나는 나의 취업 목표를 달성하기 위해 필요한 역량을 알고 있다.",
    "나는 지원하는 직무에 대한 명확한 이해를 가지고 있다.",
    "나는 이력서를 잘 작성할 수 있다.",
    "나는 면접에서 자신 있게 대답할 수 있다.",
    "나는 구직 활동에 적극적으로 참여한다.",
    "나는 자신만의 구직 전략을 가지고 있다.",
    "나는 새로운 직업 관련 기술을 배우고 있다.",
    "나는 구직 활동 중 발생하는 문제를 잘 해결할 수 있다.",
    "나는 취업 시장의 트렌드를 잘 파악하고 있다.",
    "나는 목표 직업에 필요한 기술과 역량을 학습하고 있다.",
    "나는 구직 활동의 결과를 객관적으로 평가할 수 있다.",
    "나는 구직 관련 네트워크를 효과적으로 활용한다.",
    "나는 구직과 관련된 긍정적인 태도를 유지한다.",
  ];

  const options = ["매우 그렇다", "그렇다", "보통이다", "아니다", "매우 아니다"];

  const handleAnswerChange = (questionIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(questions.length / 5) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("모든 질문에 답변해주세요.");
      return;
    }

    // 점수 계산
    const categories = [
      { name: "경제적 취약성 적응도", questions: [0, 1, 2, 6] },
      { name: "사회적 취약성 적응도", questions: [3, 7, 8] },
      { name: "자아 존중감", questions: [4, 14, 16] },
      { name: "자기 효능감", questions: [5, 9, 10] },
      { name: "경력의 유동화 능력", questions: [11, 12, 19] },
      { name: "고용정보 수집활동", questions: [15, 17, 18] },
    ];

    const scoreMapping = {
      "매우 그렇다": 3,
      그렇다: 2.5,
      보통이다: 2,
      아니다: 1.5,
      "매우 아니다": 1,
    };

    const categoryScores = categories.map((category) => ({
      category: category.name,
      score: category.questions.reduce(
        (sum, questionIndex) => sum + scoreMapping[answers[questionIndex]],
        0
      ),
    }));

    // 결과 페이지로 이동
    navigate("/result-job-preparation-test", { state: { categoryScores } });
  };

  const questionsToDisplay = questions.slice(currentPage * 5, currentPage * 5 + 5);

  return (
    <div className="preparation-test-container">
      
      <div className="job-value-header">
        <h1>직업가치관검사 진행중</h1>
        {/* 진행 바 */}
        <div className="job-value-progress">
          <div
            className="job-value-progress-bar"
            style={{
              width: `${(currentStep / Math.ceil(questions.length / 5)) * 100}%`,
            }}
          />
        </div>
        <p>다음 질문에 대해 본인의 의견에 가장 가까운 답을 선택해주세요.</p>
      </div>

      <div className="preparation-questions">
        {questionsToDisplay.map((question, index) => {
          const questionIndex = currentPage * 5 + index; // 전체 질문 배열에서의 인덱스
          return (
            <div key={questionIndex} className="preparation-question">
              <p>{`${questionIndex + 1}. ${question}`}</p>
              <div className="preparation-options">
                {options.map((option, optionIndex) => (
                  <label key={optionIndex} className="preparation-option">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={option}
                      onChange={() => handleAnswerChange(questionIndex, option)}
                      checked={answers[questionIndex] === option}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="job-value-navigation">
        {currentPage > 0 && (
          <button onClick={handlePreviousPage} className="job-value-button-left">
            이전
          </button>
        )}
        {currentPage < Math.ceil(questions.length / 5) - 1 ? (
          <button onClick={handleNextPage} className="job-value-button-right">
            다음
          </button>
        ) : (
          <button onClick={handleSubmit} className="job-value-button-right">
            답변 제출
          </button>
        )}
      </div>
    </div>
  );
};

export default JobPreparationTest;
