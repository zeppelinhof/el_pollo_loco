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

    constructor(x, y, otherDirection) {
        super();
        // Ausgangslage der Flasche für vorwärtswerfen
        if (!otherDirection) {
            this.x = x;
            // Ausgangslage der Flasche für rückwärtswerfen
        } else {
            this.x = x - 50;
        }
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(otherDirection);

    }

    throw(otherDirection) {
        this.speedY = 30;
        this.applyGravity();
        setGeneralInterval(() => {
            if (otherDirection == false) {
                this.x += 5; // vorwärts werfen
            } else {
                this.x -= 5;    // rückwärts werfen
            }

        }, 25);
    }
}