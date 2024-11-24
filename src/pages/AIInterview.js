import React, { useState } from "react";
import "../style/AIInterview.css";

const AIInterview = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(""); // 선택된 산업군
  const [jobs, setJobs] = useState([]); // 선택된 직무 리스트
  const [selectedJob, setSelectedJob] = useState(""); // 선택된 직무

  const industryJobs = {
    "IT / 데이터": ["소프트웨어 / 웹 / 앱", "빅데이터", "인공지능", "정보보안", "네트워크 / 서버"],
    "화학 / 에너지 / 환경": ["환경 엔지니어", "화학 연구원", "에너지 컨설턴트"],
    "목재 / 가구 / 제지": ["목재 디자이너", "가구 제작자", "제지 기술자"],
    "판매 / 유통 / 영업 / 무역": ["영업 사원", "무역 전문가", "유통 관리사"],
    "식품": ["식품 연구원", "품질 관리 전문가", "식품 디자이너"],
    "외국어 면접": ["영어 통역사", "중국어 번역가", "일본어 전문가"],
    "정치": ["정치 컨설턴트", "정책 분석가", "공공 행정 전문가"],
  };

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setJobs(industryJobs[industry] || []);
    setSelectedJob(""); // 새로운 산업군을 선택하면 직무 선택 초기화
  };

  const handleJobClick = (job) => {
    setSelectedJob(job); // 선택된 직무 업데이트
  };

  return (
    <div>
      {/* 검색 영역 */}
      <div className="search-container">
        <label htmlFor="search" className="search-label">
          직무를 선택해주세요.
        </label>
        <input
          type="text"
          id="search"
          className="search-input"
          placeholder="직무 키워드를 검색해 보세요"
        />
      </div>

      {/* 메인 컨테이너 */}
      <div className="ai-interview-container">
        <div className="table-wrapper">
          {/* 열 사이 구분선 */}
          <div className="table-divider"></div>

          {/* 산업군 테이블 */}
          <div className="table-column industry-column">
            <div className="table-header">산업군</div>
            {Object.keys(industryJobs).map((industry) => (
              <div
                key={industry}
                onClick={() => handleIndustryClick(industry)}
                className={`table-cell ${
                  selectedIndustry === industry ? "selected" : ""
                }`}
              >
                {industry}
              </div>
            ))}
          </div>

          {/* 직무 테이블 */}
          <div className="table-column job-column">
            <div className="table-header">직무</div>
            {jobs.map((job) => (
              <div
                key={job}
                onClick={() => handleJobClick(job)}
                className={`table-cell ${selectedJob === job ? "selected" : ""}`}
              >
                {job}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 확인 버튼 */}
      <div className="button-container">
        <button className="confirm-button" type="button">
          확인
        </button>
      </div>
    </div>
  );
};

export default AIInterview;