import React, { useState } from "react";
import "../style/Calendar.css";

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const today = new Date();

    // 현재 주의 시작 및 끝 계산
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

    return (
        <div className="custom-calendar">
            <div className="calendar-header">
                <h4>
                    {`${startOfWeek.getMonth() + 1}.${startOfWeek.getDate()}`}
                </h4>
            </div>
            <div className="calendar-grid">
                {weekDates.map((date) => (
                    <div key={date.toDateString()}
                        className={`calendar-day ${selectedDate === date.toDateString() ? "selected" : ""}
                        ${date.toDateString() === today.toDateString() ? "today" : ""}`}
                        onClick={() => handleDateClick(date)}>
                        <span className={`day-label ${date.getDay() === 0 ? "sunday" : ""} 
                        ${date.getDay() === 6 ? "saturday" : ""}`}>
                            {["일", "월", "화", "수", "목", "금", "토"][ date.getDay()]}
                        </span>
                        <span className="day-number">{date.getDate()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCalendar;
