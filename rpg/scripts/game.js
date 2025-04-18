
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const hero = {
    x: 50,
    y: 260,
    frame: 0,
    image: new Image(),
    frameWidth: 32,
    frameHeight: 32,
    totalFrames: 4
};

hero.image.src = 'assets/hero_sprite.png';

let lastFrameTime = 0;
const frameDelay = 150;

function update(timestamp) {
    if (timestamp - lastFrameTime > frameDelay) {
        hero.frame = (hero.frame + 1) % hero.totalFrames;
        lastFrameTime = timestamp;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        hero.image,
        hero.frame * hero.frameWidth, 0,
        hero.frameWidth, hero.frameHeight,
        hero.x, hero.y,
        hero.frameWidth * 2, hero.frameHeight * 2
    );
}

function loop(timestamp) {
    update(timestamp);
    draw();
    requestAnimationFrame(loop);
}

hero.image.onload = () => {
    requestAnimationFrame(loop);
};
