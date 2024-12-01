import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/TestList.css";
import testResultsData from "../data/TestResultsData";

const TestList = () => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.type === "aptitude") {
      navigate("/result-job-aptitude-test", { state: { results: item.data } });
    } else if (item.type === "value") {
      navigate("/result-job-value-test", { state: { results: item.data } });
    } else if (item.type === "preparation") {
      navigate("/result-job-preparation-test", { state: { results: item.data } });
    }
  };

  return (
    <div className="list-container">
      <h2 className="list-title">검사 내역</h2>
      <ul className="list">
        {testResultsData.map((item, index) => (
          <li
            key={index}
            className="list-item"
            onClick={() => handleItemClick(item)}
          >
            <span className="item-title">{item.title}</span>
            <span className="item-date">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;
