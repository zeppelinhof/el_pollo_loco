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

function setGeneralInterval(fn, time) {
    let id = setInterval(fn, time);
    generalIntervalIds.push(id);
}

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
    // bottleSplashIds.forEach(clearInterval);
}