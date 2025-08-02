// src/utils/neuralNetworkService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // FastAPI 서버 주소

export const getAIAction = async (carState) => {
    try {
        const response = await axios.post(`${API_URL}/predict_action`, carState);
        // 서버로부터 받은 AI의 다음 행동(예: 0, 1, 2)
        const action = response.data.action;
        return action;
    } catch (error) {
        console.error('AI 행동 예측 실패:', error);
        return null;
    }
};

// 사용 예시
// const aiCarState = {
//   x: 100,
//   y: 200,
//   speed: 10,
//   angle: 45,
//   distance_to_wall: [50, 60, 70]
// };
//
// const action = await getAIAction(aiCarState);
// if (action !== null) {
//   // AI 자동차를 action에 따라 움직이는 로직
// }