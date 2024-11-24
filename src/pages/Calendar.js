import React, { useState } from "react";
import "../style/Calendar.css";

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [memos, setMemos] = useState({}); // 날짜별 메모를 저장하는 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태

    const today = new Date();

    // 현재 주의 시작 날짜 계산
    const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
    );

    // 주간 날짜 배열 생성
    const getWeekDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const weekDates = getWeekDates();

    // 날짜 클릭 핸들러
    const handleDateClick = (date) => {
        setSelectedDate(date.toDateString());
    };

    // 메모 추가 핸들러
    const handleAddMemo = (memoText) => {
        if (!memoText.trim()) return; // 빈 입력 방지
        setMemos((prevMemos) => ({
            ...prevMemos,
            [selectedDate]: [...(prevMemos[selectedDate] || []), memoText],
        }));
    };

    return (
        <div className="custom-calendar">
            {/* 캘린더 헤더 */}
            <div className="calendar-header">
                <h4>
                    {`${startOfWeek.getMonth() + 1}.${startOfWeek.getDate()}`}
                </h4>
                <button
                    className="expand-button"
                    onClick={() => setIsModalOpen(true)}>
                    더보기
                </button>
            </div>

            {/* 캘린더 본체 */}
            <div className="calendar-grid">
                {weekDates.map((date) => {
                    const isSunday = date.getDay() === 0; // 일요일 여부
                    const isSaturday = date.getDay() === 6; // 토요일 여부
                    const isToday = date.toDateString() === today.toDateString(); // 오늘 날짜 여부
                    const isSelected = selectedDate === date.toDateString(); // 선택된 날짜 여부

                    return (
                        <div
                            key={date.toDateString()}
                            className={`calendar-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                            onClick={() => handleDateClick(date)}>
                            {/* 요일 텍스트 */}
                            <span className={`day-label ${isSunday ? "sunday" : isSaturday ? "saturday" : ""}`}>
                                {["일", "월", "화", "수", "목", "금", "토"][date.getDay()]}
                            </span>

                            {/* 날짜 */}
                            <span className={`day-number ${isSunday ? "sunday" : isSaturday ? "saturday" : ""}`}>
                                {date.getDate()}
                            </span>
                        </div>
                    );
                })}
            </div>


            {/* 메모 섹션 */}
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
