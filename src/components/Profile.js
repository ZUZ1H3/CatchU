import React, { useState } from "react";
import Modal from "./Modal";
import "../style/Profile.css";

const Profile = ({ profileData, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveProfileData = (newData) => {
        if (onUpdate) {
          onUpdate(newData); // App.js의 상태를 업데이트
        }
        setIsModalOpen(false);
      };

    return (
        <div className="profile-container">
            <button className="edit-button" onClick={openModal}>
                수정
            </button>

            <div className="profile-header">'배달의 민족' 면접일까지</div>

            <div className="d-day-box">
                {[...profileData.dDay].map((char, index) => (
                    <div key={index} className="d-day-char">
                        {char}
                    </div>
                ))}
            </div>

            <div className="profile-image-container">
                <img src={profileData.photo} alt="프로필" className="profile-image" />
            </div>

            <h2 className="profile-name">{profileData.name}</h2>
            <div className="profile-info">
                <p className="icon">📧 {profileData.email}</p>
                <p className="icon">📂 {profileData.department}</p>
            </div>

            <div className="profile-tags">
                {profileData.tags.split(",").map((tag, index) => (
                    <span key={index} className="tag">
                        {tag.trim()}
                    </span>
                ))}
            </div>

            <img src="/profile_background.png" alt="배경 이미지" className="profile-background" />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                initialData={profileData}
                onSave={saveProfileData}
            />
        </div>
    );
};

export default Profile;
