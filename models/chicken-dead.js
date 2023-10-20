class ChickenDead extends MovableObject {
    y = 330;
    height = 100;    

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor(chickenX) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.loadImages(this.IMAGE_DEAD);
        this.x = chickenX;
        this.speed = 0;
        this.animate();
        this.fallDownwards();
    }

    animate() {
        setSpecialInterval(() => {
            this.playAnimation(this.IMAGE_DEAD);
        }, 150, chickenDead);
    }
}