import Player from "./Player.js"; //gives error if i use capital P????
import Projectile from "./AbilityEntity/Projectile.js";
import Entity, { meleeEntityArray, rangedEntityArray } from "./Entity.js";
import Camera from "./Camera.js";
import RenderLogic from "./RenderLogic.js";
import { deadTreeObjectCharter, gateObjectCharter, rockObjectCharter, treeObjectCharter, bushObjectCharter} from "./GameObject.js";
import Portal from "./Portal.js";
import { portalArray } from "./Portal.js";
import { Position, Size, Sprite } from "./Utility.js";
import MapData from "./MapDB.js";
import GameLogic, { objectSpawnTracker } from "./GameLogic/GameLogic.js";
import InputLogic from "./Input/InputLogic.js";
import { ability_repository } from "../data/ability_data/ability_repository.js";
import { castProjectile, castEntityProjectile } from "./AbilityLogic/AbilityLogic.js";
import { inputState } from "./Input/InputState.js";
import { weapon_data } from "../data/item_data/weapon_data.js";

import { generateUID } from "./Utility.js";
import { spellbolt } from "../data/ability_data/simple_magic.js";

//******************************************************************************INITIAL GUIDANCE******************************************************************************
//firstly, ctrl and - will zoom out on code and side bars, ctrl and + will zome in, we are one increment zoomed in, so to go default hit ctrl and -
//to add curor to multiple lines, ctrl alt up/down, alt click to selectively do so
//to rename classes and class instances, select, right click, and rename symbol (f2)
//gameMap is canvas size
//screenSize is monitor size
//this. is the class, so this.x, would be a template in the class, for its instance's x position. this. for Player player would be player.x, etc.
//****************************************************************************************************************************************************************************

// immediate to do:
// look into moving mapWidth/mapHeight to mapDB.js, place  in the tilemap object perhaps? can also create new object mapSize {w: whatever * whatever, h: whatever * whatever}

document.body.style.cursor = "crosshair";

//Canvas / Context
const gameMap = document.getElementById("gameCanvas");
const renderer = gameMap.getContext("2d");

//Screensize
export const screenSize = {width: window.innerWidth, height: window.innerHeight};

//Sets total canvas size, not used atm
gameMap.width = 8000//3328;  //canvas size, not used atm
gameMap.height = 4000//1792; //canvas size, not used atm



//DEPENDENCIES
let mapData = new MapData();
let camera = new Camera(0,0, new Size(screenSize.width,screenSize.height));

export const test_item_array = [];
export const gameObjectMasterArray = [
    rockObjectCharter,
    bushObjectCharter,
    treeObjectCharter,
    gateObjectCharter,
    deadTreeObjectCharter,
    portalArray
];


export const testItemMap = new Map(weapon_data.map(item => [item.id, item]));

//below is not yet used, would need to implement another forEach layer into the projectileEntity function at GameLogic.js
export const enemyMasterArray = [
    meleeEntityArray,
    rangedEntityArray
];

let playerPosition = new Position(screenSize.width/2, screenSize.height/2);
let playerSize = new Size(mapData.tileMap.tsize/1.5, mapData.tileMap.tsize/1.5); //both were /1.5
let player = new Player(playerPosition, playerSize, 2);

//DEPENDENTS
const renderLogic = new RenderLogic(mapData, camera, player); //originally objectMap, changed to map, easier to type and more concise
const gameLogic = new GameLogic(mapData, camera, player);//need to run main method in main loop
const inputLogic = new InputLogic(gameLogic, camera, player);


export const projectilesArray = [];
export const entityProjectilesArray = [];
export const radialArray = [];
//export const radialArray = [];

export const dataSet = {
    eruptiveArray: radialArray,
    projectilesArray: projectilesArray,
    radialArray: radialArray,
    cursorData: inputState
}


//temporary function to display mana, ui will be after ability system and inventory/item system
function displayVitals(player) {
    renderer.font = "40px Chaucer";
    renderer.fillStyle = "DeepSkyBlue";

    renderer.fillText(
        `MANA: ${player.mana}/${player.max_mana}`,
        25,
        50
    );
}


// let meleeEnemySize = new Size(mapData.tileMap.tsize/2, mapData.tileMap.tsize/2); //both were map.player.size.dw/dh /2
// let rangedEnemySize = new Size(mapData.tileMap.tsize/2, mapData.tileMap.tsize/2); //was map.player.size.dw/3, map.player.size.dh/2
//recently moved to the portal array.foreach section, right before the spawnEnemy function is called




//Temporary position, most likely moving to gamelogic.js
// function spawnEnemy(array, maxEnemyCount, enemyType, enemyRole, position, size, velocity, cooldownTimer, cooldown) {
//     if(array.length < maxEnemyCount) {
//         array.push(new Entity(enemyType, enemyRole, position, size, velocity, cooldownTimer, cooldown));
//     }
// }
//recently moved to gamelogic under new spawnlogic section, remove soon


//Temporary object to interface enemy spell casting until spell and ability logic are properly added and structured
//const projectileHandler = new Projectile();

function renderLoot(renderer) {
    test_item_array.forEach((item, i) => {
       renderer.drawImage(item.sprite.image, item.x-camera.x, item.y-camera.x, 64, 64);
       
    });
}
let lastTime = 0;
function gameLoop(){
    //requestAnimationFrame automatically fills its callback function, so requestAnimationFrame(callback), with a timestamp, which is performance.now();
    //i could technically just give gameLoop a parameter, and then parameterName - lastTime /1000, but performance.now() feels like the better approach for now so im not putting too much on RAF
    //so deltaTime is just the measure of time that has elapsed between the current time and the last time. /1000 converts the milliseconds to seconds
    let currentTime = performance.now();
    let deltaTime = (currentTime - lastTime) /1000;
    lastTime = currentTime;
    //console.log(deltaTime)
    //requestAnimationFrame(gameLoop); //moving to end of function
    renderer.clearRect(0,0, gameMap.width, gameMap.height);
    gameLogic.mapHandler();
    gameLogic.movementLogicUpdate();
    renderLoot(renderer); //temp spot while testing, move to renderLogic eventually
    renderLogic.renderHandler(renderer);
    displayVitals(player);
    inputLogic.executeInput();
    portalArray.forEach((portal, portalIndex) => {
        if(portal.spawnTimer <= 0) {
            const meleePosition = new Position(portal.position.x, portal.position.y) //removed the -map.camera.x from the x and y
            const magePosition  = new Position(portal.position.x, portal.position.y) //same
            const meleeEnemySize = new Size(mapData.tileMap.tsize/2, mapData.tileMap.tsize/2); //eventually remove these and inside the spawnEntity function just call a new Size(creatureTypeData.creature_name.size.dw/dh)
            const rangedEnemySize = new Size(mapData.tileMap.tsize/2, mapData.tileMap.tsize/2); //eventually remove these and inside the spawnEntity function just call a new Size(creatureTypeData.creature_name.size.dw/dh)
            gameLogic.spawnEntity(meleeEntityArray, 10, Entity.forest_creature, Entity.melee, meleePosition, meleeEnemySize, {x: 1, y: 1}, 500, 700); //had to have both velocity values or else it wouldnt have worked
            gameLogic.spawnEntity(rangedEntityArray, 5, Entity.greater_forest_creature, Entity.mage, magePosition, rangedEnemySize, {x:1, y:1}, 500, 700); //maybe change cooldown number to random number, between 400-500?   
            portal.spawnTimer = portal.spawnTime;      
        }
        portal.spawnTimer --;
        
    })


    meleeEntityArray.forEach((enemy, index) => {  
        enemy.updateMeleeEnemy(renderer, enemy, renderLogic.player, renderLogic.camera);
        enemy.enemyBounds(enemy, renderLogic.mapWidth, renderLogic.mapHeight);
        if(enemy.health <= 0) {
            meleeEntityArray.splice(index, 1)
        }
    })


    rangedEntityArray.forEach((enemy, index) => {
        enemy.updateRangedEnemy(renderer, enemy, renderLogic.player, renderLogic.camera);
        enemy.enemyBounds(enemy, renderLogic.mapWidth, renderLogic.mapHeight);
        if(enemy.health <=0) {
            rangedEntityArray.splice(index, 1);
        }
        if(enemy.cooldownTimer <= 0) {
            //projectileHandler.castEntityProjectile(enemyProjectilesArray, enemy, renderLogic.player, ability_repository["spellbolt"]);
            castEntityProjectile(projectilesArray, enemy, renderLogic.player, ability_repository["spellbolt"]);
            //castProjectile(ability_repository["spellbolt"], enemy, dataSet)
            enemy.cooldownTimer = enemy.cooldown
            enemy.mana -= 10;
        }
        enemy.cooldownTimer --;
    })



    projectilesArray.forEach((projectile, projectileIndex) => {
        projectile.updateProjectile(renderer, renderLogic.camera);
        projectile.projectileBounds(projectile, renderLogic.mapWidth, renderLogic.mapHeight, projectileIndex, projectilesArray);
    })   

    entityProjectilesArray.forEach((enemyProjectile, enemyProjectileIndex) => {
        enemyProjectile.updateProjectile(renderer, renderLogic.camera);
        enemyProjectile.projectileBounds(enemyProjectile, renderLogic.mapWidth, renderLogic.mapHeight, enemyProjectileIndex, entityProjectilesArray);
    })
    requestAnimationFrame(gameLoop);


}

//Simple prototype for testing projectiles
//Temporary position until spell spell and ability logic are properly added and structured
//keeping incase need to revert from the new implementation within ProjectileAction and InputLogic
// gameMap.addEventListener("click", (e) => {
//     const angle = Math.atan2((e.clientY -20) - (renderLogic.player.position.y +50 - camera.y), (e.clientX-20) - (renderLogic.player.position.x +32 - camera.x));
//     const velocity = {x: Math.cos(angle)*3, y: Math.sin(angle)*3};
//     const size = new Size(30,30);
//     const position = new Position(renderLogic.player.position.x + 32 , renderLogic.player.position.y + 50);// the +32 and +50 offsets may need adjusted
//     projectilesArray.push(new Projectile(Projectile.playerProjectile, position, size, velocity)); 
// })


gameLoop();

