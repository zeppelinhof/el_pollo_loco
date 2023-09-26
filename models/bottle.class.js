class Bottle extends ThrowableObject{
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

    constructor(x,y){
        super(x,y);
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        this.animate();
        // this.throw();
        this.rotate();
    }

    rotate(){
        this.playAnimation(this.IMAGES_ROTATING);
    }

    animate() {        
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATING);
            }
        }, 80);
    }
}