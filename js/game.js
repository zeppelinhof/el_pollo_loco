let canvas;
let world;
let keyboard = new Keyboard();
let screenMaximised = false;

function initStartscreen() {
    document.getElementById('gameScreen').innerHTML = button_Points_StartGame();
}

function initGame() {
    hideElement('gameTitle');
    document.getElementById('gameScreen').innerHTML = /*html*/`        
        <div class="canvas_keyboard" id="canvas_keyboard">    
            
            <!-- <div id="sceensize-button"class="sceensize-button fullscreen-button"  onclick="screensize()"></div> -->

            <canvas id="canvas" width="720px" height="480px">

            </canvas>

            <div class="mobileKeyboard" id="mobileKeyboard">
                <div id="buttonLeft" class="buttonLeft"></div>

                <div id="buttonJump" class="mobileJump"></div>

                <div id="buttonThrowBottle" class="mobileThrowBottle"></div>                
                
                <div id="buttonRight" class="buttonRight"></div>
            </div>
        </div>

        <div class="gameoverScreen" id="gameoverScreen">
            <div class="puntosPanel" >
                <div class=puntosText>Puntos alcanzados:</div>
                <div id="puntosValueGameover"></div>
            </div>                
        </div>

        <div class="levelFinishedScreen" id="levelFinishedScreen">
            <div class="puntosPanel flex-column">
                <div class="nivelCompletadoText">Nivel completado</div>    
                <div class="puntosPanel2">                        
                    <div class=puntosText>Puntos alcanzados:</div>
                    <div id="puntosValueLevelfinished"></div>
                </div>                    
            </div>                            
        </div>        
    `

    hideElement('gameoverScreen');
    hideElement('levelFinishedScreen');
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}

function button_Points_StartGame() {
    return /*html*/`
    <div class="button-panel">
        <div class="game-button" onclick="openDialog(${getHighscore()});">         <!--getPointsoverview-->
            Puntos
        </div>

        <div onclick="initGame(); runEventlisteners();" class="game-button black-background">
        Empezar Juego
        </div>
    </div>

    <div id="dialog" class="dialog-bg d-none" onclick="hideElement('dialog');">
        <div class="dialog">
            <h1>Puntuación más alta</h1>
            <div class="lineInPoints">
                <div>Level 1:</div>
                <p id="dialog-message">No hay</p>
            </div>
        </div>
    </div>
    `
}

function showGameover() {
    stopGame();
    hideElement('canvas');
    hideElement('levelFinishedScreen');
    showScreen('gameoverScreen');
    hideElement('mobileKeyboard');
}

function showLevelFinished() {
    stopSounds();
    stopGame();
    hideElement('canvas');
    hideElement('gameoverScreen');
    if (getTempHighscore() > getHighscore()) {
        setHighscore(getTempHighscore());
    }
    showScreen('levelFinishedScreen');
}

function addButtons(element) {
    document.getElementById(element).innerHTML += buttonsContent();
}
function buttonsContent() {
    return /*html*/`
        <div id="button-panel-Gameover_Finished" class="d-none">
            ${button_Points_StartGame()}
        </div>
    `
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
        // sceensizeButton.classList.remove('not-fullscreen-button');
        exitFullscreen();
    }
}

function playSound(objsound){
    objsound.play();  
}

function stopSounds(){
    world.character.walking_sound.pause();
}