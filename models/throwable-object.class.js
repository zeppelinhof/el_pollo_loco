class ThrowableObject extends MovableObject {

    speedY = 30;
    speedX = 20;
    enemyStillOnScreen = true;

    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    }

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();

    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setGeneralInterval(() => {
            this.x += 5;
        }, 25);
    }
}