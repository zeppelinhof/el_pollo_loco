let canvas;
let world;
let keyboard = new Keyboard();
let generalIntervalIds = [];
let activeEndboss = [];
let idleEndboss = [];
let chickenMoveLeft = [];
let chickenDead = [];
let chickenWalk = [];
let bottleSplashIds = [];
let bottleSplash = [];
let alert = [];
let enbossHurtedAnimation = [];
let endbossExploding = [];
let endbossAttack = [];

function setGeneralInterval(fn, time) {
    let id = setInterval(fn, time);
    generalIntervalIds.push(id);
}

function setSpecialInterval(fn, time, interval) {
    let id = setInterval(fn, time);
    interval.push(id);
}

function stopSpecialInterval(interval) {
    interval.forEach(clearInterval);
}

function stopGame() {
    generalIntervalIds.forEach(clearInterval);
    bottleSplashIds.forEach(clearInterval);
}

function initGame() {
    document.getElementById('gameScreen').innerHTML = /*html*/`
        <canvas id="canvas" width="720px" height="480px">

        </canvas>
    `
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}

function initStartscreen() {
    document.getElementById('gameScreen').innerHTML = /*html*/`
        <div class="button-panel">
            <div class="game-button">
                Points
            </div>

            <div onclick="initGame();" class="game-button black-background">
                Start Game
            </div>
        </div>
    `
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

});