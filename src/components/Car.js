// src/components/Car.js
import React from 'react';

const carStyle = {
    position: 'absolute',
    width: '30px',
    height: '20px',
    backgroundColor: 'red',
    borderRadius: '5px',
    transition: 'transform 0.05s linear' // 부드러운 회전을 위한 CSS 트랜지션
};

const Car = ({ id, x, y, color, angle }) => {
    // 라디안 각도를 CSS 회전 각도(deg)로 변환
    const rotation = angle * (180 / Math.PI) + 90; // +90은 자동차의 초기 방향을 위로 맞추기 위함입니다.
    return (
        <div 
            style={{
                ...carStyle,
                left: x - 15, // 자동차의 중앙을 x, y 좌표에 맞춥니다.
                top: y - 10,
                backgroundColor: color,
                transform: `rotate(${rotation}deg)` 
            }}
        >
        </div>
    );
};

export default Car;