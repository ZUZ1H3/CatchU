// src/pages/Introduction.js
import React, { useEffect, useRef, useState } from "react";
import '../style/Introduction.css';

const Introduction = () => {
  const imagesRef = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    // visible 배열 초기화
    setVisible(Array(imagesRef.current.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = imagesRef.current.indexOf(entry.target); // 대상 요소의 인덱스를 찾음
          if (entry.isIntersecting && index !== -1) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.1 } // 10% 보이면 트리거
    );

    imagesRef.current.forEach((image) => {
      if (image) observer.observe(image);
    });

    return () => {
      imagesRef.current.forEach((image) => {
        if (image) observer.unobserve(image);
      });
    };
  }, []);

  const images = [
    "/introduction1.png",
    "/introduction2.png",
    "/introduction3.png",
    "/introduction4.png",
    "/introduction5.png", 
  ];

  return (
    <div className="scroll-container">
      {images.map((src, index) => (
        <div
          key={index}
          className={`fade-in ${visible[index] ? "visible" : ""}`}
          ref={(el) => (imagesRef.current[index] = el)}
        >
          <img src={src} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Introduction;
