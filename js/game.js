let canvas;
let world;
let keyboard = new Keyboard();
let screenMaximised = false;
let soundON;
let level_end_x = 2200;
let screenwidth = 720;
let countBackgroundObjects = Math.round(level_end_x / screenwidth) + 2;


function initStartscreen() {
    document.getElementById('gameScreen').innerHTML = fillButton_Points_StartGame();
    checkSecondLevelButton();
}

function initGame(levelNumber) {
    hideElement('gameTitle');
    soundON = true;
    document.getElementById('gameScreen').innerHTML = fillGameScreen();

    hideElement('gameoverScreen');
    hideElement('levelFinishedScreen');
    canvas = document.getElementById('canvas');
    initLevel(screenwidth, levelNumber);
    world = new World(canvas, keyboard, levelNumber);
}

function showGameover() {
    stopGame();
    hideElement('canvas');
    hideElement('levelFinishedScreen');
    hideElement('switch-sound');
    showScreen('gameoverScreen');
    hideElement('mobileKeyboard');
}

function showLevelFinished() {
    stopAllSounds();
    stopGame();
    hideElement('canvas');
    hideElement('gameoverScreen');
    hideElement('switch-sound');
    if (getTempHighscore() > getHighscore()) {
        setHighscore(getTempHighscore());
    }
    showScreen('levelFinishedScreen');
    enableSecondLevel();
    checkSecondLevelButton();
}

function addButtons(element) {
    document.getElementById(element).innerHTML += fillButtonsContent();
    checkSecondLevelButton();
}

function showScreen(screen) {
    showElement(screen);
    addButtons(screen);
    showElement('button-panel-Gameover_Finished');
}

function hideElement(element) {
    let classlist = document.getElementById(element).classList;
    if (!classlist.contains('d-none')) {
        classlist.add('d-none');
    }
}

function showElement(element) {
    let classlist = document.getElementById(element).classList;
    if (classlist.contains('d-none')) {
        classlist.remove('d-none');
    }
}

function enterFullscreen(element) {
    screenMaximised = true;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    screenMaximised = false;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function screensize() {
    let sceensizeButton = document.getElementById('sceensize-button');
    let screenToChangeSize = document.getElementById('canvas_keyboard');
    if (!screenMaximised) {
        sceensizeButton.classList.remove('fullscreen-button');
        // sceensizeButton.classList.add('not-fullscreen-button');
        enterFullscreen(screenToChangeSize);
    } else {
        sceensizeButton.classList.add('fullscreen.button');
        exitFullscreen();
    }
}

// #region Sounds

function playSound(objsound) {
    if (soundON) {
        objsound.play();
    }
}

function stopSound(objsound) {
    objsound.pause();
}

function stopAllSounds() {
    stopSound(world.character.walking_sound);
}

// if sound is on (sound button for off visible) and button is clicked then switch sound off and show button for switch on
function switchSound() {
    if (soundON) {
        changeSoundButton(false, true)

    } else {
        changeSoundButton(true, false)
    }
}

function changeSoundButton(on, off) {
    switchClass('switch-sound', 'img-sound-on', on);
    switchClass('switch-sound', 'img-sound-off', off);
    soundON = on;
}

// #endregion Sounds

/**
 * Add or remove a class to a div
 * 
 * @param {string} obj - id of container to add or change a class
 * @param {string} cls - class to add or remove
 * @param {boolean} add - decision whether add or remove class
 */
function switchClass(obj, cls, add) {
    if (add) {
        document.getElementById(obj).classList.add(cls);
    } else {
        document.getElementById(obj).classList.remove(cls);
    }
}

function enableSecondLevel() {

    let secondLevellEnabled = JSON.stringify(1);
    localStorage.setItem('secondLevellEnabled', secondLevellEnabled);
}

function secondLevelEnabled(){
    let secondLevellEnabled = localStorage.getItem('secondLevellEnabled');
    let sle = JSON.parse(secondLevellEnabled);
    return sle == 1;
}

function checkSecondLevelButton() {
    document.getElementById('secondLevelButton').innerHTML = '';
    if (secondLevelEnabled()) {
        document.getElementById('secondLevelButton').innerHTML += /*html*/`
            <div onclick="initGame('2'); runEventlisteners();" class="game-button black-background">
                Empezar Nivel 2
            </div>
            `   
    }
}