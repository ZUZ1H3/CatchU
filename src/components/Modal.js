// src/components/EditModal.js
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
                onClick={(e) => e.stopPropagation()} // 클릭 전파 방지
            >
                <h2>정보 수정</h2>

                <label>
                    D-Day:
                    <input
                        type="text"
                        name="dDay"
                        value={formData.dDay}
                        onChange={handleChange}
                        class="modal-input"
                    />
                </label>

                <label>
                    이름:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        class="modal-input"
                    />
                </label>

                <label>
                    이메일:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        class="modal-input"
                        placeholder="이메일 입력"
                    />
                </label>

                <label>
                    학과:
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        class="modal-input"
                    />
                </label>

                <label>
                    태그 (쉼표로 구분):
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        class="modal-input"
                    />
                </label>

                {/* 사진 */}
                <label>
                    사진 URL:
                    <input
                        type="text"
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                        class="modal-input"
                    />
                </label>

                <div className="modal-actions">
                    <button onClick={handleSave}>저장</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
