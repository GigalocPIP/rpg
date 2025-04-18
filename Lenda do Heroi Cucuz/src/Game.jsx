
import React, { useEffect, useRef, useState } from "react";

const Game = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bg = new Image();
    bg.src = "game/fundo.png";

    const hero = new Image();
    hero.src = "game/hero.png";

    const monster = new Image();
    monster.src = "game/monster.png";

    const heroAttack = new Audio("game/sfx/hero-attack.wav");
    const monsterHit = new Audio("game/sfx/monster-hit.wav");
    const bgMusic = new Audio("game/sfx/bg-music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.2;

    const heroData = { x: 50, y: 200, width: 48, height: 48, hp: 100, speed: 3 };
    const monsterData = { x: 400, y: 200, width: 48, height: 48, hp: 120, dir: -1 };

    let keys = {};

    const draw = () => {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(hero, heroData.x, heroData.y, heroData.width, heroData.height);
      ctx.drawImage(monster, monsterData.x, monsterData.y, monsterData.width, monsterData.height);

      // HP bars
      ctx.fillStyle = "red";
      ctx.fillRect(20, 20, heroData.hp, 10);
      ctx.fillStyle = "green";
      ctx.fillRect(canvas.width - 140, 20, monsterData.hp, 10);
    };

    const update = () => {
      if (keys["ArrowRight"]) heroData.x += heroData.speed;
      if (keys["ArrowLeft"]) heroData.x -= heroData.speed;
      if (keys[" "]) {
        heroAttack.play();
        if (Math.abs(heroData.x - monsterData.x) < 50) {
          monsterData.hp -= 10;
          monsterHit.play();
        }
      }

      // Monster patrol
      monsterData.x += monsterData.dir * 1;
      if (monsterData.x <= 300 || monsterData.x >= 500) monsterData.dir *= -1;

      // Monster counterattack
      if (Math.abs(heroData.x - monsterData.x) < 50 && monsterData.hp < 120) {
        heroData.hp -= 5;
      }

      if (heroData.hp <= 0) {
        setGameOver(true);
        setTimeout(() => window.location.reload(), 3000);
      }

      if (monsterData.hp <= 0) {
        setVictory(true);
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
      update();
      if (!gameOver && !victory) {
        requestAnimationFrame(loop);
      } else {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(victory ? "Você venceu!" : "Game Over", canvas.width / 2 - 60, canvas.height / 2);
        if (victory) {
          setTimeout(() => window.location.reload(), 4000);
        }
      }
    };

    hero.onload = () => {
      bgMusic.play();
      loop();
    };

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });
  }, []);

  return <canvas ref={canvasRef} width={640} height={360} />;
};

export default Game;
