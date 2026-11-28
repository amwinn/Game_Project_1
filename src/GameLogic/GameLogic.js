import Entity, { entityArraysObject, meleeEntityArray, rangedEntityArray } from "../Entity.js";
import GameObject, { gameObjectArray } from "../GameObject.js";
import Spawner from "../Spawner.js";
import { Position, Size, Sprite } from "../Utility.js";
//import { nextMap, changeNextMap } from "./Grid.js";
//import { playerSpawned, changePlayerSpawnState } from "./Grid.js";
import { BIOME_CONFIG } from "../../data/biome_data/biome_config.js";
import { GAMEOBJECT_SUBTYPE, GAMEOBJECT_TYPE } from "../../data/biome_data/biome_type.js";
import { ENTITY_STATE } from "../../data/entity_data/entity_state.js";
import { CREATURE_TYPE } from "../../data/entity_data/entity_type.js";
import { mapDatabase } from "../../data/map_data/map_data.js";
import Area from "../AbilityEntity/AreaOfEffect.js";
import Projectile from "../AbilityEntity/Projectile.js";
import { applyEffects } from "../AbilityLogic/AbilityEffect.js";
import { biomeSprites } from "../AssetRegistry.js";
import Item from "../Item.js";
import { entityProjectilesArray, projectilesArray, radialArray, screenSize, test_item_array, testItemMap } from "../Main.js";
import { animationLogicUpdate } from "./AnimationLogic.js";
import { getMapHeight, getMapWidth, getTile, tileMapConfig, tileMapData } from "./MapLogic.js";
import { movementLogicUpdate } from "./MovementLogic.js";
import { ABILITY_ENTITY_TYPE } from "../../data/ability_data/ability_entity_type.js";


let nextMap = false;
export const objectSpawnTracker = new Set();
export default class GameLogic {
    constructor(camera, player) {
        this.camera = camera;
        this.player = player;
        this.mapWidth = getMapWidth();
        this.mapHeight = getMapHeight();
        
    }

    behaviorAttributes = {
        [GAMEOBJECT_TYPE.ROCK]: {destructible: true},
        [GAMEOBJECT_TYPE.TREE]: {destructible: true},
        [GAMEOBJECT_TYPE.BUSH]: {destructible: true},
        [GAMEOBJECT_TYPE.PORTAL]: {destructible: false},
        //[GameObject.deadTree]: {destructible: true},
        [GAMEOBJECT_TYPE.SPAWNER]: {destructible: true},
        [CREATURE_TYPE.FOREST_CREATURE]: {destructible: true},
        [CREATURE_TYPE.GREATER_FOREST_CREATURE]: {destructible: true},
        [ABILITY_ENTITY_TYPE.PROJECTILE]: {destructible: true},
        // [Projectile.entityProjectile]: {destructible: true},
        [Area.radial]: {destructable: false}
    };
/*
..................................................................................................................................

            Spawn Logic

..................................................................................................................................
*/
//function is from the early days of the project, needs some heavy refactoring/improving at some point
spawnEntity(array, maxEnemyCount, enemyType, enemyRole, position, size, velocity, cooldownTimer, cooldown) {
    if(array.length < maxEnemyCount) {
        array.push(new Entity(enemyType, enemyRole, position, size, velocity, cooldownTimer, cooldown));
    }
}

updatePortalSpawner(array, deltaTime) {
    for(const portal of array) {
        if(portal.type !== GAMEOBJECT_TYPE.SPAWNER) {continue;}
        portal.updatePortal(deltaTime);
        if(portal.spawnTimer >= portal.spawnTime) {
            const meleePosition = new Position(portal.position.x, portal.position.y) //removed the -map.camera.x from the x and y
            const magePosition  = new Position(portal.position.x, portal.position.y) //same
            const meleeEnemySize = new Size(tileMapConfig.tsize/2, tileMapConfig.tsize/2); //eventually remove these and inside the spawnEntity function just call a new Size(creatureTypeData.creature_name.size.dw/dh)
            const rangedEnemySize = new Size(tileMapConfig.tsize/2, tileMapConfig.tsize/2); //eventually remove these and inside the spawnEntity function just call a new Size(creatureTypeData.creature_name.size.dw/dh)
            this.spawnEntity(meleeEntityArray, 50, CREATURE_TYPE.FOREST_CREATURE, Entity.melee, meleePosition, meleeEnemySize, {x: 1, y: 1}, 5, 7); //had to have both velocity values or else it wouldnt have worked
            this.spawnEntity(rangedEntityArray, 25, CREATURE_TYPE.GREATER_FOREST_CREATURE, Entity.mage, magePosition, rangedEnemySize, {x:1, y:1}, 5, 7); //maybe change cooldown number to random number, between 400-500?   
            portal.spawnTimer = 0;      
        }
    }
}

playerSpawnCollisionCheck(player, array) {
    for(let i = array.length-1; i >=0; i--) {
        const object = array[i];
        if(
            player.spawnState === ENTITY_STATE.UNSPAWNED &&
            object.type !== GAMEOBJECT_TYPE.PORTAL &&
            player.position.x + player.size.dw  >= object.position.x &&  
            player.position.x   <= object.position.x + object.size.dw && 
            player.position.y + player.size.dh >= object.position.y && 
            player.position.y   <= object.position.y + object.size.dh
        ) {
            if(player.spawnState === ENTITY_STATE.UNSPAWNED || nextMap === true) {
                console.log("collision is detected and playerspawn is " + player.spawnState);
                array.splice(i, 1);
                console.log("object spliced during player placement");
            }
        }
    }
}


/*
..................................................................................................................................

            End Spawn Logic

..................................................................................................................................
*/
/*
..................................................................................................................................

            Animation Logic

..................................................................................................................................
*/



/*
..................................................................................................................................

            End Animation Logic

..................................................................................................................................
*/




/*
..................................................................................................................................

            Movement Logic

..................................................................................................................................
*/


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
//ROUGH-DRAFT, collision between two circles, DISABLE IF ANY ISSUES REGARDING PROJECTILES
//was adding x + x and y+y instead of subtracting; was also using >= for return (distanceSquared <= (circle1.radius + circle2.radius)**2);
checkCollision_circle(circle1, circle2) {
    const distanceX = circle1.position.x - circle2.position.x;
    const distanceY = circle1.position.y - circle2.position.y;
    const distanceSquared = distanceX * distanceX + distanceY *distanceY;

    return (distanceSquared <= (circle1.radius + circle2.radius)**2);

}



//might replace other two funcs with this if it works
//would do findNearest(circle.position.x, square.position.x, square.position.x +square.size.dw)
//do same for y axis
findNearest(location, boundStart, boundEnd) {
    //if(location < boundStart) {return boundStart}
    //else if(loation > boundEnd) {return boundEnd}
    //else {return location}
}

findNearestX(circle, square) {
    if(circle.position.x < square.position.x) {
        return square.position.x;
    } else if(circle.position.x > square.position.x + square.size.dw) {
        return square.position.x + square.size.dw;
    } else {
        return circle.position.x; //so basically if the circle isnt left or right of the square's bounds, it will be inside the bounds. so nearest x is the circle's x
    }
}

findNearestY(circle, square) {
    if(circle.position.y < square.position.y) {
        return square.position.y;
    } else if(circle.position.y > square.position.y + square.size.dh) {
        return square.position.y + square.size.dh
    } else {return circle.position.y}
}

//ROUGH-DRAFT, collision between radial and box
checkCollision_circleSquare(circle, square) {    
    let nearestX = this.findNearestX(circle,square);
    let nearestY = this.findNearestY(circle, square);

    const distanceX = circle.position.x - nearestX;
    const distanceY = circle.position.y - nearestY;
    return (distanceX**2) + (distanceY**2) <= circle.radius**2;
}

//below needs some work, assumes that the circle will be the spell and the square is relegated to target only
//change this.player to circle.owner once relevant code has been implemented
resolveColliding_circleSquare(circle, square) {
    if(square.type && this.behaviorAttributes[square.type].destructible) { //&& circle.type !== "entityProjectile"
        if(circle.ability) {
            applyEffects(circle.ability.effect, circle, circle.ability, circle.source, square);

        }
    }
}

//if performance issues remove the if(radial collidable, and the radial.collidable ===false)
radialEntityCollision(radialArray, entityArray) {
    radialArray.forEach((radial, radialIndex) => {
        if (radial.collidable === true) { //this may have caused some lag/freezing, only happened once but keep an eye, remove if continues
            entityArray.forEach((entity, entityIndex) => {
                if (this.checkCollision_circleSquare(radial, entity)) {
                    this.resolveColliding_circleSquare(radial, entity);
                    radial.active === false;
                    //radial.setToSplice = true;

                }
            })
        }

    })
}
projectileObjectCollision(projectileArray, array) {
    projectileArray.forEach((projectile, projectileIndex) => {
        array.forEach((object, objectIndex) => {
            if(this.collisionCheck(projectile, object)) {
                if(this.behaviorAttributes[object.type].destructible) {
                    array.splice(objectIndex, 1);
                }
                if(object.type === GAMEOBJECT_TYPE.SPAWNER) {
                    test_item_array.push(new Item(testItemMap.get(1), 100, new Sprite("Images/draft_loot_bag1.png", tileMapConfig.tsize/3, tileMapConfig.tsize/3), object.position.x, object.position.y));
                }
                projectileArray.splice(projectileIndex, 1);
            }
        })
    })
}


projectileCollisionCheck(array1, array2) {
    array1.forEach((value,index1) => {
        array2.forEach((value2, index2) => {
            if(array1[index1] !== array2[index2]) {
                //was this.collisionCheck(), changed to be radius-based collision test
                if(this.checkCollision_circle(array1[index1], array2[index2])){
                    //console.log(value.position.x)
                    array1.splice(index1,1);
                    array2.splice(index2,1);
                }
            }
        })
    })
}

//simple collision check for non-player objects
collisionCheck(entity1, entity2) {
    if(
        entity1.position.x + entity1.size.dw > entity2.position.x  &&
        entity1.position.x  < entity2.position.x + entity2.size.dw &&
        entity1.position.y + entity1.size.dh > entity2.position.y &&
        entity1.position.y  < entity2.position.y + entity2.size.dh
    ) {
        return true;
    } else return false;
}



playerPortalCheck(player, array) {
    array.forEach((object, objectIndex) => {
        if(
            object.type === GAMEOBJECT_TYPE.PORTAL &&
            player.position.x  + player.size.dw/3  >= object.position.x &&  
            player.position.x   <= object.position.x + object.size.dw /1.5 && 
            player.position.y + player.size.dh/1.3 >= object.position.y && 
            player.position.y   <= object.position.y + object.size.dh/1.5 
        ) {
            nextMap = true;
            // if(player.spawnState === ENTITY_STATE.UNSPAWNED || nextMap === true) { //was !playerSpawned
            //     console.log("collision is detected and playerspawn is " + player.spawnState);
            //     array.splice(objectIndex, 1); //splices any object that is in collision range of the player's dynamic spawn location
            //     console.log("object spliced during player placement");
            // } 
            // if(object.type === GAMEOBJECT_TYPE.PORTAL) {
            //     nextMap = true;
            // }  
        }
    })
}




projectilePlayerCollision(array, player) { 
    array.forEach((arrayItem, arrayIndex) => {
        if(
            arrayItem.position.x + arrayItem.size.dw > player.position.x  &&
            arrayItem.position.x  < player.position.x + player.size.dw &&
            arrayItem.position.y + arrayItem.size.dh > player.position.y &&
            arrayItem.position.y  < player.position.y + player.size.dh          
        ) {
            if(arrayItem.source !== player) {
                applyEffects(arrayItem.ability.effect, arrayItem, arrayItem.ability, arrayItem.source, player);
                console.log(arrayItem.source);
                array.splice(arrayIndex, 1);
            } 
            console.log("collision between " + (arrayItem?.type || "unknown") + " and " + (player?.type || "unknown player type"));
        }

    })
}

projectileEntityCollision(entityArray, projectileArray) {
    entityArray.forEach((entity, entityIndex) => { 
        projectileArray.forEach((projectile, projectileIndex) => {
            if(this.checkCollision_circleSquare(projectile, entity)) {
                if(projectile.source !== entity && projectile !== entity) {
                applyEffects(projectile.ability.effect, projectile, projectile.ability, projectile.source, entity);   
                projectile.setToSplice = true;                 
                }

                // if(this.behaviorAttributes[entity.type].destructible && projectile.type !== "entityProjectile") { //"&& entity.type === Enemy.melee" was 2nd part of if statement but i changed it
                //     //entity splicing is handled under the entity update at the moment, dont need it heresd
                //     //entityArray.splice(entityIndex, 1);
                // }

                if(entity.type === ABILITY_ENTITY_TYPE.PROJECTILE) { //entity.type === "entityProjectile" || entity.type ==="playerProjectile"
                    entity.setToSplice=true;
                }
            }
        })
    })
}

playerEntityCollision(player, enemyArray) {
    enemyArray.forEach((entity, entityIndex) => {
        if(this.collisionCheck(player, entity)) {
            {
                //console.log("Collision between " + (enemy?.type || "unknown enemy type") + " and " + (player?.type || "unknown player type"));
                //enemy position changes were originally 1/3 instead of just 1, for all of the below; leads to less dramatic collision adjustment
                if(entity.position.x >= player.position.x) {
                    entity.position.x += 1;                   
                }
                if(player.position.x >= entity.position.x) {
                    entity.position.x -= 1;  
                }
                if(entity.position.y >= player.position.y) {
                    entity.position.y += 1;  
                }
                if(player.position.y >= entity.position.y) {
                    entity.position.y -= 1;
                }
            }
        }
    })
}

entityCollisionCheck(array1, array2) {
    array1.forEach((value1, index1) => {
        array2.forEach((value2, index2) => {
            if(array2[index2] != array1[index1]) {
                //return this.collisionCheck(array1[index1], array2[index2]);
                if(
                    this.collisionCheck(array1[index1], array2[index2]) 
                ) 
                    {
                    this.entityCollisionResolution(array1[index1], array2[index2]);
                }
                }
            })
        })
    }

entityCollisionResolution(entity1, entity2) {
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
        let leftBounds = Math.floor(this.camera.x / tileMapConfig.tsize);
        let rightBounds = Math.floor((this.camera.x + this.camera.size.dw) / tileMapConfig.tsize) + 1;
        let topBounds = Math.floor(this.camera.y / tileMapConfig.tsize);
        let bottomBounds = Math.floor((this.camera.y + this.camera.size.dh) / tileMapConfig.tsize) + 1;


        for (let c = leftBounds; c <= rightBounds; c++) {
            for (let r = topBounds; r <= bottomBounds; r++) {

                const tileID = `${c},${r}`; 
                const tile = getTile(r,c); //was this.tileMap.getTile(c,r); note the parameter differents, column row vs row column

                let x = c * tileMapConfig.tsize;
                let y = r * tileMapConfig.tsize;

                let isTileValid = this.checkTileValidity(x, y, this.mapWidth, this.mapHeight); //works with this.mapWidth or mapWidth, not sure why

                let biomeTileAssignments = BIOME_CONFIG[mapDatabase[tileMapData.mapIndex].biome];
                let selectedBiomeTile = biomeTileAssignments[tile];


                for(const grouping in GAMEOBJECT_SUBTYPE) {
                    for(const item in GAMEOBJECT_SUBTYPE[grouping]) {
                        if(GAMEOBJECT_SUBTYPE[grouping][item] === selectedBiomeTile) {
                            if(objectSpawnTracker.has(tileID) || !isTileValid) {
                                continue; //if use return, it will only load the first screen chunk of items
                            } else {objectSpawnTracker.add(tileID);}
                            const gameObject = grouping === GAMEOBJECT_TYPE.SPAWNER ? new Spawner() : new GameObject(); 
                            gameObject.type = grouping;
                            gameObject.subType = GAMEOBJECT_SUBTYPE[grouping][item]; 
                            gameObject.position = new Position(x, y);
                            gameObject.size = new Size(tileMapConfig.tsize, tileMapConfig.tsize); 
                            gameObject.sprite = biomeSprites[gameObject.type][gameObject.subType]; //was gameObjectSprite[grouping][GAMEOBJECT_TYPE[grouping][item]]

                            switch(grouping) {
                                case GAMEOBJECT_TYPE.BUSH:
                                    
                                    gameObject.position = new Position(x + (tileMapConfig.tsize / 3.3), y + tileMapConfig.tsize / 3.5);
                                    gameObject.size = new Size(tileMapConfig.tsize /2, tileMapConfig.tsize /2);
                                    //bushObjectArray.push(gameObject);
                                    gameObjectArray.push(gameObject);
                                    break;
                                case GAMEOBJECT_TYPE.PORTAL:
                                    //portalObjectArray.push(gameObject);

                                    gameObjectArray.push(gameObject);
                                    break;
                                case GAMEOBJECT_TYPE.ROCK:
                                    //rockObjectArray.push(gameObject);

                                    gameObjectArray.push(gameObject);
                                    break;
                                case GAMEOBJECT_TYPE.SPAWNER:
                                    //spawnerArray.push(gameObject);

                                    gameObjectArray.push(gameObject);
                                    break;
                                case GAMEOBJECT_TYPE.TREE:
                                    //treeObjectArray.push(gameObject);

                                    gameObjectArray.push(gameObject);
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }

    //Necessary because if the user ctrl + zooms out too far, the player could spawn outside the bounds of the map
    //Must be called in mapHandler for intial map, as well as in changeMap while playerSpawned is once again false
    repositionPlayer() {
        if (this.player.position.x > tileMapConfig.columns * tileMapConfig.tsize && this.player.spawnState === ENTITY_STATE.UNSPAWNED) {
            this.player.position.x = (tileMapConfig.columns * tileMapConfig.tsize) / 2;
            console.log("repositioned player")
        }
        if (this.player.position.y > (tileMapConfig.rows * tileMapConfig.tsize) && this.player.spawnState === ENTITY_STATE.UNSPAWNED) {
            this.player.position.y = (tileMapConfig.rows * tileMapConfig.tsize) / 2;
            console.log("repositioned player")
        };
    }

/*
..................................................................................................................................

            End of Map and Object Spawn Logic

..................................................................................................................................
*/



    //Eventually refactor the code to be in seperate update functions, for collision, map, player position etc.
    mapHandler(deltaTime) {
        if(nextMap === true) {this.changeMap();}
        if(this.player.spawnState === ENTITY_STATE.UNSPAWNED) {
            this.player.spawnPlayer();
            //this.camera.clampCamera(this.player);
        }
        this.camera.clampCamera(this.player);
        this.repositionPlayer();
        this.createGameObjects();
        this.playerSpawnCollisionCheck(this.player, gameObjectArray);
        //this.camera.clampCamera(this.player); 
        this.player.spawnState = ENTITY_STATE.SPAWNED;
        //movementLogicUpdate(this.player); //was from this file in the movement logic section
        animationLogicUpdate(deltaTime, this.player, entityArraysObject); //was from this fiel in the movement logic section
        this.radialEntityCollision(radialArray, meleeEntityArray);
        this.radialEntityCollision(radialArray, rangedEntityArray);
        this.entityCollisionCheck(meleeEntityArray, meleeEntityArray);
        this.entityCollisionCheck(meleeEntityArray, rangedEntityArray);
        this.entityCollisionCheck(rangedEntityArray, rangedEntityArray);
        this.playerEntityCollision(this.player, meleeEntityArray);
        this.playerEntityCollision(this.player, rangedEntityArray);
        this.projectileCollisionCheck(projectilesArray, projectilesArray);
        // if(nextMap === true) {
        //     this.changeMap();
        // }
        // this.createGameObjects();
        // this.playerSpawnCollisionCheck(this.player, gameObjectArray);
        //this.repositionPlayer();
        // this.camera.clampCamera(this.player); 
        // this.player.spawnState = ENTITY_STATE.SPAWNED;

        this.projectileObjectCollision(projectilesArray, gameObjectArray);
        this.playerPortalCheck(this.player, gameObjectArray);

        this.projectilePlayerCollision(projectilesArray, this.player);
        this.projectileEntityCollision(meleeEntityArray, projectilesArray);
        this.projectileEntityCollision(rangedEntityArray, projectilesArray);
        for(let i = radialArray.length -1; i >= 0; i--) {
            const radial = radialArray[i];
            radial.updateForm(radial, radial.ability,this.player)//atm is just a clamp-to-player
            radial.animateBehavior(radial, radial.ability, this.player, deltaTime);
            radial.updateBehavior(radial, radial.ability, this.player, deltaTime);
            if(radial.delete ===true) {
                radialArray.splice(i, 1);
            }
        }
        // radialArray.forEach((radial, index) => {
        //     radial.updateForm(radial, radial.ability,this.player)//atm is just a clamp-to-player
        //     radial.animateBehavior(radial, radial.ability, this.player, deltaTime);
        //     radial.updateBehavior(radial, radial.ability, this.player, deltaTime);
        //     if(radial.delete ===true) {
        //         radialArray.splice(index, 1);
        //         //index--;
        //     }
        // })
        for(let i = projectilesArray.length-1; i >= 0; i--) {
            const projectile = projectilesArray[i];
            if(projectile.setToSplice === true) {
                projectilesArray.splice(i, 1);
            }
        }
        // projectilesArray.forEach((projectile, index) => {
        //     if(projectile.setToSplice === true) {
        //         projectilesArray.splice(index, 1);
        //         //index --;
        //     }
        // })

        // entityProjectilesArray.forEach((projectile, index) => {
        //     console.log(entityProjectilesArray.length)
        //     if(projectile.setToSplice === true) {
        //         entityProjectilesArray.splice(index, 1);
        //         //index--;
        //     }
        // })
        //there were two lines of player entity collision checks here, moved them up
        //this.playerSpawnCollisionCheck(this.player, gameObjectArray);
        //this.player.spawnState = ENTITY_STATE.SPAWNED;
        movementLogicUpdate(this.player);
        //this.camera.clampCamera(this.player);

    }

    spawnLogicUpdate(deltaTime) {
        this.updatePortalSpawner(gameObjectArray, deltaTime);
    }

    //tentatively moved to MovementLogic.js, along with all of the movement logic declarations
    // movementLogicUpdate(deltaTime) {
    //     this.adjustDiagonalVelocity(this.player);
    //     //this.playerSpriteManager(this.player, deltaTime);
    //     //this.spriteManager_meleeForestSprite(meleeEntityArray, this.player);
    //     //this.spriteManager_mageForestSprite(rangedEntityArray, this.player);
    //     //this.checkPlayerBounds(this.player, this.mapWidth, this.mapHeight);
        
    // }

    changeMap() {
        this.player.spawnState = ENTITY_STATE.UNSPAWNED;
        this.cullObjects();

        // this.cullObjects();
        if(tileMapData.mapIndex + 1 >= mapDatabase.length) {
            tileMapData.mapIndex = 0;
            tileMapData.tiles = mapDatabase[tileMapData.mapIndex].tiles;
        } else {
            tileMapData.tiles = mapDatabase[tileMapData.mapIndex + 1].tiles;
            tileMapData.mapIndex +=1;

        }
        //this.player.spawnPlayer();
        //this.camera.clampCamera(this.player);
        //console.log("camera clamped" + " Player spawned state is " + this.player.spawnState);
        //this.repositionPlayer();
        //IMPORTANT - if having sprite/image/undefined errors, this.createGameObjects(); will have to be placed AFTER player repositioning, and camera clamping

        //this.createGameObjects();

        // this.player.position.x = screenSize.width/2;
        // this.player.position.y = screenSize.height/2;
        //this.playerSpawnCollisionCheck(this.player, gameObjectArray);
        //this.camera.clampCamera(this.player);
        //this.playerObjectCollision(this.player, gameObjectArray);

        //this.repositionPlayer();
        //this.playerPortalCheck(this.player, gameObjectArray);
        //this.playerSpawnCollisionCheck(this.player, gameObjectArray);
        nextMap = false;
        //this.player.spawnState = ENTITY_STATE.SPAWNED;
    }

        cullObjects() {
            gameObjectArray.length =0;
            projectilesArray.length = 0;
            // entityProjectilesArray.length = 0;
            meleeEntityArray.length = 0;
            rangedEntityArray.length = 0
            test_item_array.length= 0; //START TEST //END TEST
            objectSpawnTracker.clear();
        }
    
}