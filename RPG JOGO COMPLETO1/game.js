
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const heroImage = new Image();
heroImage.src = "assets/sprites/hero.png";

const stepSound = new Audio("assets/audio/step.wav");

let frame = 0;
let x = 100;
let y = 400;
let speed = 4;
let moving = false;

let keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function update() {
  moving = false;
  if (keys["ArrowRight"]) {
    x += speed;
    moving = true;
  }
  if (keys["ArrowLeft"]) {
    x -= speed;
    moving = true;
  }

  if (moving) {
    if (frame % 10 === 0) stepSound.play();
    frame++;
  } else {
    frame = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const spriteWidth = 48;
  const spriteHeight = 48;
  const currentFrame = Math.floor(frame / 6) % 4;
  ctx.drawImage(heroImage, currentFrame * spriteWidth, 0, spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

heroImage.onload = () => {
  gameLoop();
};
