class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width= 500;    

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = this.randomPosition(500)
        this.animate();                
    }

    animate(){
        this.moveLeft();
    }

}