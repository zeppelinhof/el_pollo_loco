class Coin extends CollectableObject {

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = this.randomPosition(200);
        this.y = this.randomPositionY(10);
        this.animate();
    }


    animate() {
        setGeneralInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 150);
    }
}