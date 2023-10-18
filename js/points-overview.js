function getPointsoverview(){
    document.getElementById('gameScreen').innerHTML = fillPointsOverview();
}

function setPoints(points, level) {
    let pointsString = JSON.stringify(points);
    localStorage.setItem(`pointsPolloLoco_level${level}`, pointsString);
    if ((points > getHighscore(level))) {
        setTempHighscore(points, level);
    }
}

function getHighscore(levelNumber){
    let highscore = localStorage.getItem(`highscore${levelNumber}`);
    return currentHighscore = JSON.parse(highscore);
}
function setHighscore(points, level){
    let newHighscore = JSON.stringify(points);
    localStorage.setItem(`highscore${level}`, newHighscore);
}

function getTempHighscore(levelNumber){
    let tempHighscore = localStorage.getItem(`tempHighscore${levelNumber}`);
    return currentTempHighscore = JSON.parse(tempHighscore);
}
function setTempHighscore(points, level){
    let newTempHighscore = JSON.stringify(points);
    localStorage.setItem(`tempHighscore${level}`, newTempHighscore);
}

function openDialog(text1, text2, obj){
    showElement(obj)
    document.getElementById('dialog-message-level-1').innerHTML = text1;
    document.getElementById('dialog-message-level-2').innerHTML = text2;
}