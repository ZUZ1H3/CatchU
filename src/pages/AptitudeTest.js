// AptitudeTest.js
import React from 'react';
import '../style/AptitudeTest.css';

const AptitudeTest = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">적성검사</h1>
          <div className="description-box">
            <p className="description">
              - 검사별 ‘안내’ 버튼을 클릭해서 내용을 확인하신 후 자신에게 적합한 검사를 받아보시길 바랍니다.
            <br></br>
              - 검사는 CATCHU를 통해 즉시 실시 가능하며, 검사결과는 검사 직후 ‘검사결과 보기’를 통해 확인해 보실 수 있습니다.
            </p>
          </div>
      </div>

      <div className="assessment-options">
        <div className="assessment-row">
          <div className="assessment-item">
            가치
            <h3 className="assessment-title">직업가치관검사</h3>
            <p className="assessment-description">
            직업선택 시 중요하게 생각하는 자신의 직업가치관이 무엇인지 확인하고 그에 적합한 직업분야에 대해 알아볼 수 있습니다.
            </p>
            대학생
            성인
            검사 안내
            <button className="assessment-button">검사 실시</button>
          </div>
          <div className="assessment-item">
            <h3 className="assessment-title">직업적성검사</h3>
            <p className="assessment-description">
              자신에게 맞는 직업 분야를 찾을 수 있는 검사입니다.
            </p>
            <button className="assessment-button">검사 실시</button>
          </div>
        </div>

        <div className="assessment-row">
          <div className="assessment-item">
            <h3 className="assessment-title">학습유형검사</h3>
            <p className="assessment-description">
              자신의 학습 스타일을 파악할 수 있는 검사입니다.
            </p>
            <button className="assessment-button">검사 실시</button>
          </div>
          <div className="assessment-item">
            <h3 className="assessment-title">대인관계검사</h3>
            <p className="assessment-description">
              대인관계 스타일을 파악하고 향상시킬 수 있는 검사입니다.
            </p>
            <button className="assessment-button">검사 실시</button>
          </div>
        </div>

        <div className="assessment-row">
          <div className="assessment-item">
            <h3 className="assessment-title">가치관검사</h3>
            <p className="assessment-description">
              자신의 가치관과 신념을 확인할 수 있는 검사입니다.
            </p>
            <button className="assessment-button">검사 실시</button>
          </div>
          <div className="assessment-item">
            <h3 className="assessment-title">감정지능검사</h3>
            <p className="assessment-description">
              자신의 감정 조절 능력을 파악할 수 있는 검사입니다.
            </p>
            <button className="assessment-button">검사 실시</button>
          </div>
        </div>

        <div className="assessment-row">
          <div className="assessment-item">
            <h3 className="assessment-title">리더십검사</h3>
            <p className="assessment-description">
              자신의 리더십 역량을 파악할 수 있는 검사입니다.
            </p>
            <button className="assessment-button">검사 실시</button>
          </div>

          <div className="assessment-item">
            <h3 className="assessment-title">스트레스검사</h3>
            <p className="assessment-description">
              자신의 스트레스 수준을 파악할 수 있는 검사입니다.
            </p>
            <button className="assessment-button">검사 실시</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
