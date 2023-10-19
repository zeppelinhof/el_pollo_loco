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
    levelNumber;

    endbossDead_sound = new Audio('audio/endbossDead.mp3')

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

    constructor(levelNumber) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = level_end_x + 100;
        this.idleEndboss();
        this.levelNumber = levelNumber;
    }

    /**
     * idle if not key pressed
     */
    idleEndboss() {
        setSpecialInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
            if (this.characterNearEndboss()) {
                this.activeEndboss();
                stopSpecialInterval(idleEndboss);
            }
        }, 200, idleEndboss);
    }

    /**
     * when endboss is hurted by Pepe it begins to come nearer
     */
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
                playSound(this.endbossDead_sound);
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
                this.comeNearer(50);
            }, 1000 / 5);
        }
    }

    /**
     * 
     * @param {boolean} boolFirst - either attack or be alerted
     * @param {boolean} boolSecond 
     */
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

    /**
     * next_animation function to avoid simultaneous running of several intervals
     */
    nextAnimation_Attacking() {
        this.switchAnimation_On_Off(false, true, false);
    }

    nextAnimation_Alerted() {
        this.switchAnimation_On_Off(true, false, false);
    }

    nextAnimation_Dead() {
        this.switchAnimation_On_Off(false, false, false);
    }

    characterNearEndboss(){
        return world.character.x > level_end_x - 300;
    }

    /**
     * at most one animation is true
     * 
     * @param {boolean} animationType1 - say if alerted is true or false
     * @param {boolean} animationType2 - say if attacking is true or false
     * @param {boolean} animationType3 - say if hurted is true or false 
     */
    switchAnimation_On_Off(animationType1, animationType2, animationType3,) {
        this.alerted = animationType1;
        this.attacking = animationType2;
        this.hurted = animationType3;
    }

    exploding() {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.animationExplodingStopActivated) {
            this.animationExplodingStopActivated = true;
            setTimeout(() => {
                stopSpecialInterval(endbossExploding);
                this.fallDownwards();
                showLevelFinished(this.levelNumber);
            }, 2000);
        }
    }
}