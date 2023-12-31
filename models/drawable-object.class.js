class DrawableObject {

    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();  //this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1', 'img/image2', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch (e) {
            return 0;
        }
    }

    /**
     * only for testing
     * 
     * @param {*} ctx - canvas.getContext('2d')
     */
    drawFrame(ctx) {
        if (this instanceof DrawableObject || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            //ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    randomPosition(startPoint) {
        return startPoint + Math.random() * (level_end_x);
    }

    /**
     * random position in y-direction for coins
     * 
     * @param {number} startPointY - in pixels
     * @returns 
     */
    randomPositionY(startPointY) {
        return startPointY + Math.random() * 300;
    }
}