class World {

    character = new Character();
    canvas;  //xy
    ctx;
    selectedLevel;
    keyboard;
    camera_x = 0;
    statusBarLive = new StatusBarLive();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = [];
    collectableObjects = [];
    collectedBottlesCount = 0;
    collectedCoinsCount = 0;

    coin_sound = new Audio('audio/collect_coin.mp3')
    squished_sound = new Audio('audio/squished.mp3')
    squished_small_sound = new Audio('audio/squished_small.mp3')
    bottle_sound = new Audio('audio/bottle.mp3')

    runDraw = true;
    previousBottleIsFlying = false;

    constructor(canvas, keyboard, levelNumber) {
        if (levelNumber == '1') {
            this.selectedLevel = level1;
        }
        if (levelNumber == '2') {
            this.selectedLevel = level2;
        }

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //xy
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run(levelNumber);
    }

    setWorld() {
        this.character.world = this; // this= aktuelle Instanz der Welt
    }

    /**
     * start interval to run Pepe. Check situation e.g. if there is a collision with an enemy
     * 
     * @param {string} levelNumber - represent if level 1 or 2
     */
    run(levelNumber) {
        setGeneralInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionsWithEnemy();
            this.checkCollisionsWithCollectableObject(levelNumber);
        }, 50);
    }

    checkCollisionsWithEnemy() {
        this.selectedLevel.enemies.forEach((enemy) => {
            if (this.character.isCollidingFromTop(enemy) && this.character.isFlyingDown()) {
                this.jumpOnEnemy(enemy, true);
                this.character.hitable = false;
                setTimeout(() => {
                    this.character.hitable = true;
                }, 1000);
            }
            else if (this.character.isColliding(enemy) && this.character.hitable) {
                this.character.hit(5);
                this.statusBarLive.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Delete enemys if they are attacked by Pepe 
     * 
     * @param {obj} enemyHit - enemy that Pepe jumps on or throws a bottle at
     * @param {boolean} realJump - check if Pepe is jumping or throwing a bottle
     */
    jumpOnEnemy(enemyHit, realJump) {  // Pepe jumps on Enemy
        let enemyObj = this.selectedLevel.enemies;
        if (realJump) {
            this.character.speedY = 10;
        }
        if (this.typeOfObjectIs('Chicken', enemyObj, enemyHit)) {
            this.selectedLevel.enemies.push(new ChickenDead(enemyHit.x));
            enemyObj.splice(enemyObj.indexOf(enemyHit), 1);
            playSound(this.squished_sound);
        }

        if (this.typeOfObjectIs('Chick', enemyObj, enemyHit)) {
            this.selectedLevel.enemies.push(new ChickDead(enemyHit.x));
            enemyObj.splice(enemyObj.indexOf(enemyHit), 1);
            playSound(this.squished_small_sound);
        }

        else if (this.typeOfObjectIs('Endboss', enemyObj, enemyHit)) {
            enemyHit.hit(30);
            // enemyObj.splice(enemyObj.indexOf(enemyHit), 1);
        }

    }

    checkCollisionsWithCollectableObject(levelNumber) {  // Pepe collects Coin or Bottle
        let colObj = this.selectedLevel.collectableObjects;
        this.selectedLevel.collectableObjects.forEach((co) => {
            if (this.character.isColliding(co)) {
                if (this.typeOfObjectIs('BottleCollectable', colObj, co)) {
                    this.collectBottle(colObj, co);
                }
                else if (this.typeOfObjectIs('Coin', colObj, co)) {
                    this.collectCoin(colObj, co, levelNumber);
                }
            }
        });
    }

    collectBottle(colObj, co) {
        this.collectedBottlesCount++;
        this.statusBarBottles.setPercentage(this.collectedBottlesCount);
        colObj.splice(colObj.indexOf(co), 1);
        playSound(this.bottle_sound);
    }

    collectCoin(colObj, co, levelNumber) {
        this.collectedCoinsCount++;
        document.getElementById('puntosValueGameover').innerHTML = this.collectedCoinsCount;
        document.getElementById('puntosValueLevelfinished').innerHTML = this.collectedCoinsCount;
        setPoints(this.collectedCoinsCount, levelNumber);
        this.statusBarCoins.setPercentage(this.collectedCoinsCount);
        colObj.splice(colObj.indexOf(co), 1);
        playSound(this.coin_sound);
    }

    /**
     * 
     * @param {string} objName - e.g. "Chicken"
     * @param {object} obj - object of enemy
     * @param {number} o - index of object in Array
     * @returns 
     */
    typeOfObjectIs(objName, obj, o) {
        try {
            return obj[obj.indexOf(o)].constructor.name == objName;
        }
        catch {
            return 0;
        }
    }

    /**
     * check if there are bottles to throw
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.availableBottles_And_LoadingTimeReached()) {
                this.previousBottleIsFlying = true;
                let bottle = new Bottle(this.character.x + 50, this.character.y + 100, world, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.collectedBottlesCount--;
                this.statusBarBottles.setPercentage(this.collectedBottlesCount);

                // After a second Pepe can throw a bottle again ("loading time")
                setTimeout(()=>{
                    this.previousBottleIsFlying = false;
                }, 1000);
            }
        }
    }

    /**
     * 
     * @returns if there are Bottles to throw and loading time is reached
     */
    availableBottles_And_LoadingTimeReached(){
        return this.collectedBottlesCount > 0 && this.previousBottleIsFlying == false;
    }

    /**
     * draw objects to canvas
     * function draw is called as often as the graphics card allows
     */
    draw() {
        this.addStaticObjectsToMap();

        // draw movable objects but interupt to draw character, enemies, bottles if Pepe is Dead
        if (this.runDraw) {
            this.addMovableObjectsToMap();
            
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    addStaticObjectsToMap(){
        // only for drawing on Canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.selectedLevel.backgroundObjects);
        this.addObjectsToMap(this.selectedLevel.clouds);
        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addToMap(this.statusBarLive);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0); // forwards
    }

    addMovableObjectsToMap() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.selectedLevel.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.selectedLevel.collectableObjects);
        this.ctx.translate(-this.camera_x, 0);
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

    /**
     * 
     * @param {obj} mo - movable object is reflected (flipped) to walk into another direction
     */
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