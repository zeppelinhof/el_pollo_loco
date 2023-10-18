/**
 * All html templates for dynamic insertion
 */
function fillGameScreen() {
    return /*html*/`        
    <div class="canvas_keyboard" id="canvas_keyboard">    
        
        <!-- <div id="sceensize-button"class="sceensize-button fullscreen-button"  onclick="screensize()"></div> -->
        <div id="explainDuringGame" class="explainDuringGame hide-mobile"><div class="edgSingle">[←] run left</div><div class="edgSingle">[→] run right</div><div class="edgSingle">[D] throw</div><div class="edgSingle">[SPACE] jump</div></div>

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
            <div class="nivelCompletadoText hide-mobile">Nivel completado</div>    
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
        <div class="game-button padding-12-mobile" onclick="openDialog(${getHighscore(1)}, ${getHighscore(2)}, 'dialog');">         <!--getPointsoverview-->
            Puntos
        </div>
        <!-- parameter of initGame represents level -->
        <div onclick="initGame('1'); runEventlisteners();" class="game-button black-background padding-12-mobile">
        Empezar Nivel 1
        </div>
        
        <div id="secondLevelButton"></div>

        <div class="game-button padding-12-mobile" onclick="openDialog('', '', 'dialogExplicacion');">         <!--getPointsoverview-->
            Explicación de los botones
        </div>
        
    </div>

    <div id="dialog" class="dialog-bg d-none" onclick="hideElement('dialog');">
        <div class="dialog">
            <h1>Puntuación más alta</h1>
            <div class="lineInPoints">
                <div>Level 1:</div>
                <p id="dialog-message-level-1">No hay</p>
            </div>
            <div class="lineInPoints">
                <div>Level 2:</div>
                <p id="dialog-message-level-2">No hay</p>
            </div>
        </div>
    </div>

    <div id="dialogExplicacion" class="dialog-bg d-none" onclick="hideElement('dialogExplicacion');">
        <div class="dialogExplicacion">
            <div class="keysExplanation">
                <div class="arrowsExpl">
                    <div class="keyAndExplaination">
                        <div>hacia atrás</div>
                        <img src="img/Explain_arrowLeft.png" class="key-explaination-button">                    
                    </div>
                    <div class="keyAndExplaination">
                        <img src="img/Explain_arrowRight.png" class="key-explaination-button">
                        <div>adelante</div>                    
                    </div>
                </div>
                <div class="keyAndExplaination">
                    <img src="img/Explain_Space.png" class="key-explaination-button width-longer" style="position: relative">
                    <div style="position: absolute">saltar</div>
                </div>
                <div class="keyAndExplaination">
                    <img src="img/Explain_Fire.png" class="key-explaination-button">
                    <div>botella de fuego</div>
                </div>
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

function fillSecondLevelButton(){
    return /*html*/`
    <div onclick="initGame('2'); runEventlisteners();" class="game-button black-background padding-12-mobile">
        Empezar Nivel 2
    </div>
    `   
}