// src/components/Track.js
import React, { useRef, useEffect } from 'react';

const Track = ({ width = 800, height = 600 }) => {
    // useRef를 사용하여 canvas DOM 요소에 접근합니다.
    const canvasRef = useRef(null);

    useEffect(() => {
        // canvas와 context를 가져옵니다.
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 캔버스를 초기화합니다.
        ctx.clearRect(0, 0, width, height);

        // --- 트랙 그리기 로직 시작 ---

        // 1. 바깥쪽 트랙 그리기 (검은색 테두리)
        ctx.beginPath();
        ctx.rect(50, 50, width - 100, height - 100);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.closePath();

        // 2. 안쪽 트랙 그리기 (회색 도로)
        ctx.beginPath();
        ctx.rect(70, 70, width - 140, height - 140);
        ctx.fillStyle = '#cccccc'; // 회색
        ctx.fill();
        ctx.closePath();

        // 3. 시작점/결승선 그리기 (흰색-검은색 체크무늬)
        const startLineY = 50 + (height - 100) * 0.9;
        const startLineHeight = 30;
        const tileSize = 10;
        const numTiles = Math.floor((width - 100) / tileSize);

        for (let i = 0; i < numTiles; i++) {
            for (let j = 0; j < 3; j++) {
                if ((i + j) % 2 === 0) {
                    ctx.fillStyle = 'black';
                } else {
                    ctx.fillStyle = 'white';
                }
                ctx.fillRect(50 + i * tileSize, startLineY + j * tileSize, tileSize, tileSize);
            }
        }
        
        // --- 트랙 그리기 로직 끝 ---
        
        // 여기에 자동차를 그리는 로직을 추가할 수도 있지만,
        // Game.js에서 Car 컴포넌트로 분리하는 것이 더 좋습니다.

    }, [width, height]); // width나 height가 변경될 때마다 다시 그립니다.

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ border: '1px solid black', margin: '20px auto', display: 'block' }}
        />
    );
};

export default Track;