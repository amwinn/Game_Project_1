import { Position, Size, Sprite } from "./Utility.js";
import { CREATURE_RENDER } from "../data/entity_data/entity_render.js";
import { CREATURE_TYPE } from "../data/entity_data/entity_type.js";

export const meleeEntityArray = [];
export const rangedEntityArray = [];



//File is still very much a work in progress, needs a lot of cleaning and refactoring, transfers to other gamelogic etc.

let enemySelfCollision;
let inRange;
export default class Entity {
    static melee = "melee";
    static mage = "mage";
    static forest_creature = "forest_creature";
    static greater_forest_creature = "greater_forest_creature";
    constructor(type, role, position, size, velocity, cooldownTimer, cooldown) {
        this.type = type;
        this.role = role;
        //this.role = role;
        this.position = position;
        this.direction = "left"; // not yet used besides in determineSprite() and the temporary code in sprite manager funcs inside gamelogic.js
        this.size = size;
        this.velocity = velocity;
        this.cooldownTimer = cooldownTimer;
        this.cooldown = cooldown;
        this.sprite = new Sprite(CREATURE_RENDER[this.type].idle[this.direction][0], this.size.dw, this.size.dh)
        //this.sprite = this.determineSprite();
        this.health = 30;
        this.mana = 100;
        
    }

    //was if(this.type === Entity.melee/mage), but changed to if(this.type === forest_sprite))
    determineSprite() {
        console.log(CREATURE_RENDER[this.type].idle[this.direction][0])
        if(this.type === Entity.forest_creature) {
            return new Sprite(CREATURE_RENDER[this.type].idle[this.direction][0], this.size.dw, this.size.dh);
        }
        if(this.type === Entity.greater_forest_creature) {
            return new Sprite(CREATURE_RENDER[this.type].idle[this.direction][0], this.size.dw, this.size.dh);   ///["stance_1"]["default"]
        }

    }

   
    updateMeleeEnemy(renderer, enemy, target, camera) { 
        inRange = this.entityRangeCheck(enemy, target, 20 )
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

    updateRangedEnemy(renderer, entity, target, camera) {
        inRange = this.entityRangeCheck(entity, target, 300);
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


    entityRangeCheck(entity, target, range) {
        if(
            entity.position.x + entity.size.dw + range > target.position.x &&
            entity.position.x < target.position.x + target.size.dw + range &&
            entity.position.y + entity.size.dh + range > target.position.y &&
            entity.position.y < target.position.y + target.size.dh + range
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

    }


}
