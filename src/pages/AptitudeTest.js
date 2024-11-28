import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AptitudeTest.css';
import '../style/AptitudeTestPopup.css';
import '../style/AptitudeTestChart.css';

const AptitudeTest = () => {
  const [selectedTest, setSelectedTest] = useState(null); // 선택된 검사 상태 관리
  const navigate = useNavigate(); // React Router의 navigate 사용

  // 각 검사에 대한 데이터
  const testData = [
    {
      id: 1,
      //route: '/job-value-test',
      route: '/job-aptitude-test',
      value: '가치',
      title: '직업가치관검사',
      description: '직업선택 시 중요하게 생각하는 자신의 직업가치관이 무엇인지 확인하고 그에 적합한 직업분야에 대해 알아볼 수 있습니다.',
      target: '만 15세 이상',
      time: '약 20분 소요',
      details: '직업가치관 이해 및 적합직업 안내',
      valuefactor: '가치요인',
      valueexplain: '가치설명',
      factors: [
        { name: '사회적 공헌', description: '일을 통해 다른 사람이나 사회에 도움이 되는 것을 중시' },
        { name: '변화지향', description: '업무가 고정되어 있지 않고 변화 가능한 것을 중시' },
        { name: '성취', description: '자신이 세운 목표를 이루고 달성해 나가는 것을 중시' },
        { name: '경제적 보상', description: '일에 대한 정당한 대가로서의 돈을 중시' },
        { name: '자기개발', description: '직업을 통해 지식, 기술, 능력 등을 발전시켜 성장해 나가는 것을 중시' },
        { name: '일과 삶의 균형', description: '일 뿐만 아니라 자신의 삶에서도 만족할 수 있도록 적절한 균형을 가질 수 있는 것을 중시' },
        { name: '사회적 인정', description: '일과 관련하여 다른 사람에게 인정받는 것을 중시' },
        { name: '자율성', description: '자율적으로 업무를 해 나가는 것을 중시' },
      ],
    },
    {
      id: 2,
      route: '/job-aptitude-test',
      value: '적성',
      title: '직업적성검사',
      description: '직업선택 시 중요한 능력과 적성을 토대로 적합한 직업을 알아볼 수 있습니다.',
      target: '	만 18세 이상',
      time: '약 80분 소요',
      details: '자신의 적성에 맞는 직업분야 제시',
      valuefactor: '작성요인',
      valueexplain: '하위검사',
      factors: [
        { name: "언어력", description: "어휘력 검사", description2: "문장독해력 검사" },
        { name: "수리력", description: "계산능력 검사", description2: "자료해석력 검사" },
        { name: "추리력", description: "수열추리력1,2 검사", description2: "도형추리력 검사" },
        { name: "공간지각력", description: "조각맞추기 검사", description2: "그림맞추기 검사" },
        { name: "색채지각력", description: "색혼합 검사", description2: "색구분 검사" },
        { name: "사물지각력", description: "사물지각력 검사", description2: null },
        { name: "상황판단력", description: "상황판단력 검사", description2: null },
        { name: "집중력", description: "집중력 검사", description2: null },
      ],
    },
    {
      id: 3,
      route: '/job-aptitude-test',
      //route: '/job-preparation-test',
      value: '취업준비도',
      title: '구직준비도검사',
      description: '성공적인 구직을 위해 어느 정도 준비가 되어 있는지 파악하여, 이를 토대로 적합한 취업지원 서비스를 확인할 수 있습니다.',
      target: '성인 구직자 (고등학교 졸업예정자 포함)',
      time: '약 20분 소요',
      details: '구직활동과 관련한 특성을 측정하여 실직자에게 구직활동에 유용한 정보를 제공',
      factors: [], // 비어있는 factors
      measure: [
        { name: '경제적 취약성 적응도', score: 45 },
        { name: '사회적 취약성 적응도', score: 76 },
        { name: '자아 존중감', score: 90 },
        { name: '자기 효능감', score: 10 },
        { name: '경력의 유동화 능력', score: 87 },
        { name: '고용정보 수집활동', score: 88 },
      ],
    },
    {
      id: 4,
      value: '추가',
      title: '이후에 추가예정',
      description: '이후에 추가될 적성검사입니다.',
      target: '대학생 및 성인',
      time: '미정',
      details: '추후 추가될 상세 내용',
    },
  ];

  const openPopup = (test) => {
    setSelectedTest(test); // 클릭된 검사 데이터를 저장
  };

  const closePopup = () => {
    setSelectedTest(null); // 팝업 닫기
  };

  const renderChart = (measure) => {
    if (!measure || measure.length === 0) return null; // measure가 없거나 비어 있으면 아무것도 렌더링하지 않음

    return (
      <table className="chart-table">
        <thead>
          <tr>
            <th>척도명</th>
            <th>백분위</th>
            <th>
              시각화
              <div className="chart-grid-header">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="chart-grid-label">{(i + 1) * 10}</span>
                ))}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {measure.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.score !== undefined ? `${item.score}` : '점수 없음'}</td>
              <td>
                <div className="chart-bar">
                  <div className="chart-grid">
                    {[...Array(10)].map((_, i) => (
                      <span key={i} className="chart-grid-line"></span>
                    ))}
                  </div>
                  <div
                    className="chart-bar-fill"
                    style={{
                      width: item.score !== undefined ? `${item.score}%` : '0%',
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="AptitudeTest-container">
      <div className="AptitudeTest-header">
        <h1 className="AptitudeTest-title">적성검사실시</h1>
        <div className="description-box">
          <p className="description">
            - 검사별 ‘안내’ 버튼을 클릭해서 내용을 확인하신 후 자신에게 적합한 검사를 받아보시길 바랍니다.
            <br />
            - 검사는 CATCHU를 통해 즉시 실시 가능하며, 검사결과는 검사 직후 ‘검사결과 보기’를 통해 확인해 보실 수 있습니다.
          </p>
        </div>
      </div>

      <div className="test-options">
        {testData.map((test, index) => {
          // 한 줄에 두 개씩 묶어서 렌더링
          if (index % 2 === 0) {
            return (
              <div className="test-row" key={index}>
                <div className="test-item">
                  <div className="value-box">{test.value}</div>
                  <h3 className="test-title">{test.title}</h3>
                  <p className="test-description">{test.description}</p>
                  <div>
                    <div className="target-box">대학생</div>
                    <div className="target-box">성인</div>
                  </div>
                  <div className="button-box">
                    <button className="description-button" onClick={() => openPopup(test)}>
                      검사 안내
                    </button>
                    <button className="test-button" onClick={() => navigate(test.route)}>검사 실시</button>
                  </div>
                </div>
                {testData[index + 1] && (
                  <div className="test-item">
                    <div className="value-box">{testData[index + 1].value}</div>
                    <h3 className="test-title">{testData[index + 1].title}</h3>
                    <p className="test-description">{testData[index + 1].description}</p>
                    <div>
                      <div className="target-box">대학생</div>
                      <div className="target-box">성인</div>
                    </div>
                    <div className="button-box">
                      <button
                        className="description-button"
                        onClick={() => openPopup(testData[index + 1])}
                      >
                        검사 안내
                      </button>
                      <button
                        className="test-button"
                        onClick={() => navigate(testData[index + 1].route)} // 다음 검사로 이동
                      >검사 실시</button>
                    </div>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* 팝업 */}
      {selectedTest && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="popup-close" onClick={closePopup}>
              ✖
            </button>
            <h2>{selectedTest.title}</h2>
            <hr />
            <div className="popup-description">{selectedTest.description}</div>
            <table className="popup-table">
              <tbody>
                <tr>
                  <th>검사 대상</th>
                  <td>{selectedTest.target}</td>
                  <th>검사 시간</th>
                  <td>{selectedTest.time}</td>
                </tr>
                <tr>
                  <th>주요 내용</th>
                  <td colSpan="3">{selectedTest.details}</td>
                </tr>
              </tbody>
            </table>
            <br />
            {/* factors 테이블 렌더링 */}
            {selectedTest.factors && selectedTest.factors.length > 0 && selectedTest.id === 1 && (
              <table className="value-table">
                <thead>
                  <th>{selectedTest.valuefactor}</th>
                  <th>{selectedTest.valueexplain}</th>
                </thead>
                <tbody>
                  {selectedTest.factors.map((factor, index) => (
                    <tr key={index}>
                      <th>{factor.name}</th>
                      <td>{factor.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {selectedTest.factors && selectedTest.factors.length > 0 && selectedTest.id === 2 && (
              <table className="custom-value-table">
                <thead>
                  <tr>
                    <th>{selectedTest.valuefactor}</th>
                    <th>{selectedTest.valueexplain}</th>
                    <th>{selectedTest.valuefactor}</th>
                    <th>{selectedTest.valueexplain}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTest.factors.map((factor, index) => {
                    if (index % 2 === 0) {
                      const nextFactor = selectedTest.factors[index + 1] || {}; // 짝수 기준으로 다음 요인을 가져옴
                      return (
                        <React.Fragment key={index}>
                          {/* 첫 번째 줄: 작성요인과 첫 번째 하위검사 */}
                          <tr>
                            {/* 왼쪽 컬럼 */}
                            <th rowSpan={2}>{factor.name}</th>
                            <td>{factor.description}</td>
                            {/* 오른쪽 컬럼 */}
                            <th rowSpan={2}>{nextFactor.name || "-"}</th>
                            <td>{nextFactor.description || "-"}</td>
                          </tr>
                          {/* 두 번째 줄: 두 번째 하위검사 */}
                          <tr>
                            <td>{factor.description2 || "-"}</td>
                            <td>{nextFactor.description2 || "-"}</td>
                          </tr>
                        </React.Fragment>
                      );
                    }
                    return null; // 홀수 index는 처리하지 않음 (짝수 index에서 이미 처리)
                  })}
                </tbody>
              </table>
            )}

            {/* id가 3인 경우에만 차트 표시 */}
            {selectedTest.id === 3 && renderChart(selectedTest.measure)}

            <div className="popup-buttons">
              <button className="popup-cancel" onClick={closePopup}>
                닫기
              </button>
              <button
                className="popup-start"
                onClick={() => {
                  // id에 따라 페이지 라우팅
                  if (selectedTest.id === 1) {
                    navigate("/job-aptitude-test");
                  } else if (selectedTest.id === 2) {
                    navigate("/job-aptitude-test");
                  } else if (selectedTest.id === 3) {
                    navigate("/job-aptitude-test");
                  } else {
                    alert("추가 예정 검사입니다.");
                  }
                }}
              >
                검사 실시</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
