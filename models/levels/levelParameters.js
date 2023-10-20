let countCoins;
let countBottles;
let countChicken;
let countChick;
let countCloud;
let level1;
let level2;
let screenwidthN1 = screenwidth - 1;   
let enemiesArray = new Array(countChicken);
let cloudsArray = new Array(countCloud);
let collectableObjectsArray;

/**
 * get specific paramters for level 1 or 2 (e.g. count of enemies )
 * 
 * @param {number} screenwidth - width of game screen in pixels
 * @param {string} levelNumber 
 */
function initLevel(levelNumber) {

    setLevelParameters(levelNumber);

    setMovableObjectsArrays(levelNumber);

     
    backgroundArray = [

        new BackgroundObject('img/5_background/layers/air.png', -(screenwidthN1)),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -(screenwidthN1)),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -(screenwidthN1)),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -(screenwidthN1)),
    ];

    for (let i = 0; i < countBackgroundObjects; i += 2) {
        createBackgroundObject(i);
    }

    if (levelNumber == '1') {
        level1 = new Level(
            enemiesArray,
            cloudsArray,
            backgroundArray,
            collectableObjectsArray
        );
    } else {
        level2 = new Level(
            enemiesArray,
            cloudsArray,
            backgroundArray,
            collectableObjectsArray
        );
    }

}

/**
 * 
 * @param {number} i - depends on position on width of level (running route) and width of screen
 */
function createBackgroundObject(i) {
    const layers1 = ['air', '3_third_layer/1', '2_second_layer/1', '1_first_layer/1'];
    const layers2 = ['air', '3_third_layer/2', '2_second_layer/2', '1_first_layer/2'];

    for (const layer of layers1) {
        backgroundArray.push(
            new BackgroundObject(`img/5_background/layers/${layer}.png`, (screenwidthN1) * i)
        );
    }
    for (const layer of layers2) {
        backgroundArray.push(
            new BackgroundObject(`img/5_background/layers/${layer}.png`, (screenwidthN1) * (i + 1))
        );
    }
}

function setLevelParameters(levelNumber) {
    if (levelNumber == '1') {
        countCoins = 10;
        countBottles = 7;
        countChicken = 3;
        countChick = 3;
        countCloud = 4;
    } else {
        countCoins = 20;
        countBottles = 7;
        countChicken = 10;
        countChick = 10;
        countCloud = 4;
    }
}

function setMovableObjectsArrays(levelNumber) {    

    createChickenArray(enemiesArray);
    createChickArray(enemiesArray);

    enemiesArray.push(new Endboss(levelNumber));

    createCloudsArray();

    collectableObjectsArray = new Array(countCoins + countBottles);
    createCoinsArray(collectableObjectsArray);
    createCollectableObjectsArray(collectableObjectsArray);
}

function createChickenArray(enemiesArray) {
    for (let index = 0; index < countChicken; index++) {
        let chicken = new Chicken();
        enemiesArray[index] = chicken;
    }
}
function createChickArray(enemiesArray) {
    for (let index = countChicken; index < countChicken + countChick; index++) {
        let chick = new Chick();
        enemiesArray[index] = chick;
    }
}

function createCloudsArray() {
    
    for (let index = 0; index < countCloud; index++) {
        let cloud = new Cloud();
        cloudsArray[index] = cloud;
    }
}

function createCoinsArray(collectableObjectsArray) {    
    for (let index = 0; index < countCoins; index++) {
        let coin = new Coin();
        collectableObjectsArray[index] = coin;
    }
}

function createCollectableObjectsArray(collectableObjectsArray) {
    for (let index = countCoins; index < collectableObjectsArray.length; index++) {
        let bottle = new BottleCollectable();
        collectableObjectsArray[index] = bottle;
    }
}
