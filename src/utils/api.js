// src/utils/api.js

import axios from 'axios';

// FastAPI 서버의 기본 주소.
// Codespaces 환경에 맞게 <your-codespace-url> 부분을 실제 주소로 변경하세요.
const API_BASE_URL = 'http://localhost:8000'; 
// 또는 Codespaces에서 FastAPI 서버가 실행되는 포트 URL을 사용
// const API_BASE_URL = 'https://<your-codespace-fastapi-url>';

export const getAIAction = async (carState) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ai/predict`, carState);
        // 서버 응답에서 'action' 필드를 반환
        return response.data.action;
    } catch (error) {
        console.error("AI 행동 예측 실패:", error);
        return null;
    }
};