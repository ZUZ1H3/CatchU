import React, { useState } from "react";
import "../style/Calendar.css";

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [memos, setMemos] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function getStartOfWeek(date) {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());
        start.setHours(0, 0, 0, 0);
        return start;
    }

    const getWeekDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(currentWeekStart.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const weekDates = getWeekDates();

    const goToPreviousWeek = () => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(currentWeekStart.getDate() - 7);
        setCurrentWeekStart(newStart);
    };

    const goToNextWeek = () => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(currentWeekStart.getDate() + 7);
        setCurrentWeekStart(newStart);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date.toDateString());
    };

    const handleAddMemo = (memoText) => {
        if (!memoText.trim()) return;
        setMemos((prevMemos) => ({
            ...prevMemos,
            [selectedDate]: [...(prevMemos[selectedDate] || []), memoText],
        }));
    };

    return (
        <div className="custom-calendar">
            <div className="calendar-header">
                <button className="nav-button" onClick={goToPreviousWeek}>&lt;</button>
                <h4>
                    {`${today.getMonth() + 1}.${today.getDate()}`}
                </h4>
                <button className="nav-button" onClick={goToNextWeek}>&gt;</button>
                <button
                    className="expand-button"
                    onClick={() => setIsModalOpen(true)}>
                    더보기
                </button>
            </div>

            <div className="calendar-grid">
                {weekDates.map((date) => {
                    const isSunday = date.getDay() === 0;
                    const isSaturday = date.getDay() === 6;
                    const isToday = date.toDateString() === today.toDateString();
                    const isSelected = selectedDate === date.toDateString();

                    return (
                        <div
                            key={date.toDateString()}
                            className={`calendar-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                            onClick={() => handleDateClick(date)}>
                            <span className={`day-label ${isSunday ? "sunday" : isSaturday ? "saturday" : ""}`}>
                                {["일", "월", "화", "수", "목", "금", "토"][date.getDay()]}
                            </span>
                            <span className={`day-number ${isSunday ? "sunday" : isSaturday ? "saturday" : ""}`}>
                            {date.getDate()}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="memo-section">
                <ul className="memo-list">
                    {(memos[selectedDate] || []).map((memo, index) => (
                        <li key={index} className="memo-item">
                            <span className="dot"></span>
                            {memo}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 모달 창 */}
            {isModalOpen && (
                <div className="modal" onClick={() => setIsModalOpen(false)}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
                    >
                        <h4>메모 작성 - {new Date(selectedDate).toLocaleDateString('ko-KR', {
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                        })}</h4>
                        <div className="modal-memo-input">
                            <input
                                type="text"
                                placeholder="메모를 입력하고 Enter를 누르면 저장됩니다."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddMemo(e.target.value);
                                        e.target.value = ""; // 입력 필드 초기화
                                    }
                                }}
                            />
                        </div>
                        <button
                            className="close-button"
                            onClick={() => setIsModalOpen(false)}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCalendar;
