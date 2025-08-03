// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Car from './Car';
import Track from './Track';
import { getAIAction } from '../utils/api';

// 게임 설정값
const trackWidth = 800;
const trackHeight = 600;
const MAX_SPEED = 5;
const ACCELERATION = 0.5;
const ROTATION_SPEED = 0.05; // 라디안 단위 회전 속도

const Game = () => {
    // 자동차 상태에 angle(각도) 속성 추가
    const [userCar, setUserCar] = useState({ x: 100, y: 500, speed: 0, angle: -Math.PI / 2, color: 'blue' });
    const [aiCar, setAiCar] = useState({ x: 150, y: 500, speed: 0, angle: -Math.PI / 2, color: 'green' });
    const [keyPress, setKeyPress] = useState({});

    useEffect(() => {
        const handleKeyDown = (e) => setKeyPress(prev => ({ ...prev, [e.key]: true }));
        const handleKeyUp = (e) => setKeyPress(prev => ({ ...prev, [e.key]: false }));

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // 게임 루프
    useEffect(() => {
        const gameLoop = setInterval(async () => {
            // 유저 자동차 업데이트
            setUserCar(prev => {
                let newSpeed = prev.speed;
                let newAngle = prev.angle;

                // 속도 조절
                if (keyPress.ArrowUp) {
                    newSpeed = Math.min(prev.speed + ACCELERATION, MAX_SPEED);
                } else if (keyPress.ArrowDown) {
                    newSpeed = Math.max(prev.speed - ACCELERATION, 0);
                } else {
                    newSpeed *= 0.95; // 자연스러운 감속
                }

                // 방향 조절 (속도가 있어야 회전 가능)
                if (newSpeed > 0.5) {
                    if (keyPress.ArrowLeft) newAngle -= ROTATION_SPEED;
                    if (keyPress.ArrowRight) newAngle += ROTATION_SPEED;
                }

                const newX = prev.x + newSpeed * Math.cos(newAngle);
                const newY = prev.y + newSpeed * Math.sin(newAngle);

                return { ...prev, x: newX, y: newY, speed: newSpeed, angle: newAngle };
            });

            // AI 자동차 업데이트
            const aiState = { x: aiCar.x, y: aiCar.y, speed: aiCar.speed, angle: aiCar.angle };
            const action = await getAIAction(aiState);

            setAiCar(prev => {
                let newSpeed = prev.speed;
                let newAngle = prev.angle;

                if (action === "forward") {
                    newSpeed = Math.min(prev.speed + ACCELERATION, MAX_SPEED);
                } else if (action === "backward") { // 'backward' 행동 추가
                    newSpeed = Math.max(prev.speed - ACCELERATION, 0);
                } else {
                    newSpeed *= 0.95; // 자연스러운 감속
                }

                if (newSpeed > 0.5) {
                    if (action === "left") newAngle -= ROTATION_SPEED;
                    if (action === "right") newAngle += ROTATION_SPEED;
                }

                const newX = prev.x + newSpeed * Math.cos(newAngle);
                const newY = prev.y + newSpeed * Math.sin(newAngle);
                
                return { ...prev, x: newX, y: newY, speed: newSpeed, angle: newAngle };
            });
        }, 1000 / 60); // 60 FPS (1초에 60번)으로 게임 루프를 실행
        
        return () => clearInterval(gameLoop);
    }, [userCar, aiCar, keyPress]); // 모든 상태 변경 시 게임 루프 재시작

    return (
        <div style={{ position: 'relative', width: trackWidth, height: trackHeight, margin: '0 auto' }}>
            <h1>AI vs Player Racing</h1>
            <Track width={trackWidth} height={trackHeight} />
            <Car id="user-car" x={userCar.x} y={userCar.y} color={userCar.color} angle={userCar.angle} />
            <Car id="ai-car" x={aiCar.x} y={aiCar.y} color={aiCar.color} angle={aiCar.angle} />
        </div>
    );
};

export default Game;