class World {

    character = new Character();
    level = level1;
    canvas;  //xy
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLive = new StatusBarLive();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = [];
    collectableObjects = [];
    collectedBottlesCount = 0;
    collectedCoinsCount = 0;

    runDraw = true;

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
        setGeneralInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionsWithEnemy();
            this.checkCollisionsWithCollectableObject();
        }, 50);
    }

    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromTop(enemy)) {
                this.jumpOnEnemy(enemy, true);
            }
            else if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.statusBarLive.setPercentage(this.character.energy);
            }
        });
    }

    jumpOnEnemy(enemyHit, realJump) {  // Pepe jumps on Enemy
        let enemyObj = level1.enemies;
        if (realJump) {
            this.character.speedY = 10;
        }
        if (this.typeOfObjectIs('Chicken', enemyObj, enemyHit)) {
            this.level.enemies.push(new ChickenDead(enemyHit.x));
            enemyObj.splice(enemyObj.indexOf(enemyHit), 1);
        }

        if (this.typeOfObjectIs('Chick', enemyObj, enemyHit)) {
            this.level.enemies.push(new ChickDead(enemyHit.x));
            enemyObj.splice(enemyObj.indexOf(enemyHit), 1);
        }

        else if (this.typeOfObjectIs('Endboss', enemyObj, enemyHit)) {
            enemyHit.hit(30);
            // enemyObj.splice(enemyObj.indexOf(enemyHit), 1);
        }

    }

    checkCollisionsWithCollectableObject() {  // Pepe collects Coin or Bottle
        let colObj = level1.collectableObjects;
        this.level.collectableObjects.forEach((co) => {
            if (this.character.isColliding(co)) {
                if (this.typeOfObjectIs('BottleCollectable', colObj, co)) {
                    this.collectedBottlesCount++;
                    this.statusBarBottles.setPercentage(this.collectedBottlesCount);
                    colObj.splice(colObj.indexOf(co), 1);
                }
                else if (this.typeOfObjectIs('Coin', colObj, co)) {
                    this.collectedCoinsCount++;
                    document.getElementById('puntosValueGameover').innerHTML = this.collectedCoinsCount;
                    document.getElementById('puntosValueLevelfinished').innerHTML = this.collectedCoinsCount;
                    setPoints(this.collectedCoinsCount, 1);
                    this.statusBarCoins.setPercentage(this.collectedCoinsCount);
                    colObj.splice(colObj.indexOf(co), 1);
                }

            }
        });
    }

    typeOfObjectIs(objName, obj, o) {
        try {
            return obj[obj.indexOf(o)].constructor.name == objName;
        }
        catch {
            console.log("kein constructor.name");
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.collectedBottlesCount > 0) {
                let bottle = new Bottle(this.character.x + 50, this.character.y + 100, world, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.collectedBottlesCount--;
                this.statusBarBottles.setPercentage(this.collectedBottlesCount);
            }
        }
    }

    draw() {
        // diese Funktion nur für Zeichnen auf Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addToMap(this.statusBarLive);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0); // forwards

        if (this.runDraw) {
            this.addToMap(this.character);
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