let canvas;
let world;
let keyboard = new Keyboard();
let generalIntervalIds = [];
let bottleSplashIds = [];
let enbossAnimation = [];
let enbossHurtedAnimation = [];
let endbossExploding = [];
let endbossAttack = [];

function setGeneralInterval(fn, time){
    let id = setInterval(fn, time);
    generalIntervalIds.push(id);
}

function setSpecialInterval(fn, time, intervalId){
    let id = setInterval(fn, time);
    if (intervalId == 'bottleSplash') {
        bottleSplashIds.push(id);
    }  
    else if(intervalId == 'enbossAnimation') {
        enbossAnimation.push(id);
    } 

    else if (intervalId == 'enbossHurtedAnimation'){
        enbossHurtedAnimation.push(id);
    }
    else if (intervalId == 'endbossExploding'){
        endbossExploding.push(id);
    }
    else if (intervalId == 'endbossAttack'){
        endbossAttack.push(id);
    }
}

function stopSpecialInterval(intervalId){
    if (intervalId == 'bottleSplash') {
        bottleSplashIds.forEach(clearInterval);
    } else if (intervalId == 'enbossAnimation'){
        enbossAnimation.forEach(clearInterval);
    } else if (intervalId == 'enbossHurtedAnimation'){
        enbossHurtedAnimation.forEach(clearInterval);
    } else if (intervalId == 'endbossExploding'){
        endbossExploding.forEach(clearInterval);
    } else if (intervalId == 'endbossAttack'){
        endbossAttack.forEach(clearInterval);
    }
}

function stopGame(){
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