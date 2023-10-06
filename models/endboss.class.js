class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 60;
    animationExplodingStopActivated = false;
    animationHurtStopActivated = false;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = new Level().level_end_x + 100;  // this.world.level.level_end_x   new Level().level_end_x 
        this.animateWalk();
    }

    animateWalk() {
        setSpecialInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!animationHurtStopActivated) {
                    setTimeout(() => {
                        stopSpecialInterval('enbossHurtedAnimation');
                        animationHurtStopActivated = true;
                    }, 1000);
                }
            } if (this.isDead()) {
                stopSpecialInterval('enbossAnimation')
                this.exploding();
            }
            else if (!this.isDead()) {
                this.playAnimation(this.IMAGES_ALERT);
            }

        }, 150, 'enbossAnimation');

    }

    exploding() {
        setSpecialInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            if (!this.animationExplodingStopActivated) {
                this.animationExplodingStopActivated = true;
                setTimeout(() => {
                    stopSpecialInterval('endbossExploding');
                    this.fallDownwards();
                }, 2000);
            }
        }, 350, 'endbossExploding');
    }




    //         else if (this.isHurt()) {
    //     setSpecialInterval(() => {
    //         setTimeout(() => {
    //             this.animate();
    //         }, 2000);
    //         this.playAnimation(this.IMAGES_HURT);
    //         if (!animationStopActivated) {
    //             setTimeout(() => {
    //                 stopSpecialInterval('enbossHurtedAnimation');
    //                 animationStopActivated = true;
    //             }, 1000);
    //         }
    //     }, 200, 'enbossHurtedAnimation');

    // }



}



