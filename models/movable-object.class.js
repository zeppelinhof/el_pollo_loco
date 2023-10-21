class MovableObject extends DrawableObject {


    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    applyGravity() {
        setGeneralInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Thorwable objects should always fall
            return true;
        } else {
            return this.y < 130;
        }

    }

    /**
     * check if this object is touching another object taking the offset into account
     * 
     * @param {object} mo - movable object
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * 
     * @param {object} mo 
     * @returns - returns true if Pepe is coming from above (attacking enemy by jumping or throwing bottle)
     */
    isCollidingFromTop(mo){
        return this.isColliding(mo) && 
        (Math.abs((this.y + this.height - this.offset.bottom) - (mo.y + mo.offset.top)) <= 70);
    }


    /**
     * 
     * @param {number} amountOfDamage - value that subtracts the amount of damage from the available energy
     */
    hit(amountOfDamage) {
        this.energy -= amountOfDamage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // diff in ms
        timepassed = timepassed / 1000; // diff in s
        return timepassed < 0.3;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        // Body Movement Animation
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    fallDownwards() {
        setGeneralInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }
}