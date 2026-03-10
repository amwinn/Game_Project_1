import { Position, Size, Sprite } from "./Utility.js";
import { spriteData } from "../data/creature_spriteData.js";

export const meleeEnemyCharter = [];
export const rangedEnemyCharter = [];



//File is still very much a work in progress, needs a lot of cleaning and refactoring, transfers to other gamelogic etc.

let enemySelfCollision;
let inRange;
export default class Entity {
    static melee = "melee";
    static mage = "mage";
    constructor(type, role, position, size, velocity, cooldownTimer, cooldown) {
        this.type = type;
        this.role = role;
        //this.role = role;
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.cooldownTimer = cooldownTimer;
        this.cooldown = cooldown;
        this.sprite = this.determineSprite();
        
    }

    //was if(this.type === Entity.melee/mage), but changed to if(this.type === forest_sprite))
    determineSprite() {
        if(this.type === 'forest_sprite') {
            return new Sprite(spriteData[this.type]["stance_1"]["default"], this.size.dw, this.size.dh);
        }
        if(this.type === "greater_forest_sprite") {
            return new Sprite(spriteData[this.type]["stance_1"]["default"], this.size.dw, this.size.dh);
        }

    }

   
    updateMeleeEnemy(renderer, enemy, target, camera) { 
        inRange = this.enemyRangeCheck(enemy, target, 20 )
        if(inRange != true) { 
            const angle = Math.atan2(((target.position.y + target.size.dh/5) - this.position.y), ((target.position.x + target.size.dw/5) - this.position.x))  //the /5 for size x and size y are to make center of player sprite the target, not top left
            this.velocity.y = Math.sin(angle)/1.5;
            this.velocity.x = Math.cos(angle)/1.5;
        } 
        if(inRange === true) { 
            this.velocity.x = 0;
            this.velocity.y = 0;
        }


        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
        
    }

    updateRangedEnemy(renderer, enemy, target, camera) {
        inRange = this.enemyRangeCheck(enemy, target, 300);
        if (inRange === true && enemySelfCollision != true) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        } else if(inRange != true) {
            const angle = Math.atan2(((target.position.y + target.size.dh/5) - this.position.y), ((target.position.x + target.size.dw/5) - this.position.x))
            this.velocity.y = Math.sin(angle)/1.5;
            this.velocity.x = Math.cos(angle)/1.5;
        }
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
        
    }


    enemyRangeCheck(enemy, target, range) {
        if(
            enemy.position.x + enemy.size.dw + range > target.position.x &&
            enemy.position.x < target.position.x + target.size.dw + range &&
            enemy.position.y + enemy.size.dh + range > target.position.y &&
            enemy.position.y < target.position.y + target.size.dh + range
        ) {
            return true;
        }
    }

    
    // enemyCollision(array, array2) { 
    //     array.forEach((value, index) => {
    //         array2.forEach((value2, index2) => {
    //             if(array2[index2] != array[index]) { 
    //                 this.enemyCollisionCheck(array[index], array2[index2])
    //                 }
    //             })
    //         })
    //     }

//DEPRECATED, remove soon
//     enemyCollisionCheck(entity1, entity2) {
//     if(entity1.position.x === entity2.position.x) {
//         enemySelfCollision = true;
//         entity1.position.x += 1/3;
//         entity2.position.x -= 1/3;
//     }
//     if(
//        entity1.position.x + entity1.size.dw > entity2.position.x  &&
//        entity1.position.x  < entity2.position.x + entity2.size.dw &&
//        entity1.position.y + entity1.size.dw > entity2.position.y &&
//        entity1.position.y  < entity2.position.y + entity2.size.dh
//     ) {
//         enemySelfCollision = true //while this helps spread enemies it can also make things look a bit rubberbandesque if only a few enemies and player standing still; looks great with 400
//         // below code didnt work because there were too many collisions, so they would freeze and stay put
//         // entity1.position.x = entity1.previousPosition.x;
//         // entity1.position.y = entity1.previousPosition.y;
//         // entity2.position.x = entity2.previousPosition.x;
//         // entity2.position.y = entity2.previousPosition.y;
//         //----------------------------------------------------
//         if(entity1.position.x >= entity2.position.x) {
//             entity1.position.x += 1/3;
//             entity2.position.x -= 1/3;
//         }
//         if(entity2.position.x >= entity1.position.x) {
//             entity1.position.x -= 1/3;
//             entity2.position.x += 1/3;
//         }

//         if(entity1.position.y >= entity2.position.y) {
//             entity1.position.y += 1/3;
//             entity2.position.y -= 1/3;
//         }
//         if(entity2.position.y >= entity1.position.y) {
//             entity1.position.y -= 1/3;
//             entity2.position.y += 1/3;
//         }
//     } else enemySelfCollision = false;

// }


    //if the enemy tries going out of bounds it will snap back
    enemyBounds(enemy, camera, mapWidth, mapHeight) {

        if(enemy.position.x + enemy.size.dw >= mapWidth) {
            enemy.position.x -= 5;
        }
        if(enemy.position.x <= mapWidth-mapWidth) {
            enemy.position.x += 5;
        }
        if(enemy.position.y + enemy.size.dh >= mapHeight) {
            enemy.position.y -= 5;
        }
        if(enemy.position.y <= mapHeight - mapHeight) {
            enemy.position.y += 5;
        }



    // if(
    //     enemy.position.x + enemy.size.dw  >= mapWidth ||
    //     enemy.position.x <= mapWidth - mapWidth) {
    //         enemy.position.x += 100; 
    //     }
    // if(
    //     enemy.position.y + enemy.size.dh >= mapHeight ||
    //     enemy.position.y <= mapHeight - mapHeight
    // ) {
    //     enemy.position.y +
    // }
}


}
