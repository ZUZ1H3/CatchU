// src/components/Modal.js
import React, { useState } from "react";
import "../style/Modal.css"
const Modal = ({ isOpen, onClose, initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData); // 수정된 데이터를 부모로 전달
        onClose(); // 창 닫기
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}>
                <h2>정보 수정</h2>

                <label className="modal-label">
                    <span>기업:</span>
                    <input
                        type="text"
                        name="headerText"
                        value={formData.headerText}
                        onChange={handleChange}
                        className="modal-input"
                    />
                </label>

                <label className="modal-label">
                    <span>D-Day:</span>
                    <input
                        type="text"
                        name="dDay"
                        value={formData.dDay}
                        onChange={handleChange}
                        className="modal-input"
                    />
                </label>

                <label className="modal-label">
                    <span>이름:</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="modal-input"
                    />
                </label>

                <label className="modal-label">
                    <span>이메일:</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="modal-input"
                        placeholder="이메일 입력"
                    />
                </label>

                <label className="modal-label">
                    <span>학과:</span>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="modal-input"
                    />
                </label>

                <label className="modal-label">
                    <span>태그:</span>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="modal-input"
                    />
                </label>

                <label className="modal-label">
                    <span>사진 URL:</span>
                    <input
                        type="text"
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                        className="modal-input"
                    />
                </label>


                <div className="modal-actions">
                    <button onClick={handleSave} className="modal-button">저장</button>
                    <button onClick={onClose} className="modal-button">취소</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
