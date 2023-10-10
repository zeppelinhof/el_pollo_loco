class ChickDead extends ChickenDead {
    y = 330;
    height = 70;
    width = 70;

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor(chickX) {
        super().loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.loadImages(this.IMAGE_DEAD);

        this.x = chickX;
        this.speed = 0;
        this.animate();
        this.fallDownwards();
    }

    animate() {
        setSpecialInterval(() => {
            this.playAnimation(this.IMAGE_DEAD);
        }, 150, chickDead);
    }
}