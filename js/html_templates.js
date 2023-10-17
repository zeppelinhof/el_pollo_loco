function fillGameScreen() {
    return /*html*/`        
    <div class="canvas_keyboard" id="canvas_keyboard">    
        
        <!-- <div id="sceensize-button"class="sceensize-button fullscreen-button"  onclick="screensize()"></div> -->

        <canvas id="canvas" width="720px" height="480px">

        </canvas>

        <div class="mobileKeyboard" id="mobileKeyboard">
            <div id="buttonLeft" class="buttonLeft"></div>

            <div id="buttonRight" class="buttonRight"></div> 

            <div id="buttonThrowBottle" class="mobileThrowBottle"></div>  

            <div id="buttonJump" class="mobileJump"></div>
                                                                     
        </div>
        
        <div id="switch-sound" class="switch-sound img-sound-on" onclick="switchSound()"></div>
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
}

function fillButton_Points_StartGame() {    
    return /*html*/`
    <div class="button-panel" id="button-panel">
        <div class="game-button" onclick="openDialog(${getHighscore()});">         <!--getPointsoverview-->
            Puntos
        </div>
        <!-- parameter of initGame represents level -->
        <div onclick="initGame('1'); runEventlisteners();" class="game-button black-background">
        Empezar Nivel 1
        </div>
        
        <div id="secondLevelButton"></div>
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

function fillButtonsContent() {
    return /*html*/`
        <div id="button-panel-Gameover_Finished" class="d-none">
            ${fillButton_Points_StartGame()}
        </div>
    `
}

function fillPointsOverview() {
    return /*html*/`
    <div class="pointsOverview">
        <div>Highscore:</div>
        <div id="highscore"></div>
    </div>
    `
}