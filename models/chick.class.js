class Chick extends Chicken{
    y = 350;
    height = 70;
    width = 70;

    offset = {
        top: -20,
        left: 20,
        right: 20,
        bottom: 20
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        // this.x = this.randomPosition(400);
        // this.speed = 0.15 + Math.random() * 1.5;
        // this.animate();
    }

        
    // }

    // animate() {
    //     setSpecialInterval(() => {
    //         this.moveLeft();
    //     }, 1000 / 60, chickenMoveLeft);

    //     setSpecialInterval(() => {
    //         this.playAnimation(this.IMAGES_WALKING);
    //     }, 150, chickenWalk);
    // }

}