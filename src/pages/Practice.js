import React, { useState, useEffect } from 'react';
import '../style/Practice.css';
import { categories } from '../questions.js';
import { useNavigate } from 'react-router-dom';

const Practice = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('select');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedQuestionsList, setSelectedQuestionsList] = useState([]); // 선택된 질문 목록
  const [customQuestion, setCustomQuestion] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedType, setSelectedType] = useState(null); // 선택된 면접 유형

  // 페이지가 처음 로드될 때 '-' 뒤의 부분만 필터링하도록 처리
  useEffect(() => {
    if (mode === 'select') {
      setFilteredCategories(filterCategoriesByDash(categories)); // 'select' 모드일 때 '-' 뒤의 부분만 필터링
    } else {
      setFilteredCategories(categories); // 다른 모드일 때는 모든 카테고리 표시
    }
  }, [mode]);

  const filterCategoriesByDash = (categories) => {
    return categories.filter((cat) => {
      const catName = cat.name;
      if (catName.includes('-')) {
        const filterPart = catName.split('-')[1];
        return filterPart ? true : false;
      }
      return true;
    }).map((cat) => {
      const catName = cat.name;
      if (catName.includes('-')) {
        const filterPart = catName.split('-')[1];
        return { ...cat, name: filterPart };
      }
      return cat;
    });
  };

  const handleImageSelect = (type) => {
    if (selectedType === type) {
      setFilteredCategories(filterCategoriesByDash(categories));
      setSelectedType(null);
    } else {
      setSelectedType(type);
      let filteredCategories = [];

      if (type === '인성면접') {
        filteredCategories = categories
          .filter((cat) => cat.name.startsWith('인성-'))
          .map((cat) => ({
            ...cat,
            name: cat.name.replace('인성-', ''),
          }));
      } else if (type === '직무면접') {
        filteredCategories = categories
          .filter((cat) => cat.name.startsWith('직무-'))
          .map((cat) => ({
            ...cat,
            name: cat.name.replace('직무-', ''),
          }));
      } else if (type === '역량면접') {
        filteredCategories = categories
          .filter((cat) => cat.name.startsWith('역량-'))
          .map((cat) => ({
            ...cat,
            name: cat.name.replace('역량-', ''),
          }));
      } else if (type === '전공면접') {
        filteredCategories = categories.filter((cat) =>
          cat.name.endsWith('학과')
        );
      } else {
        filteredCategories = categories;
      }

      setSelectedCategory(null);
      setSelectedQuestions([]);
      setFilteredCategories(filteredCategories);
    }
  };

  const handleCategorySelect = (categoryName) => {
    const category = filteredCategories.find((cat) => cat.name === categoryName);
    setSelectedCategory(categoryName);
    setSelectedQuestions(category ? category.questions : []);
  };

  const handleQuestionSelect = (question) => {
    if (selectedQuestionsList.includes(question)) {
      setSelectedQuestionsList(selectedQuestionsList.filter((q) => q !== question));
    } else if (selectedQuestionsList.length < 3) {
      setSelectedQuestionsList([...selectedQuestionsList, question]);
    } else {
      alert('최대 3개의 질문만 선택할 수 있습니다.');
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'select') {
      setFilteredCategories(filterCategoriesByDash(categories));
    } else {
      setFilteredCategories(categories);
    }
  };

  const handleConfirm = () => {
    if (mode === 'select' && selectedQuestionsList.length === 0) {
      alert('최소 하나의 질문을 선택해주세요.');
      return;
    }
    if (mode === 'create' && (!customQuestion || customQuestion.trim() === '')) {
      alert('사용자 질문을 입력해주세요.');
      return;
    }
    const questionToPass =
      mode === 'create' ? customQuestion : selectedQuestionsList.join(', ');
    navigate('/practicing', { state: { question: questionToPass } });
  };

  return (
    <div className="practice-container">
      <div className="heading">1. 면접 유형을 선택해주세요.</div>
      <div className="image-container">
        <img
          src="/tenacity.png"
          alt="인성면접"
          className={`image ${selectedType === '인성면접' ? 'selected' : ''}`}
          onClick={() => handleImageSelect('인성면접')}
        />
        <img
          src="/job.png"
          alt="직무면접"
          className={`image ${selectedType === '직무면접' ? 'selected' : ''}`}
          onClick={() => handleImageSelect('직무면접')}
        />
        <img
          src="/competency.png"
          alt="역량면접"
          className={`image ${selectedType === '역량면접' ? 'selected' : ''}`}
          onClick={() => handleImageSelect('역량면접')}
        />
        <img
          src="/major.png"
          alt="전공면접"
          className={`image ${selectedType === '전공면접' ? 'selected' : ''}`}
          onClick={() => handleImageSelect('전공면접')}
        />
      </div>
      <div className="heading">2. 문항 선택 방법을 고르세요.</div>
      <div className="table-container">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <div
                  className={`mode-option ${mode === 'select' ? 'selected' : ''}`}
                  onClick={() => handleModeChange('select')}
                >
                  면접문항 직접 선택
                </div>
                <div
                  className={`mode-option ${mode === 'create' ? 'selected' : ''}`}
                  onClick={() => {
                    handleModeChange('create');
                    setSelectedQuestions([]);
                  }}
                >
                  면접문항 만들어서 선택
                </div>
              </td>
              <td style={{ border: mode === 'create' ? 'none' : '1px solid #d2d2d2' }}>
                {mode === 'select' && (
                  <div className="questions-list">
                    {filteredCategories.map((category, index) => (
                      <div
                        key={index}
                        className={`category-name ${
                          selectedCategory === category.name ? 'selected' : ''
                        }`}
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
                {mode === 'create' && (
                  <textarea
                    className="input-area"
                    placeholder="면접 문항을 입력하세요."
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                  />
                )}
              </td>
              <td style={{ border: mode === 'create' ? 'none' : '1px solid #d2d2d2' }}>
                {mode === 'select' && selectedQuestions.length > 0 && (
                  <div className="questions-list">
                    {selectedQuestions.map((question, idx) => (
                      <div
                        key={idx}
                        className={`category-name ${
                          selectedQuestionsList.includes(question) ? 'selected' : ''
                        }`}
                        onClick={() => handleQuestionSelect(question)}
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {selectedQuestionsList.length > 0}
      <button id="check-button" onClick={handleConfirm}>
        확인
      </button>
    </div>
  );
};

export default Practice;
