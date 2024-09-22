// src/components/Game.js
import React, { useRef, useEffect, useState } from "react";
import Player from "./Player";
import Bullet from "./Bullet";

const Game = () => {
  const canvasRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeSurvived, setTimeSurvived] = useState(0);
  const player = useRef(new Player(250, 250, 3));
  const bullets = useRef([]);
  const keys = useRef({});

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = 500;
    canvasRef.current.height = 500;

    const spawnBulletBasic = () => {
      const direction1 = Math.random() * 2 * Math.PI;
      const bullet = {
        x: Math.cos(direction1) * 300 + 250,
        y: Math.sin(direction1) * 300 + 250,
        direction: direction1,
      };
      bullets.current.push(new Bullet(bullet.x, bullet.y, bullet.direction, 2, "black", 13));
    };

    const spawnBulletWave1 = () => {
      const direction2 = Math.floor(Math.random() * 4)
      if (direction2 == 1) {
        for (let i = 0; i < 6; i++) {
          bullets.current.push(new Bullet(i * 100, 500, direction2 * Math.PI / 2, 3, "black", 8));
        }
      } else if (direction2 == 2) {
        for (let i = 0; i < 6; i++) {
          bullets.current.push(new Bullet(0, i * 100, direction2 * Math.PI / 2, 3, "black", 8));
        }
      } else if (direction2 == 3) {
        for (let i = 0; i < 6; i++) {
          bullets.current.push(new Bullet(i * 100, 0, direction2 * Math.PI / 2, 3, "black", 8));
        }
      } else if (direction2 == 0) {
        for (let i = 0; i < 6; i++) {
          bullets.current.push(new Bullet(500, i * 100, direction2 * Math.PI / 2, 3, "black", 8));
        }
      }
    };

    const spawnBulletTrack = () => {
      const TrackAngle = Math.random() * 2 * Math.PI;
      const xpos = Math.cos(TrackAngle) * 300 + 250;
      const ypos = Math.sin(TrackAngle) * 300 + 250;
      const TrackDirection = Math.atan2((ypos - player.current.y), (xpos - player.current.x))

      bullets.current.push(new Bullet(xpos, ypos, TrackDirection, 3, "black", 5));
    };


    const updateGame = () => {
      if (isGameOver) return;

      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      player.current.move(keys.current);
      player.current.draw(context);

      const newBullets = [];

      bullets.current.forEach((bullet) => {
        bullet.move();
        if (!bullet.isInFrame()) {
          newBullets.push(bullet);
        }
        bullet.draw(context);
      });

      bullets.current = newBullets;

      if (player.current.checkCollision(bullets.current)) {
        setIsGameOver(true);
        return;
      }

      requestAnimationFrame(updateGame);
    };

    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const bulletSpawner1 = setInterval(
      spawnBulletBasic,
      5000 - 600 * Math.log(timeSurvived * 1000 + 100)
    );

    const bulletSpawner2 = setInterval(spawnBulletWave1, 3000);
    const bulletSpawner3 = setInterval(spawnBulletTrack, 2000)

    const timer = setInterval(() => {
      if (!isGameOver) setTimeSurvived((prev) => parseFloat(prev + 0.01, 2));
      setTimeSurvived((prev) => Math.round(prev * 100) / 100);
    }, 10);

    updateGame();

    return () => {
      clearInterval(bulletSpawner1);
      clearInterval(bulletSpawner2);
      clearInterval(bulletSpawner3)
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver]);

  const handleRestart = () => {
    setIsGameOver(false);
    bullets.current = [];
    player.current = new Player(250, 250, 5);
    setTimeSurvived(0);
  };

  return (
    <div>
      <div>{timeSurvived}</div>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
      {isGameOver && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            textAlign: "center",
            borderRadius: "10px",
          }}
        >
          <h1>Game Over</h1>
          <p>You survived for {timeSurvived} seconds.</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Game;
