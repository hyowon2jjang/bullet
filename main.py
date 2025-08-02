# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

# FastAPI 앱 생성
app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://super-space-lamp-557wj7rwxrp3p65x-5500.app.github.dev" # codespace 주소 추가
]

# CORS(Cross-Origin Resource Sharing) 설정
# 리액트 개발 서버(http://localhost:3000)에서 API에 접근할 수 있도록 허용합니다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 클라이언트로부터 받을 데이터의 형식을 정의합니다.
class CarState(BaseModel):
    # 자동차의 상태에 대한 더 많은 정보를 추가할 수 있습니다.
    x: float
    y: float
    speed: float

# 루트 경로("/")에 대한 기본 엔드포인트
@app.get("/")
def read_root():
    return {"message": "AI Car API is running!"}

# AI의 다음 행동을 예측하는 엔드포인트
# 이 함수는 자동차의 상태를 입력으로 받아, 'left', 'right', 'forward' 중 하나의 행동을 반환합니다.
@app.post("/ai/predict")
def predict_ai_action(car_state: CarState):
    # --- 이 부분을 실제 AI 모델 예측 로직으로 교체해야 합니다. ---
    # 예시: 임의의 행동을 반환
    actions = ["forward", "left", "right"]
    predicted_action = random.choice(actions)

    print(f"Received state from client: {car_state}")
    print(f"Predicted action: {predicted_action}")
    
    # 예측된 행동을 JSON 형식으로 반환
    return {"action": predicted_action}