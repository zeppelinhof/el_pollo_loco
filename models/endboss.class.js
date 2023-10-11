class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 60;
    startMovement = false;
    animationExplodingStopActivated = false;
    animationHurtStopActivated = false;
    animationAlertStopActivated = false;
    animationNearerStopActivated = false;
    animationAttackStopActivated = false;
    currentImage = 0;
    alerted = true;
    attacking = false;
    hurted = false;

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
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = new Level().level_end_x + 100;  // this.world.level.level_end_x   new Level().level_end_x 
        this.idleEndboss();
    }

    idleEndboss() {
        setSpecialInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
            if (this.isHurt()) {
                this.activeEndboss();
                stopSpecialInterval(idleEndboss);
            }
        }, 200, idleEndboss);
    }

    activeEndboss() {
        setSpecialInterval(() => {
            if (this.alerted) {
                this.alert();
            }
            if (this.attacking) {
                this.attack();
            }
            if (this.isHurt()) {
                this.hurt();
            }

            if (this.isDead()) {
                this.nextAnimation_Dead();
                this.exploding();
            }
        }, 200, activeEndboss);
    }

    alert() {
        this.playAnimation(this.IMAGES_ALERT);
        if (!this.animationAlertStopActivated) {
            setTimeout(() => {
                this.nextAnimation_Attacking();
                this.switchAnimation_Alert_Attack(false, true)
            }, 1000);
        }
    }

    attack() {
        this.playAnimation(this.IMAGES_ATTACK);
        if (!this.animationAttackStopActivated) {
            setTimeout(() => {
                this.nextAnimation_Alerted();
                this.switchAnimation_Alert_Attack(true, false)
                this.comeNearer(20);
            }, 500);
        }
    }

    switchAnimation_Alert_Attack(boolFirst, boolSecond) {
        this.animationAttackStopActivated = boolFirst;
        this.animationAlertStopActivated = boolSecond;
    }

    hurt() {
        this.playAnimation(this.IMAGES_HURT);
        setSpecialInterval(() => {
            if (!this.animationHurtStopActivated) {
                this.nextAnimation_Alerted();
                this.animationHurtStopActivated = true;
                this.switchAnimation_Alert_Attack(false, false)
            }
        }, 200, enbossHurtedAnimation);
    }

    comeNearer(speed) {
        if (!this.isDead()) {
            this.x -= speed;
        }
    }

    nextAnimation_Attacking() {
        this.attacking = true;
        this.alerted = false;
        this.hurted = false;
    }

    nextAnimation_Alerted() {
        this.alerted = true;
        this.attacking = false;
        this.hurted = false;
    }

    nextAnimation_Dead() {
        this.alerted = false;
        this.attacking = false;
        this.hurted = false;
    }

    exploding() {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.animationExplodingStopActivated) {
            this.animationExplodingStopActivated = true;
            setTimeout(() => {
                stopSpecialInterval(endbossExploding);
                this.fallDownwards();
                showLevelFinished();
            }, 2000);
        }
    }
}