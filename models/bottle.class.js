class Bottle extends ThrowableObject {

    isSplashed = false;
    timeoutSplashOn = false;
    enemyHit;

    splash_sound = new Audio('audio/splash.mp3')


    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, world, otherDirection) {
        super(x, y, otherDirection).loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        this.world = world;
        this.animate();
    }

    animate() {
        setSpecialInterval(() => {
            if (!this.isSplashed) {
                this.playAnimation(this.IMAGES_ROTATING);
                this.checkCollision_Bottle_Enemy();
            } else {
                if (this.enemyStillOnScreen) {
                    this.world.jumpOnEnemy(this.enemyHit, false); // Throw bottle same effect like jump on enemy -> dead     
                    this.enemyStillOnScreen = false;
                }
                this.playAnimation(this.IMAGES_SPLASH);
                if (!this.timeoutSplashOn) {
                    setTimeout(() => {
                        stopSpecialInterval(bottleSplash);
                    }, 500);
                    this.timeoutSplashOn = true;
                }
            }
        }, 80, bottleSplash);
    }



    checkCollision_Bottle_Enemy() {
        this.world.selectedLevel.enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                playSound(this.splash_sound);
                this.isSplashed = true;
                this.speedY = 10;
                this.enemyHit = enemy;
            }
        });
    }
}