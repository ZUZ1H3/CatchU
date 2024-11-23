import React, { useState } from "react";
import "../style/Profile.css";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [dDay, setDDay] = useState("D-15"); // D-Day 상태 관리

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // D-Day 변경
    const handleDDayChange = (event) => {
        setDDay(event.target.value); 
    };

    return (
        <div className="profile-container">
            <button className="edit-button" onClick={openModal}>
                수정
            </button>

            <div className="profile-header">‘배달의 민족’ 면접일 까지</div>

            <div className="d-day-box">
                {[...dDay].map((char, index) => (
                    <div key={index} className="d-day-char">
                        {char}
                    </div>
                ))}
            </div>

            <div className="profile-image-container">
                <img src="/profile_image.png" alt="프로필" className="profile-image" />
            </div>

            <h2 className="profile-name">김신입</h2>
            <div className="profile-info">
                <p className="icon">📧zuzihe@hansung.ac.kr
                </p>
                <p className="icon">📂컴퓨터공학과
                </p>
            </div>

            <div className="profile-tags">
                <span className="tag">프론트엔드</span>
                <span className="tag">웹</span>
                <span className="tag">AI</span>
            </div>

            <img
                src="/profile_background.png"
                alt="배경 이미지"
                className="profile-background"
            />

            {/* 모달 창 */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // 클릭 전파 방지
                    >
                        <h3>D-Day 수정</h3>
                        <input
                            type="text"
                            value={dDay}
                            onChange={handleDDayChange}
                            maxLength={10} // 최대 길이 제한
                            className="modal-input"
                        />
                        <button className="modal-save-button" onClick={closeModal}>
                            저장
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
