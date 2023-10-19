class Character extends MovableObject {
    y = 30;
    speed = 10;
    height = 300;

    offset = {
        top: 120,
        left: 30,
        right: 40,
        bottom: 30
    }

    notSetted = true;
    setIntervalCounter = 0;


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png'
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('audio/pepe_walking.mp3')

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);  // super constructor kann nicht mehrmals aufgerufen werden -> this
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * check pressed keys for Pepes behaviour or if he's dead, hurt, above ground or idleing
     */
    animate() {
        setGeneralInterval(() => {

            if (!this.isDead()) {
                this.runAnimation();
            }
            
        }, 1000 / 60);

        setGeneralInterval(() => {
            this.hurtJumpWalkAnimation();
        }, 1000 / 10);

        setGeneralInterval(() => {
            this.idleAnimation();
        }, 1000 / 2);
    }

    /**
     * when jump on enemy Pepe pushes away from the opponent a little (30)
     */
    jump() {
        this.speedY = 30;
    }

    hurtJumpWalkAnimation() {
        if (this.isDead()) {
            this.deadAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            stopSound(this.walking_sound);
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Arm-Leg Movement Animation
                this.playAnimation(this.IMAGES_WALKING);
                playSound(this.walking_sound);
            }
        }
    }

    deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.notSetted) {
            this.notSetted = false;
            setTimeout(() => {
                this.world.runDraw = false;
                stopSound(this.walking_sound);
                // hier evtl. alle Sounds beenden
                showGameover();
            }, 2000);
        }
    }

    idleAnimation() {
        if (keyboard.idle == true) {
            this.playAnimation(this.IMAGES_IDLE);
        }

        if (keyboard.longidle == true) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        }
    }

    runAnimation() {
        if (this.world.keyboard.RIGHT && this.x < level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            // Body Movement Animation
            this.moveLeft();
            this.otherDirection = true;
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }

        this.world.camera_x = -this.x + 100;
    }
}