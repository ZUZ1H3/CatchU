const testResultsData = [
  {
    title: "직업가치관검사 실시 내역",
    date: "11/30",
    type: "value", // 결과 페이지의 타입
    data: {
      title: "직업가치관검사 결과", // 결과 제목
      labels: [
        "사회적 공헌",
        "변화지향",
        "성취",
        "경제적 보상",
        "자기개발",
        "일과 삶의 균형",
        "사회적 인정",
        "자율성",
        "직업안정",
      ], // 카테고리 이름
      scores: [4.7, 4.2, 4.1, 3.5, 3.1, 2.3, 2.1, 1.5, 1.1], // 원점수
      standardScores: [66, 63, 62, 53, 47, 34, 32, 23, 17], // 표준점수
      levels: ["최상", "상", "상", "상", "중", "중", "하", "하", "최하"], // 수준
      topRank: [
        { category: "사회적 공헌", score: 4.7 },
        { category: "변화지향", score: 4.2 },
        { category: "성취", score: 4.1 },
      ], // 상위 3순위
      lowRank: [
        { category: "자율성", score: 1.5 },
        { category: "직업안정", score: 1.1 },
        { category: "사회적 인정", score: 2.1 },
      ], // 하위 3순위
      recommendedJobs: [
        "감사 사무원",
        "감정평가사",
        "경영 기획 사무원",
        "고객 상담원",
        "관세사",
        "광고·홍보·마케팅 사무원",
        "행사기획자",
        "회계사",
      ], // 추천 직업
      date: "2024.11.30",
    },
  },
  {
    title: "직업적성검사 실시 내역",
    date: "11/21",
    type: "aptitude", // 결과 페이지의 타입
    data: {
      title: "직업적성검사 결과",
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
      scores: [114, 127, 123, 123, 110, 98, 106, 117, 117, 85, 109],
      levels: ["상", "최상", "최상", "최상", "중상", "중하", "중상", "상", "상", "하", "중상"], // 수준 데이터
      percentiles: [82, 96, 94, 93, 74, 44, 66, 86, 87, 15, 73], // 백분위
      date: "2024.11.21",
    },
  },
  {
    title: "구직준비도 검사 실시 내역",
    date: "11/15",
    type: "preparation",
    data: {
      title: "구직준비도 검사 결과",
      labels: [
        "경제적 취약성 적응도",
        "사회적 취약성 적응도",
        "자아 존중감",
        "자기 효능감",
        "경력의 유동화 능력",
        "고용정보 수집활동"
      ],
      scores: [8.7, 8.2, 8.1, 6.5, 6.1, 5.3], // 각 차원별 점수  
      date: "2024.11.15"
    },
  },
];

export default testResultsData;