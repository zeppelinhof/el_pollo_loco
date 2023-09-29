let level1;
let countCoins = 3;
let countBottles = 5;
let countChicken = 5;
let countCloud = 4;

function initLevel() {

    let enemiesArray = new Array(countChicken);
    for (let index = 0; index < countChicken; index++) {
        let chicken = new Chicken();
        enemiesArray[index] = chicken;
    } enemiesArray.push(new Endboss());

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


    level1 = new Level(
        enemiesArray,
        cloudsArray,
        [

            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ],
        collectableObjectsArray
    );
}
