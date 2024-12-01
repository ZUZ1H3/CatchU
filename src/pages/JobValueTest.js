import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/JobValueTest.css";

const JobValueTest = () => {
  const [answers, setAnswers] = useState(Array(20).fill(null)); // 20개 질문의 답변 상태
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계

  // 질문 데이터 (20개)
  const questions = [
    "나는 일을 통해 사회적 공헌을 하고 싶다.",
    "나는 변화가 많은 환경에서 일하고 싶다.",
    "나는 일을 통해 개인적인 성취를 이루고 싶다.",
    "나는 일의 대가로 경제적 보상을 중요하게 생각한다.",
    "나는 직업을 통해 지속적인 자기 개발을 하고 싶다.",
    "나는 일과 삶의 균형을 중요하게 생각한다.",
    "나는 사회적으로 인정받는 일을 하고 싶다.",
    "나는 자율성이 높은 일을 선호한다.",
    "나는 내 일을 통해 타인의 삶에 긍정적인 영향을 주고 싶다.",
    "나는 창의력을 발휘할 수 있는 일을 하고 싶다.",
    "나는 팀워크가 중요한 일을 하고 싶다.",
    "나는 일에서 안정성을 중요하게 생각한다.",
    "나는 승진 가능성이 높은 직업을 원한다.",
    "나는 다양한 경험을 쌓을 수 있는 일을 하고 싶다.",
    "나는 규칙적이고 예측 가능한 업무를 선호한다.",
    "나는 내 직업이 나의 가치를 반영하기를 바란다.",
    "나는 일과 관련된 새로운 기술을 배우고 싶다.",
    "나는 내가 하는 일이 사회적으로 인정받기를 원한다.",
    "나는 도전적인 목표를 달성하는 일을 하고 싶다.",
    "나는 스스로 계획을 세워 실행할 수 있는 직업을 선호한다.",
  ];

  // 선택지
  const options = ["매우 그렇다", "그렇다", "보통이다", "아니다", "매우 아니다"];

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
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

    // 9개의 카테고리와 관련 질문 매핑
    const categories = [
      { name: "사회적 공헌", questions: [0, 8] },
      { name: "변화지향", questions: [1, 13] },
      { name: "성취", questions: [2, 18] },
      { name: "경제적 보상", questions: [3, 12] },
      { name: "자기개발", questions: [4, 16] },
      { name: "일과 삶의 균형", questions: [5, 14] },
      { name: "사회적 인정", questions: [6, 17, 10] },
      { name: "자율성", questions: [7, 19] },
      { name: "직업안정", questions: [9, 11] },
    ];

    // 점수 변환 (선택지에 따라 점수 부여)
    const scoreMapping = {
      "매우 그렇다": 3,
      그렇다: 2.5,
      보통이다: 2,
      아니다: 1.5,
      "매우 아니다": 1,
    };

    // 카테고리별 점수 계산
    const categoryScores = categories.map((category) => ({
      category: category.name,
      score: category.questions.reduce(
        (sum, questionIndex) => sum + scoreMapping[answers[questionIndex]],
        0
      ),
      date: new Date().toLocaleDateString(),
    }));

    // 결과 페이지로 이동
    navigate("/result-job-value-test", { state: { categoryScores } });
  };

  // 현재 페이지에 표시할 질문 계산
  const questionsToDisplay = questions.slice(currentPage * 5, currentPage * 5 + 5);

  return (
    <div className="job-value-container">

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

      <div className="job-value-questions">
        {questionsToDisplay.map((question, index) => {
          const questionIndex = currentPage * 5 + index; // 전체 질문 배열에서의 인덱스
          return (
            <div key={questionIndex} className="job-value-question">
              <p>{`${questionIndex + 1}. ${question}`}</p>
              <div className="job-value-options">
                {options.map((option, optionIndex) => (
                  <label key={optionIndex} className="job-value-option">
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
        {/* "이전" 버튼을 보이지 않도록 처리 */}
        {currentPage > 0 && (
          <button className="job-value-button-left" onClick={handlePreviousPage}>
            이전
          </button>
        )}
        <button
          className="job-value-button-right"
          onClick={currentPage < Math.ceil(questions.length / 5) - 1 ? handleNextPage : handleSubmit}
        >
          {currentPage < Math.ceil(questions.length / 5) - 1 ? "다음" : "답변 제출"}
        </button>
      </div>
    </div>
  );
};

export default JobValueTest;
