// src/pages/Introduction.js
import React, { useEffect, useRef, useState } from "react";
import '../style/Introduction.css';

const Introduction = () => {
  const photoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // 10% 보이면 트리거
    );

    if (photoRef.current) {
      observer.observe(photoRef.current);
    }

    return () => {
      if (photoRef.current) {
        observer.unobserve(photoRef.current);
      }
    };
  }, []);

  return (
    <div className="scroll-container">
      <div
        className={`photo ${isVisible ? "visible" : ""}`}
        ref={photoRef}
      >
        <img src="/introduction.png" alt="Photo" />
      </div>
    </div>
  );
};

export default Introduction;
