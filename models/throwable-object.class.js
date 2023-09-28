class ThrowableObject extends MovableObject {

    speedY = 30;
    speedX = 20;

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
        setInterval(() => {
            this.x += 5;
        }, 25);
    }
}