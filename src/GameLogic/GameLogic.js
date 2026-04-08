import GameObject, {rockObjectCharter, bushObjectCharter, treeObjectCharter, gateObjectCharter, deadTreeObjectCharter} from "../GameObject.js";
import Portal, { portalArray } from "../Portal.js";
import Entity, { meleeEnemyCharter, rangedEnemyCharter } from "../Entity.js";
import { Size, Position, Sprite } from "../Utility.js";
//import { nextMap, changeNextMap } from "./Grid.js";
//import { playerSpawned, changePlayerSpawnState } from "./Grid.js";
import { enemyProjectilesArray, gameObjectMasterArray } from "../Main.js";
import { projectilesArray } from "../Main.js";
import { screenSize } from "../Main.js";
import { activeMovementKeys } from "../Input/InputLogic.js";
import Projectile from "../Projectile.js";
import { spriteData } from "../../data/creature_spriteData.js";
import { spriteData_player } from "../../data/player_spriteData.js";

import { test_item_array } from "../Main.js";
import Item from "../Item.js";
import { testItemMap } from "../Main.js";

let nextMap = false;
let playerSpawned = false;
export const objectSpawnTracker = new Set();
export default class GameLogic {
    constructor(mapData, camera, player) {
        this.mapData = mapData;
        this.camera = camera;
        this.player = player;
        this.tileMap = this.mapData.tileMap;
        this.mapWidth = this.mapData.tileMap.getMapWidth();
        this.mapHeight = this.mapData.tileMap.getMapHeight();
        
    }

    behaviorAttributes = {
        [GameObject.rock]: {destructible: true},
        [GameObject.tree]: {destructible: true},
        [GameObject.bush]: {destructible: true},
        [GameObject.gate]: {destructible: false},
        [GameObject.deadTree]: {destructible: true},
        [GameObject.portal]: {destructible: true},
        ['forest_sprite']: {destructible: true},
        ['greater_forest_sprite']: {destructible: true},
        [Projectile.playerProjectile]: {destructible: true},
        [Projectile.enemyProjectile]: {destructible: true},
    };
/*
..................................................................................................................................

            Movement Logic

..................................................................................................................................
*/

//this will need to be changed to be more abstract in that it will have to take in whatever keys are assigned to movement
//perhaps something like activeMovementKeys.has(defaultKeyBindings.up.key) which wouldnt work but just a thought
adjustDiagonalVelocity(player){
    player.setPreviousPosition(); //seems to be working fine here, was originally in the executeInput() func inside inputlogic.js
    const isDiagonal = (
        (activeMovementKeys.has("KeyW") && activeMovementKeys.has("KeyD")) ||
        (activeMovementKeys.has("KeyW") && activeMovementKeys.has("KeyA")) ||
        (activeMovementKeys.has("KeyS") && activeMovementKeys.has("KeyD")) ||
        (activeMovementKeys.has("KeyS") && activeMovementKeys.has("KeyA")) 
    );

    const hasConflictingDirections = (
        (activeMovementKeys.has("KeyW") && activeMovementKeys.has("KeyS")) ||
        (activeMovementKeys.has("KeyA") && activeMovementKeys.has("KeyD"))
    );
    //console.log(player.velocity, player.diagonalVelocity)
    
    if(isDiagonal) {
        player.velocity = player.diagonalVelocity;
    } else if(hasConflictingDirections) {
        player.velocity =0;
    } else {
        player.velocity = player.previousVelocity;
    }

}

//slowly implement the animations frames to here
//remember to horizontally mirror all 3 frames so 6 in total, 3 for left, 3 for right orientation

playerSpriteManager(player) {
    let animationDuration = 40;
    let selectedSpriteSet = spriteData_player.walk[player.animationDirection];

    if (activeMovementKeys.size > 0) {
        player.animationTimer++;
    }
    if (activeMovementKeys.size === 0) {
        player.animationIndex = 0;
        player.sprite.image.src = selectedSpriteSet[player.animationIndex];
    }

    if (player.animationTimer >= animationDuration) {
        player.animationIndex++;
        player.animationTimer = 0;
    }
    if (player.animationIndex >= selectedSpriteSet.length) {
        player.animationIndex = 0;
    }

    player.sprite.image.src = selectedSpriteSet[player.animationIndex];


   
    // original rough draft implementation; discard below once new player sprite added in
    // if(player.direction === "left") {
    //     player.sprite.image.src = spriteData_player["stance_1"]["left"];
    // } else if (player.direction === "right") {
    //     player.sprite.image.src = spriteData_player["stance_1"]["right"];
    // } else {
    //     player.sprite.image.src === spriteData_player["stance_1"]["default"];
    // }
}


//alternative check is to check the velocity, if less than 0 x, dir equals left, if over 0 = right
//feed entityDirectonData config object to the entity properties (no need for construct arg as far as i see at this moment)
spriteManager_meleeForestSprite(array,player) {
    array.forEach((entity, index) => {
        if(entity.position.x > player.position.x ) {
            entity.sprite.image.src = spriteData[entity.type]["stance_1"]["left"];
        } else if (entity.position.x < player.position.x) {
            entity.sprite.image.src = spriteData[entity.type]["stance_1"]["right"];
        } else {
            entity.sprite.image.src = spriteData[entity.type]["stance_1"]["default"];
        }
    })
}


spriteManager_mageForestSprite(array,player){
    array.forEach((entity, index) => {
        if(entity.position.x > player.position.x ) {
            entity.sprite.image.src = spriteData[entity.type]["stance_1"]["left"];
        } else if (entity.position.x < player.position.x) {
            entity.sprite.image.src = spriteData[entity.type]["stance_1"]["right"];
        } else {
            entity.sprite.image.src = spriteData[entity.type]["stance_1"]["default"];
        }
    })
}
//temporary, for real
// checkPlayerBounds(player, mapWidth, mapHeight){
    
//     if(player.position.x  >= mapWidth) {
//         player.position.x -= 2.5
//     }
//     if(player.position.x <= (mapWidth - mapWidth)){
//         player.position.x += 2.5
//     }
//     if(player.position.y  <= (mapHeight - mapHeight)) {
//         player.position.y += 2.5
//     }if(player.position.y + player.size.dh >= mapHeight) {
//         player.position.y -= 2.5
//     }
// }

// isInBounds(subject, mapWidth, mapHeight) {
//     if(
//         subject.position.x  < mapWidth && //is within right bounds
//         subject.position.x >= (mapWidth - mapWidth) && //is within left ^
//         subject.position.y >= (mapHeight - mapHeight) && //is within top ^
//         subject.position.y + subject.size.dh < mapHeight //is within bottom ^
//     ) {
//         return true;
//     } 
//     return false;   
// }

withinLeftBounds(character, mapWidth, mapheight) {
    return(character.position.x > 0)
}
withinRightBounds(character, mapWidth, mapheight) {
    return(character.position.x + character.size.dw <= mapWidth)
}
withinTopBounds(character, mapWidth, mapheight) {
    return(character.position.y >= 0)
}
withinBottomBounds(character, mapWidth, mapheight) {
    return(character.position.y + character.size.dh <= mapheight)
}

/*
..................................................................................................................................

            End Movement Logic

..................................................................................................................................
*/
/*
..................................................................................................................................

            Collision Logic

..................................................................................................................................
*/

//WIP, LOOKS TO BE WORKING GOOD SO FAR
projectileObjectCollision(projectileArray, gameObjectMasterArray) {
    gameObjectMasterArray.forEach((objectArray) => {
        projectileArray.forEach((projectile, projectileIndex) => {
            objectArray.forEach((object, objectIndex) => {
                if(this.collisionCheck(projectile, object)){
                    console.log("collision between " + (projectile?.type || "unknown") + " and " + (object?.type || "unknown"));
                    if(this.behaviorAttributes[object.type].destructible && projectileArray != enemyProjectilesArray) { //had to add the "! = enemyProjectilesArray" or else their arrays would wipe the map clean quickly
                        objectArray.splice(objectIndex, 1);
                    }
                    //recently added && projectile.type !== Projectile.enemyProjectile to the below if statement because the enemies were spawning items but not destroying portal
                    if(objectArray === portalArray && projectile.type !== Projectile.enemyProjectile) { 
                    //START TEST CODE
                    test_item_array.push(new Item(testItemMap.get(1), 100, new Sprite("../Images/draft_loot_bag1.png", this.tileMap.tsize/3, this.tileMap.tsize/3), object.position.x, object.position.y));
                    console.log(test_item_array)
                    //END TEST CODE
                }
                    projectileArray.splice(projectileIndex, 1);
                };
            });
        });
    });
}

//simple collision check for non-player objects
collisionCheck(entity1, entity2) {
    if(
        entity1.position.x + entity1.size.dw > entity2.position.x  &&
        entity1.position.x  < entity2.position.x + entity2.size.dw &&
        entity1.position.y + entity1.size.dw > entity2.position.y &&
        entity1.position.y  < entity2.position.y + entity2.size.dh
    ) {
        return true;
    } else return false;
}


playerObjectCollision(player, gameObjectMasterArray) {
    gameObjectMasterArray.forEach((objectArray) => {
        objectArray.forEach((object, objectIndex) => {
            if(
                player.position.x  + player.size.dw/3  > object.position.x &&  
                player.position.x   < object.position.x + object.size.dw /1.5 && 
                player.position.y + player.size.dh/1.3 > object.position.y && 
                player.position.y   < object.position.y + object.size.dh/1.5 
            ) {

    
                //must be in if statement or else it will prevent the player from re-positioning during changeMap
                if(playerSpawned) {
                    player.position.x = player.previousPosition.x;
                    player.position.y = player.previousPosition.y;
                    this.camera.clampCamera(player); // if this isnt here, the camera moves past the player for just a split moment, comment this out to see if you dont believe your past self.
                }
                if(!playerSpawned || nextMap === true) {
                    console.log("collision is detected and playerspawn is false");
                    objectArray.splice(objectIndex, 1); //splices any object that is in collision range of the player's dynamic spawn location
                    
                    console.log("object spliced during player placement");
                } //else {dddd
                //     player.position.x = player.previousPosition.x;
                //     player.position.y = player.previousPosition.y;
                // }
                if(objectArray === gateObjectCharter) {
                    //teleports player to next map/level
                    nextMap = true;
                    //changeNextMap(true); //function to change nextMap value as its read-only once imported
                    //changePlayerSpawnState(false);
                }  
            } 
        });

    });
}


projectilePlayerCollision(array, player) { 
    array.forEach((arrayItem, arrayIndex) => {
        if(
            arrayItem.position.x + arrayItem.size.dw > player.position.x  &&
            arrayItem.position.x  < player.position.x + player.size.dw &&
            arrayItem.position.y + arrayItem.size.dh > player.position.y &&
            arrayItem.position.y  < player.position.y + player.size.dh          
        ) {
            array.splice(arrayIndex, 1);
            console.log("collision between " + (arrayItem?.type || "unknown") + " and " + (player?.type || "unknown player type"));
        }

    })
}
//WIP, STILL NEED TO REFORMAT DESTROY ON HIT, AND THEN PLUG AND SEE ANY ERRORS
//first if statement was causing two enemies to be spliced, original purpose was lost, mosty likely for objects or enemy mages? not sure 
projectileEntityCollision(entityArray, projectileArray) {
    entityArray.forEach((entity, entityIndex) => { 
        projectileArray.forEach((projectile, projectileIndex) => {
            if(
                projectile.position.x > entity.position.x  &&  
                projectile.position.x < entity.position.x + entity.size.dw &&
                projectile.position.y > entity.position.y  &&
                projectile.position.y < entity.position.y  + entity.size.dh
            ) {
                // the below code was commented out, its is causing 2 enemies to be deleted because of the other if statement also firing after this one, so it deletes the next man up
                // doesnt seem to have any purpose compared to the next function below it, but keeping as im unsure of my original intentions, possibly related to objects being plugged in to this function
                // created before i took a brief break
                // perhaps if using for objects, have a condition that the type is a gameobject type
                // if(this.behaviorAttributes[entity.type].destructible && projectileArray != enemyProjectilesArray) {
                //     //trees/rocks/bushes will be swapped to false eventually, keeping for testing purposes at the moment
                //     entityArray.splice(entityIndex, 1); //projectile splice is outside for now, or else it will pass through gate since gate isnt true in this if statement
                //     }

                //below if statement determines if the enemy is a melee enemy being hit, comment out if disabling friendly fire
                //&& projectile.type !== "enemyProjectile" was added while testing item spawning, can be removed or refactored once item is implemented for real (eventually, i swear)
                if(this.behaviorAttributes[entity.type].destructible && projectile.type !== "enemyProjectile") { //"&& entity.type === Enemy.melee" was 2nd part of if statement but i changed it
                    //START TEST CODE
                    //test_item_array.push(new Item(testItemMap.get(1), 100, new Sprite("../Images/draft_loot_bag1.png", this.tileMap.tsize/3, this.tileMap.tsize/3), entity.position.x, entity.position.y));
                    //END TEST CODE
                    entityArray.splice(entityIndex, 1);

                }
                projectileArray.splice(projectileIndex, 1);//possibly change to bounce? changing velocity to opposite should mimic diagonal reflection
                }
        })

        })
}

playerEnemyCollision(player, enemyArray) {
    enemyArray.forEach((enemy, enemyIndex) => {
        if(this.collisionCheck(player, enemy)) {
            {
                //console.log("Collision between " + (enemy?.type || "unknown enemy type") + " and " + (player?.type || "unknown player type"));
                //enemy position changes were originally 1/3 instead of just 1, for all of the below; leads to less dramatic collision adjustment
                if(enemy.position.x >= player.position.x) {
                    enemy.position.x += 1;                   
                }
                if(player.position.x >= enemy.position.x) {
                    enemy.position.x -= 1;  
                }
                if(enemy.position.y >= player.position.y) {
                    enemy.position.y += 1;  
                }
                if(player.position.y >= enemy.position.y) {
                    enemy.position.y -= 1;
                }
            }
        }
    })
}

enemyCollisionCheck(array1, array2) {
    array1.forEach((value1, index1) => {
        array2.forEach((value2, index2) => {
            if(array2[index2] != array1[index1]) {
                //return this.collisionCheck(array1[index1], array2[index2]);
                if(
                    this.collisionCheck(array1[index1], array2[index2]) 
                ) 
                    {
                    this.enemyCollisionResolution(array1[index1], array2[index2]);
                }
                }
            })
        })
    }

enemyCollisionResolution(entity1, entity2) {
    if(entity1.position.x === entity2.position.x) {
        entity1.position.x += 1/3;
        entity2.position.x -= 1/3;
    }

    if(entity1.position.x >= entity2.position.x) {
        entity1.position.x += 1/3;
        entity2.position.x -= 1/3;
    }
    if(entity2.position.x >= entity1.position.x) {
        entity1.position.x -= 1/3;
        entity2.position.x += 1/3;
    }

    if(entity1.position.y >= entity2.position.y) {
        entity1.position.y += 1/3;
        entity2.position.y -= 1/3;
    }
    if(entity2.position.y >= entity1.position.y) {
        entity1.position.y -= 1/3;
        entity2.position.y += 1/3;
    }

}



/*
..................................................................................................................................

            End of Collision Logic

..................................................................................................................................
*/


/*
..................................................................................................................................

            Map and Object Spawn Logic

..................................................................................................................................
*/


    

    checkTileValidity(x, y, w, h) {
        if (
            x < 0 ||
            x > w ||
            y < 0 ||
            y > h
        ) {
            return false; //was return true in grid.js but it makes more sense this way, because if statement is checking for out of bounds tiles
        } else return true; //absolutely needed this or else it didnt work w/o prefixing ! to the isTileValid variable within the object creation statements
    }

    createGameObjects() {
        //don't even bother trying to console dot log these hogs, they dont have any values b/c camera isnt connected yet, has to be connected inside of main.js unless we find a better way
        let leftBounds = Math.floor(this.camera.x / this.tileMap.tsize);
        let rightBounds = Math.floor((this.camera.x + this.camera.size.dw) / this.tileMap.tsize) + 1;
        let topBounds = Math.floor(this.camera.y / this.tileMap.tsize);
        let bottomBounds = Math.floor((this.camera.y + this.camera.size.dh) / this.tileMap.tsize) + 1;


        // let mapWidth = this.tileMap.cols * this.tileMap.tsize;
        // let mapHeight = this.tileMap.rows * this.tileMap.tsize;


        for (let c = leftBounds; c <= rightBounds; c++) {
            for (let r = topBounds; r <= bottomBounds; r++) {

                const tileID = `${c},${r}`; //note that this uses `, alternate tilda key, for template literal, to embed variable instead of stringifying c and r literally
                const tile = this.tileMap.getTile(c, r);

                let x = c * this.tileMap.tsize;
                let y = r * this.tileMap.tsize;

                let isTileValid = this.checkTileValidity(x, y, this.mapWidth, this.mapHeight); //works with this.mapWidth or mapWidth, not sure why


                let selectedTileSpriteSheet = this.mapData.biomeTileSheets[this.mapData.mapDatabase[this.tileMap.mapIndex].biome];
                //let defaultTileSprite = this.selectedTileSpriteSheet[0];
                let selectedTile = selectedTileSpriteSheet[tile];

                let objectPosition;
                let objectSize;

                //creates object dimensions for objects, note seperate dimensions for bush
                if (selectedTile && selectedTile.type !== GameObject.bush) {
                    objectPosition = new Position(x, y);
                    objectSize = new Size(this.tileMap.tsize, this.tileMap.tsize);
                }
                if (selectedTile && selectedTile.type === GameObject.bush) {
                    objectPosition = new Position(x + (this.tileMap.tsize / 4), y + this.tileMap.tsize / 5)
                    objectSize = new Size(this.tileMap.tsize / 2, this.tileMap.tsize / 2)
                }

                if (selectedTile && selectedTile.arrayType && selectedTile.type) {
                    if (!objectSpawnTracker.has(tileID) && isTileValid && selectedTile.type !== GameObject.portal) {
                        selectedTile.arrayType.push(new GameObject(selectedTile.type, objectPosition, objectSize))
                        objectSpawnTracker.add(tileID);
                    }
                    if (!objectSpawnTracker.has(tileID) && isTileValid && selectedTile.type === GameObject.portal) {
                        selectedTile.arrayType.push(new Portal(selectedTile.type, objectPosition, objectSize, 400, 400, 100))
                        objectSpawnTracker.add(tileID);
                    }
                }
                //Assigns sprite image to objects determined by tile number in MapDB's biomeTileSheet
                if (selectedTile && selectedTile.arrayType && selectedTile.type) {
                    selectedTile.arrayType.forEach((value, index) => {
                        value.sprite = selectedTile.sprite;
                    })
                }

            }
        }

    }

    //Repositions out of bounds player
    //Must be called in mapHandler for intial map, as well as in changeMap while playerSpawned is once again false
    repositionPlayer() {
        if (this.player.position.x > this.tileMap.cols * this.tileMap.tsize && playerSpawned !== true) {
            this.player.position.x = (this.tileMap.cols * this.tileMap.tsize) / 2;
            console.log("repositioned player")
        }
        if (this.player.position.y > (this.tileMap.rows * this.tileMap.tsize) && playerSpawned !== true) {
            this.player.position.y = (this.tileMap.rows * this.tileMap.tsize) / 2;
            console.log("repositioned player")
        };
    }

/*
..................................................................................................................................

            End of Map and Object Spawn Logic

..................................................................................................................................
*/



    //Eventually refactor the code to be in seperate update functions, for collision, map, player position etc.
    mapHandler() {
        this.enemyCollisionCheck(meleeEnemyCharter, meleeEnemyCharter);
        this.enemyCollisionCheck(meleeEnemyCharter, rangedEnemyCharter);
        this.enemyCollisionCheck(rangedEnemyCharter, rangedEnemyCharter);
        if(nextMap === true) {
            this.changeMap();
        }
        this.createGameObjects();
        this.repositionPlayer();
        this.camera.clampCamera(this.player); 
        //still needs some refining, mostly the destroy on hit/splice stuff
        this.projectileObjectCollision(projectilesArray, gameObjectMasterArray);
        this.projectileObjectCollision(enemyProjectilesArray, gameObjectMasterArray);
        this.playerObjectCollision(this.player, gameObjectMasterArray);
        this.projectilePlayerCollision(enemyProjectilesArray, this.player);
        this.projectileEntityCollision(projectilesArray, enemyProjectilesArray);
        this.projectileEntityCollision(meleeEnemyCharter, projectilesArray);
        this.projectileEntityCollision(meleeEnemyCharter, enemyProjectilesArray);
        this.projectileEntityCollision(rangedEnemyCharter, projectilesArray);
        this.playerEnemyCollision(this.player, meleeEnemyCharter);
        this.playerEnemyCollision(this.player, rangedEnemyCharter);
        playerSpawned = true;
        //changePlayerSpawnState(true);
        //console.log(playerSpawned);

    }

    movementLogicUpdate() {
        this.adjustDiagonalVelocity(this.player);
        this.playerSpriteManager(this.player);
        this.spriteManager_meleeForestSprite(meleeEnemyCharter, this.player);
        this.spriteManager_mageForestSprite(rangedEnemyCharter, this.player);
        //this.checkPlayerBounds(this.player, this.mapWidth, this.mapHeight);
        
    }

    changeMap() {
        playerSpawned = false;
        this.cullObjects();
        if(this.tileMap.mapIndex + 1 >= this.mapData.mapDatabase.length) {
            this.tileMap.mapIndex = 0;
            this.tileMap.tiles = this.mapData.mapDatabase[this.tileMap.mapIndex].tiles;
            //this.tileMap.mapIndex +=1; //was making it where we skip the first level when relooping
        } else {
            this.tileMap.tiles = this.mapData.mapDatabase[this.tileMap.mapIndex + 1].tiles;
            this.tileMap.mapIndex +=1;

        }
        //IMPORTANT - if having sprite/image/undefined errors, this.createGameObjects(); will have to be placed AFTER player repositioning, and camera clamping
        this.createGameObjects();
        this.player.position.x = screenSize.width/2;
        this.player.position.y = screenSize.height/2;
        this.camera.clampCamera(this.player);
        //this.createGameObjects();
        this.playerObjectCollision(this.player, gameObjectMasterArray);
        console.log("camera clamped" + " Player spawned is " + playerSpawned);
        this.repositionPlayer();
        nextMap = false;
        playerSpawned = true;


    }

        cullObjects() {
            projectilesArray.length = 0;
            enemyProjectilesArray.length = 0;
            treeObjectCharter.length = 0;
            rockObjectCharter.length = 0;
            bushObjectCharter.length = 0;   
            gateObjectCharter.length = 0;
            deadTreeObjectCharter.length = 0;
            meleeEnemyCharter.length = 0;
            rangedEnemyCharter.length = 0
            portalArray.length = 0;
            test_item_array.length= 0; //START TEST //END TEST
            objectSpawnTracker.clear();
        }
    
}