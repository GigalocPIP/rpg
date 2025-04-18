
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const heroSprite = new Image();
heroSprite.src = "assets/hero.png";

const monsterSprite = new Image();
monsterSprite.src = "assets/monster.png";

let hero = { x: 100, y: 400, width: 48, height: 48, frame: 0, health: 100 };
let monster = { x: 700, y: 400, width: 64, height: 64, frame: 0, dir: 1, health: 120 };

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
    if (keys["ArrowRight"]) hero.x += 4;
    if (keys["ArrowLeft"]) hero.x -= 4;

    // Monstro andando de um lado para o outro
    monster.x += monster.dir * 2;
    if (monster.x < 600 || monster.x > 800) monster.dir *= -1;

    // Ataque do herói
    if (keys[" "] && Math.abs(hero.x - monster.x) < 60) {
        monster.health -= 5;
    }

    // Monstro ataca se for atacado
    if (monster.health < 120 && Math.abs(hero.x - monster.x) < 60) {
        hero.health -= 2;
    }

    if (hero.health <= 0) {
        alert("Sir Cuzcuz foi derrotado! Reiniciando...");
        hero.health = 100;
        monster.health = 120;
        hero.x = 100;
    }
}

function drawSprite(image, frame, x, y, width, height) {
    ctx.drawImage(image, frame * width, 0, width, height, x, y, width, height);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite(heroSprite, Math.floor(hero.frame), hero.x, hero.y, hero.width, hero.height);
    drawSprite(monsterSprite, Math.floor(monster.frame), monster.x, monster.y, monster.width, monster.height);
    ctx.fillStyle = "white";
    ctx.fillText("Vida do Herói: " + hero.health, 20, 20);
    ctx.fillText("Vida do Monstro: " + monster.health, 20, 40);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
