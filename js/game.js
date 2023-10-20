let canvas;
let world;
let keyboard = new Keyboard();
let screenMaximised = false;
let soundON;
let background_sound = new Audio('audio/background_music.mp3');
let level_end_x = 2200;
let screenwidth = 720;
let countBackgroundObjects = Math.round(level_end_x / screenwidth) + 2;


function initStartscreen() {
    document.getElementById('gameScreen').innerHTML = fillButton_Points_StartGame();
    checkSecondLevelButton();
    hideElementAfterTime('gameTitle', 5000);
}

/**
 * start game after click on button "Empezar Nivel"
 * 
 * @param {string} levelNumber - variable to represent level  1 or 2
 */
function initGame(levelNumber) {
    hideElement('gameTitle');
    soundON = true;
    playSound(background_sound);
    document.getElementById('gameScreen').innerHTML = fillGameScreen();

    hideElement('gameoverScreen');
    hideElement('levelFinishedScreen');
    canvas = document.getElementById('canvas');
    initLevel(levelNumber);
    world = new World(canvas, keyboard, levelNumber);
}

/**
 * screen when lost game
 */
function showGameover() {
    stopAllSounds();
    stopGame();
    showOnlySignificantScreen('levelFinishedScreen');
    showScreen('gameoverScreen');
    hideElement('mobileKeyboard');
    switchClass('button-panel', 'button-panel', false);
    switchClass('button-panel', 'd-flex', true);
}

/**
 * screen when kill endboss
 * 
 * @param {string} levelNumber - variable to represent level  1 or 2
 */
function showLevelFinished(levelNumber) {
    stopAllSounds();
    stopGame();
    showOnlySignificantScreen('gameoverScreen');

    if (getTempHighscore(levelNumber) > getHighscore(levelNumber)) {
        setHighscore(getTempHighscore(levelNumber), levelNumber);
    }
    
    showScreen('levelFinishedScreen');
    enableSecondLevel();
    checkSecondLevelButton();
}

/**
 * 
 * @param {string} screenToHide - when game over then hide fnished screen and vice versa
 */
function showOnlySignificantScreen(screenToHide){
    hideElement('canvas');
    hideElement(screenToHide);
    hideElement('switch-sound');
    hideElement('explainDuringGame');
}

/**
 * Add buttons accordingly game situation
 * 
 * @param {element} element - where display butons
 */
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
    objsound.currentTime = 0;
}

function stopAllSounds() {
    stopSound(world.character.walking_sound);
    stopSound(background_sound);
}

// if sound is on (sound button for off visible) and button is clicked then switch sound off and show button for switch on
function switchSound() {
    if (soundON) {
        changeSoundButton(false, true);
        stopSound(background_sound);

    } else {
        changeSoundButton(true, false);
        playSound(background_sound);
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

/**
 * check in local storage whether the second level is enabled by winning level 1
 */
function secondLevelEnabled(){
    let secondLevellEnabled = localStorage.getItem('secondLevellEnabled');
    let sle = JSON.parse(secondLevellEnabled);
    return sle == 1;
}

function checkSecondLevelButton() {
    document.getElementById('secondLevelButton').innerHTML = '';
    if (secondLevelEnabled()) {
        document.getElementById('secondLevelButton').innerHTML += fillSecondLevelButton();
    }
}

function hideElementAfterTime(obj, time){
    setTimeout(()=>{
        hideElement(obj);
    }, time);
}