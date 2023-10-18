/**
 * insert point for each level in overview
 */
function getPointsoverview(){
    document.getElementById('gameScreen').innerHTML = fillPointsOverview();
}

/**
 * if current points are greater then highscore of this level set current points as highscore
 * 
 * @param {number} points - points of current game 
 * @param {number} level - current level (1 or 2)
 */
function setPoints(points, level) {
    let pointsString = JSON.stringify(points);
    localStorage.setItem(`pointsPolloLoco_level${level}`, pointsString);
    if ((points > getHighscore(level))) {
        setTempHighscore(points, level);
    }
}

/**
 * 
 * @param {number} levelNumber 
 * @returns - get most reached points for current level (on this local storage)
 */
function getHighscore(levelNumber){
    let highscore = localStorage.getItem(`highscore${levelNumber}`);
    return currentHighscore = JSON.parse(highscore);
}
function setHighscore(points, level){
    let newHighscore = JSON.stringify(points);
    localStorage.setItem(`highscore${level}`, newHighscore);
}

/**
 * 
 * @param {number} levelNumber 
 * @returns - get temp highscore
 */
function getTempHighscore(levelNumber){
    let tempHighscore = localStorage.getItem(`tempHighscore${levelNumber}`);
    return currentTempHighscore = JSON.parse(tempHighscore);
}
function setTempHighscore(points, level){
    let newTempHighscore = JSON.stringify(points);
    localStorage.setItem(`tempHighscore${level}`, newTempHighscore);
}

/**
 * 
 * @param {string} text1 - highscore of level 1
 * @param {string} text2 - highscore of level 2
 * @param {string} obj - dialog window of highscore overview or game explaination
 */
function openDialog(text1, text2, obj){
    showElement(obj)
    document.getElementById('dialog-message-level-1').innerHTML = text1;
    document.getElementById('dialog-message-level-2').innerHTML = text2;
}