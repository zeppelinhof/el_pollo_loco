function getPointsoverview(){
    document.getElementById('gameScreen').innerHTML = /*html*/`
        <div class="pointsOverview">
            <div>Highscore:</div>
            <div id="highscore"></div>
        </div>
    `
}

function setPoints(points, level) {
    let pointsString = JSON.stringify(points);
    localStorage.setItem(`pointsPolloLoco_level${level}`, pointsString);
    if ((points > getHighscore())) {
        setTempHighscore(points);
    }
}

function getHighscore(){
    let highscore = localStorage.getItem('highscore');
    return currentHighscore = JSON.parse(highscore);
}
function setHighscore(points){
    let newHighscore = JSON.stringify(points);
    localStorage.setItem('highscore', newHighscore);
}

function getTempHighscore(){
    let tempHighscore = localStorage.getItem('tempHighscore');
    return currentTempHighscore = JSON.parse(tempHighscore);
}
function setTempHighscore(points){
    let newTempHighscore = JSON.stringify(points);
    localStorage.setItem('tempHighscore', newTempHighscore);
}

function openDialog(text){
    showElement('dialog')
    document.getElementById('dialog-message').innerHTML = text;
}