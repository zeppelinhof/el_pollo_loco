let level1;
let countCoins = 10;
let countBottles = 5;
let countChicken = 5;
let countChick = 5;
let countCloud = 4;

function initLevel(screenwidth) {

    let enemiesArray = new Array(countChicken);
    for (let index = 0; index < countChicken; index++) {
        let chicken = new Chicken();
        enemiesArray[index] = chicken;
    }

    for (let index = countChicken; index < countChicken + countChick; index++) {
        let chick = new Chick();
        enemiesArray[index] = chick;
    }

    enemiesArray.push(new Endboss());

    let cloudsArray = new Array(countCloud);
    for (let index = 0; index < countCloud; index++) {
        let cloud = new Cloud();
        cloudsArray[index] = cloud;
    }

    let collectableObjectsArray = new Array(countCoins + countBottles);
    for (let index = 0; index < countCoins; index++) {
        let coin = new Coin();
        collectableObjectsArray[index] = coin;
    }

    for (let index = countCoins; index < collectableObjectsArray.length; index++) {
        let bottle = new BottleCollectable();
        collectableObjectsArray[index] = bottle;
    }

    let screenwidthN1 = screenwidth - 1;
    const layers1 = ['air', '3_third_layer/1', '2_second_layer/1', '1_first_layer/1'];
    const layers2 = ['air', '3_third_layer/2', '2_second_layer/2', '1_first_layer/2'];
    backgroundArray = [

        new BackgroundObject('img/5_background/layers/air.png', -(screenwidthN1)),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -(screenwidthN1)),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -(screenwidthN1)),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -(screenwidthN1)),
    ];

    for (let i = 0; i < 3; i += 2) {
        createBackgroundObject(i);
        // backgroundArray.push(
        //     new BackgroundObject('img/5_background/layers/air.png', (screenwidthN1) * i),
        //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', (screenwidthN1) * i),
        //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', (screenwidthN1) * i),
        //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', (screenwidthN1) * i),

        //     new BackgroundObject('img/5_background/layers/air.png', (screenwidthN1) * (i + 1)),
        //     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', (screenwidthN1) * (i + 1)),
        //     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', (screenwidthN1) * (i + 1)),
        //     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', (screenwidthN1) * (i + 1)),
        // );
    }

    function createBackgroundObject(i) {
        for (const layer of layers1) {
            backgroundArray.push(
                new BackgroundObject(`img/5_background/layers/${layer}.png`, (screenwidthN1) * i)
            );            
        }
        for (const layer of layers2) {
            backgroundArray.push(
                new BackgroundObject(`img/5_background/layers/${layer}.png`, (screenwidthN1) * (i+1))
            );            
        }
    }

    level1 = new Level(
        enemiesArray,
        cloudsArray,
        backgroundArray,
        collectableObjectsArray
    );
}
