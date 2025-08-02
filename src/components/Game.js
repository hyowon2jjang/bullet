// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Car from './Car';
import Track from './Track';
import { getAIAction } from '../utils/api';

const Game = () => {
    // Canvas의 크기를 Track 컴포넌트와 동일하게 설정합니다.
    const trackWidth = 800;
    const trackHeight = 600;

    const [userCar, setUserCar] = useState({ x: 100, y: 500, speed: 0, color: 'blue' });
    const [aiCar, setAiCar] = useState({ x: 150, y: 500, speed: 0, color: 'green' });

    // ... (이전과 동일한 게임 루프 로직) ...

    return (
        <div style={{ position: 'relative', width: trackWidth, margin: '0 auto' }}>
            <h1>AI vs Player Racing</h1>
            <Track width={trackWidth} height={trackHeight} />
            {/* Car 컴포넌트의 좌표는 Canvas 좌표에 맞춰집니다. */}
            <Car id="user-car" x={userCar.x} y={userCar.y} color={userCar.color} />
            <Car id="ai-car" x={aiCar.x} y={aiCar.y} color={aiCar.color} />
        </div>
    );
};

export default Game;