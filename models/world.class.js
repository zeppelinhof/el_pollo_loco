class World {

    character = new Character();
    level = level1;
    canvas;  //xy
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLive = new StatusBarLive();
    throwableObjects = [];
    collectableObjects = [];
    collectedBottlesCount = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //xy
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; // this= aktuelle Instanz der Welt
    }

    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkThrowObjects();
            this.checkCollisionsWithCollectableObject();
        }, 100);
    }

    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLive.setPercentage(this.character.energy);

            }
        });
    }

    checkCollisionsWithCollectableObject() {  // Pepe collects Coin or Bottle
        let colObj = level1.collectableObjects;
        this.level.collectableObjects.forEach((co) => {
            if (this.character.isColliding(co)) {                
                if (colObj[colObj.indexOf(co)].constructor.name == 'BottleCollectable') {
                    this.collectedBottlesCount++;
                }
                colObj.splice(colObj.indexOf(co), 1);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.collectedBottlesCount > 0) {
                let bottle = new Bottle(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.collectedBottlesCount--;
            }

        }
    }

    draw() {
        // diese Funktion nur für Zeichnen auf Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); // back
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addToMap(this.statusBarLive);
        this.ctx.translate(this.camera_x, 0); // forwards


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.collectableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // draw wird so oft aufgerufen, wie es die Grafikkarte hergibt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}