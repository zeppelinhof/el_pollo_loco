//#region Eventlistener
function runEventlisteners() {

    addEventListenerToButtons();

    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 39) {
            right(true);
        }
        if (e.keyCode == 37) {
            left(true);
        }
        if (e.keyCode == 38) {
            up(true);
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = true;
            resetTimer();
        }
        if (e.keyCode == 32) {
            jump(true);
        }

        if (e.keyCode == 68) {
            throwBottle(true);
        }

    });

    window.addEventListener("keyup", (e) => {

        resetTimer();

        keyTimerIdle = setTimeout(() => {
            keyboard.longidle = false;
            keyboard.idle = true;
        }, 100);

        keyTimerLongidle = setTimeout(() => {
            keyboard.idle = false;
            keyboard.longidle = true;
        }, 7000);


        if (e.keyCode == 39) {
            right(false);
        }
        if (e.keyCode == 37) {
            left(false);
        }
        if (e.keyCode == 38) {
            up(false);
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = false;
        }

        if (e.keyCode == 32) {
            jump(false);
        }

        if (e.keyCode == 68) {
            throwBottle(false);
        }
    });
}

function addEventListenerToButtons() {

    let buttonRight = document.getElementById('buttonRight');
    buttonRight.addEventListener("touchstart", onTouchStartRight);
    buttonRight.addEventListener("touchend", onTouchEndRight);

    let buttonLeft = document.getElementById('buttonLeft');
    buttonLeft.addEventListener("touchstart", onTouchStartLeft);
    buttonLeft.addEventListener("touchend", onTouchEndLeft);

    let buttonJump = document.getElementById('buttonJump');
    buttonJump.addEventListener("touchstart", onTouchStartJump);
    buttonJump.addEventListener("touchend", onTouchEndJump);
    

    let buttonThrowBottle = document.getElementById('buttonThrowBottle');
    buttonThrowBottle.addEventListener("touchstart", onTouchStartThrowBottle);
    buttonThrowBottle.addEventListener("touchend", onTouchEndThrowBottle);
}

function onTouchStartRight() {
    right(true);
}

function onTouchEndRight() {
    right(false);
}

function onTouchStartLeft() {
    left(true);
}

function onTouchEndLeft() {
    left(false);
}

function onTouchStartJump() {
    jump(true);
}

function onTouchEndJump() {
    jump(false);
}

function onTouchStartThrowBottle() {
    throwBottle(true);
}

function onTouchEndThrowBottle() {
    throwBottle(false);
}

function right(bool) {
    keyboard.RIGHT = bool;
    if(bool){
        resetTimer();
    }
}

function left(bool) {
    keyboard.LEFT = bool;
    if(bool){
        resetTimer();
    }
}

function jump(bool) {
    keyboard.SPACE = bool;
    if(bool){
        resetTimer();
    }
}

function throwBottle(bool) {
    keyboard.D = bool;
    if(bool){
        resetTimer();
    }
}

function resetTimer() {
    clearTimeout(this.keyTimerIdle);
    clearTimeout(this.keyTimerLongidle);
    keyboard.idle = false;
    keyboard.longidle = false;
}