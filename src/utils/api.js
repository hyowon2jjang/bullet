// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI 서버 주소

export const getAIAction = async (carState) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ai/predict`, carState);
        return response.data.action;
    } catch (error) {
        console.error("Failed to fetch AI action:", error);
        return null;
    }
};