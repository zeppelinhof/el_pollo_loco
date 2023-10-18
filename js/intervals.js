let generalIntervalIds = [];
let activeEndboss = [];
let idleEndboss = [];
let chickenMoveLeft = [];
let chickenDead = [];
let chick = [];
let chickDead = [];
let chickenWalk = [];
let bottleSplashIds = [];
let bottleSplash = [];
let alert = [];
let enbossHurtedAnimation = [];
let endbossExploding = [];
let endbossAttack = [];

/**
 * 
 * @param {Function} fn - what to do after each time (see below) 
 * @param {number} time - after which time run interval 
 */
function setGeneralInterval(fn, time) {
    let id = setInterval(fn, time);
    generalIntervalIds.push(id);
}

/**
 * 
 * @param {Function} fn 
 * @param {*} time 
 * @param {Array} interval - array to get interval id
 */
function setSpecialInterval(fn, time, interval) {
    let id = setInterval(fn, time);
    interval.push(id);
    generalIntervalIds.push(id);
}

function stopSpecialInterval(interval) {
    interval.forEach(clearInterval);
}

function stopGame() {
    generalIntervalIds.forEach(clearInterval);
}