// src/components/Track.js
import React, { useRef, useEffect } from 'react';

const Track = ({ width = 800, height = 600 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        // 배경색
        ctx.fillStyle = '#4CAF50'; // 풀밭
        ctx.fillRect(0, 0, width, height);
        
        // 트랙 그리기
        ctx.beginPath();
        // 트랙의 외부 선
        ctx.moveTo(100, 100);
        ctx.lineTo(700, 100);
        ctx.arc(700, 300, 200, -Math.PI / 2, Math.PI / 2, false);
        ctx.lineTo(700, 500);
        ctx.lineTo(100, 500);
        ctx.arc(100, 300, 200, Math.PI / 2, -Math.PI / 2, false);
        ctx.closePath();
        ctx.fillStyle = '#616161'; // 회색 트랙
        ctx.fill();

        // 트랙의 내부 선
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(600, 200);
        ctx.arc(600, 300, 100, -Math.PI / 2, Math.PI / 2, false);
        ctx.lineTo(600, 400);
        ctx.lineTo(200, 400);
        ctx.arc(200, 300, 100, Math.PI / 2, -Math.PI / 2, false);
        ctx.closePath();
        ctx.fillStyle = '#424242'; // 내부 회색
        ctx.fill();

        // 중앙선 그리기
        ctx.beginPath();
        ctx.moveTo(350, 100);
        ctx.lineTo(350, 200);
        ctx.moveTo(450, 100);
        ctx.lineTo(450, 200);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 시작/결승선
        ctx.beginPath();
        ctx.moveTo(200, 500);
        ctx.lineTo(200, 400);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 10;
        ctx.stroke();
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ position: 'absolute', top: 0, left: 0 }}
        />
    );
};

export default Track;