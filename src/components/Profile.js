import React, { useState } from "react";
import Modal from "./Modal";

import "../style/Profile.css";
const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [profileData, setProfileData] = useState({
        dDay: "D-15",
        name: "김신입",
        email: "zuzihe@hansung.ac.kr",
        department: "컴퓨터공학과",
        tags: "프론트엔드, 웹, AI",
        photo: "/profile_image.png",
    });
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveProfileData = (newData) => {
        setProfileData(newData);
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
                <img src="/profile_image.png" alt="프로필" className="profile-image" />
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

            <img src="/profile_background.png" alt="배경 이미지" className="profile-background"/>

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
