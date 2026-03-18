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



    //if the enemy tries going out of bounds it will snap back
    enemyBounds(enemy, mapWidth, mapHeight) {

        if(enemy.position.x + enemy.size.dw >= mapWidth) {
            enemy.position.x -= 2;
        }
        if(enemy.position.x <= mapWidth-mapWidth) {
            enemy.position.x += 2;
        }
        if(enemy.position.y + enemy.size.dh >= mapHeight) {
            enemy.position.y -= 2;
        }
        if(enemy.position.y <= mapHeight - mapHeight) {
            enemy.position.y += 2;
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
