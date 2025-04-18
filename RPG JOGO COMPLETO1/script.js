const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 180;
let speed = 5;

function drawHero() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, 40, 40);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  clearCanvas();
  drawHero();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    x += speed;
  } else if (event.key === "ArrowLeft") {
    x -= speed;
  }
});

gameLoop();
