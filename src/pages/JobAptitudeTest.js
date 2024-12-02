import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/JobAptitudeTest.css";

const JobAptitudeTest = () => {
  //const [isStarted, setIsStarted] = useState(false); // 초기화면과 검사화면 전환 상태
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계
  const [answers, setAnswers] = useState(Array(20).fill(null)); // 20문항 답변 상태
  //const [submitted, setSubmitted] = useState(false); // 제출 상태
  const navigate = useNavigate(); // 추가: navigate 초기화
  //const [remainingTime, setRemainingTime] = useState(300); // 5분 = 300초 활성화하려면 useEffect import해야함

  // 각 단계의 "분야" 데이터 추가
  const stepTopics = [
    "유의어 찾기 - 괄호 친 단어와 비슷한 뜻을 가진 단어를 보기 중에서 찾으시오.",
    "단어 뜻 찾기 - 문제에서 말하는 단어를 찾으시오.",
    "계산 능력 검사 - 문제에서 말하는 계산을 하십시오.",
    "상황 판단하기 - 문제에서 말하는 상황 중 적절한 답을 찾으시오.",
  ];

  const questions = [
    // 어휘력 문제 (5문제)
    {
      text: "나는 졸업을 한 언니에게 꽃다발을 한 아름 (선사)했다.",
      options: ["선언", "선물", "선서", "치사"],
      correct: "선물"
    },
    {
      text: "칭송받던 대통령이 (서거)하였다.",
      options: ["진진", "졸마", "진출", "타계"],
      correct: "타계"
    },
    {
      text: "그 사람들은 내년 (초봄)에 결혼하기로 했다.",
      options: ["만월", "늦봄", "조춘", "만춘"],
      correct: "조춘"
    },
    {
      text: "목격자가 자신이 아는 모든 것을 (실토)하였다.",
      options: ["언급", "폭로", "거론", "누설"],
      correct: "폭로"
    },
    {
      text: "이번 결정을 잠시 (보류)하는 것이 좋을 것 같다.",
      options: ["부결", "보수", "유배", "유보"],
      correct: "유보"
    },

    // 단어 뜻 문제 (5문제)
    {
      text: "다음 중 '창의성'의 뜻을 가장 잘 나타내는 단어는 무엇입니까?",
      options: ["독창성", "사고력", "지능", "능력"],
      correct: "독창성"
    },
    {
      text: "다음 중 '성취'와 가장 관련 있는 뜻은?",
      options: ["목표 달성", "시간 절약", "계획 수립", "조직력"],
      correct: "목표 달성"
    },
    {
      text: "다음 중 '협력'의 올바른 뜻은?",
      options: ["함께 일하기", "개인 업무", "도움 요청", "창의적 사고"],
      correct: "함께 일하기"
    },
    {
      text: "다음 중 '긍정'이라는 단어를 가장 잘 설명하는 뜻은?",
      options: ["낙관", "비관", "평화", "도전"],
      correct: "낙관"
    },
    {
      text: "다음 중 '책임감'의 정의로 가장 적절한 것은?",
      options: ["자신의 역할을 다하는 태도", "타인에게 도움 요청", "결과를 무시하는 태도", "결정을 회피하는 태도"],
      correct: "자신의 역할을 다하는 태도"
    },

    // 계산 능력 검사 (5문제)
    {
      text: "어떤 상품의 원가는 100원이며, 20%의 이익을 붙여 판매했습니다. 판매가는 얼마입니까?",
      options: ["120원", "130원", "140원", "150원"],
      correct: "120원"
    },
    {
      text: "6명의 학생이 각각 사과를 3개씩 받았습니다. 총 몇 개의 사과가 필요한가요?",
      options: ["15개", "18개", "20개", "25개"],
      correct: "18개"
    },
    {
      text: "50에서 15를 빼고 10을 더한 결과는?",
      options: ["40", "45", "50", "55"],
      correct: "45"
    },
    {
      text: "어떤 숫자의 1/4이 12라면, 그 숫자는 무엇입니까?",
      options: ["36", "48", "60", "72"],
      correct: "48"
    },
    {
      text: "3시간 동안 시속 60km로 이동했습니다. 이동한 총 거리는 몇 km입니까?",
      options: ["120km", "180km", "200km", "240km"],
      correct: "180km"
    },

    // 상황 판단력 검사 (5문제)
    {
      text: "당신은 친구와 약속이 있는데 교통이 너무 막혀서 늦을 것 같습니다. 이때 당신이 가장 적절히 할 행동은?",
      options: [
        "미리 전화로 늦을 것 같다고 알린다.",
        "아무 말 없이 도착해서 사과한다.",
        "늦더라도 이유를 말하지 않는다.",
        "약속을 취소한다.",
      ],
      correct: "미리 전화로 늦을 것 같다고 알린다."
    },
    {
      text: "직장에서 상사가 불가능한 일정을 요구했습니다. 가장 적절한 대응은?",
      options: [
        "정중히 일정 조정의 필요성을 제안한다.",
        "요구에 맞춰 무리해서라도 일한다.",
        "아무 말 없이 일을 거부한다.",
        "동료에게 일을 떠넘긴다.",
      ],
      correct: "정중히 일정 조정의 필요성을 제안한다."
    },
    {
      text: "길을 걷다가 낯선 사람이 길을 물어봅니다. 가장 적절한 행동은?",
      options: [
        "알고 있다면 친절히 알려준다.",
        "아는 척하며 잘못된 정보를 준다.",
        "바빠서 대답하지 않고 지나간다.",
        "다른 사람에게 물어보라고 한다.",
      ],
      correct: "알고 있다면 친절히 알려준다."
    },
    {
      text: "팀 프로젝트에서 의견이 충돌할 때 가장 적절한 행동은?",
      options: [
        "모든 팀원의 의견을 들은 후 중재한다.",
        "내 의견을 강하게 주장한다.",
        "다른 사람의 의견에 무조건 따른다.",
        "의견 충돌을 피하기 위해 침묵한다.",
      ],
      correct: "모든 팀원의 의견을 들은 후 중재한다."
    },
    {
      text: "회의 중에 실수로 중요한 문서를 잃어버렸습니다. 가장 적절한 대처는?",
      options: [
        "즉시 팀원들에게 알리고 대안을 찾는다.",
        "잃어버린 사실을 숨긴다.",
        "회의가 끝난 후 혼자 해결하려 한다.",
        "누군가에게 책임을 전가한다.",
      ],
      correct: "즉시 팀원들에게 알리고 대안을 찾는다."
    },
  ];


  const getQuestionsForStep = (step) => {
    const startIndex = (step - 1) * 5;
    return questions.slice(startIndex, startIndex + 5);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleNextStep = () => {
    if (currentStep < Math.ceil(questions.length / 5)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const unanswered = answers
      .map((answer, index) => (answer === null ? index + 1 : null))
      .filter((item) => item !== null);

    if (unanswered.length > 0) {
      alert(`아래 문항에 답변하지 않았습니다. 완료해주세요!: \n ${unanswered.join(", ")}`);
      return;
    }

    // 11개의 카테고리와 그에 대한 점수를 설정
    const labels = [
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
    ];

    // 문제를 11개의 그룹으로 나눔
    const groupedQuestions = [
      [0, 1], // 언어력
      [2, 3], // 수리력
      [4, 5], // 추리력
      [6, 7], // 공간 지각력
      [8, 9], // 사물 지각력
      [10, 11], // 상황 판단력
      [12, 13], // 기계능력
      [14, 15], // 집중력
      [16], // 색채 지각력
      [17], // 문제 해결능력
      [18, 19], // 사고 유창력
    ];

    const scores = groupedQuestions.map((group) =>
      Math.round(
        group.reduce((sum, questionIndex) => {
          const correct = questions[questionIndex]?.correct;
          return sum + (answers[questionIndex] === correct ? 150 : 80);
        }, 0) / group.length
      )
    );
  
    const results = {
      title: "직업적성검사 결과",
      labels,
      scores,
      date: new Date().toLocaleDateString(),
    };
  
    navigate("/result-job-aptitude-test", { state: { results } });
  };

  return (
    <div className="JobAptitudeTest-container">
      <>
        {/* 상단 헤더 */}
        <div className="JobAptitudeTest-header">
          <h1>직업적성검사 진행중</h1>
        </div>

        {/* 진행 바 */}
        <div className="JobAptitudeTest-progress">
          <div
            className="JobAptitudeTest-progress-bar"
            style={{
              width: `${(currentStep / Math.ceil(questions.length / 5)) * 100}%`,
            }}
          />
        </div>

        <div className="JobAptitudeTest-questions-info">
          <p>{stepTopics[currentStep - 1]}</p>
        </div>

        {/* 문항 */}
        <div className="JobAptitudeTest-questions">
          {getQuestionsForStep(currentStep).map((question, index) => (
            <div key={index} className="JobAptitudeTest-question">
              <p>{`${(currentStep - 1) * 5 + index + 1}. ${question.text}`}</p>
              <div
                className={`JobAptitudeTest-options ${currentStep === 4 ? "JobAptitudeTest-options-single" : ""
                  }`}
              >
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="JobAptitudeTest-option">
                    <input
                      type="radio"
                      name={`question-${(currentStep - 1) * 5 + index}`}
                      value={option}
                      checked={answers[(currentStep - 1) * 5 + index] === option}
                      onChange={() =>
                        handleAnswerChange((currentStep - 1) * 5 + index, option)
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="JobAptitudeTest-navigation">
          <div>
            {currentStep > 1 && (
              <button
                className="JobAptitudeTest-button JobAptitudeTest-button-prev"
                onClick={handlePreviousStep}
              >
                이전
              </button>
            )}
          </div>
          <div>
            {currentStep < Math.ceil(questions.length / 5) ? (
              <button
                className="JobAptitudeTest-button JobAptitudeTest-button-next"
                onClick={handleNextStep}
              >
                다음
              </button>
            ) : (
              <button
                className="JobAptitudeTest-button JobAptitudeTest-button-submit"
                onClick={handleSubmit}
              >
                답변 제출
              </button>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default JobAptitudeTest;
