import { Sprite, Position } from "./Utility.js";
import { spriteData_player } from "../data/player_spriteData.js";
import { PLAYER_RENDER } from "../data/entity_data/entity_render.js";
import { PLAYER_CONFIG } from "../data/entity_data/entity_config.js";
import { PLAYER_TYPE } from "../data/entity_data/entity_type.js";
import { ENTITY_STATE } from "../data/entity_data/entity_state.js";
import { updateModifiers } from "./AbilityLogic/ModifierLogic.js";
import { screenSize } from "./Main.js";

export default class Player{
    constructor(position, size, velocity) {
        this.position = position;
        // this.position.x = x;
        // this.position.y = y;
        this.type = PLAYER_TYPE.PLAYER;
        this.size = size;
        // this.dw = dw;
        // this.dh = dh;
        this.velocity = velocity;
        this.previousVelocity = velocity;
        this.diagonalVelocity = velocity*.7; //could instead do Math.SQRT2 but there are too many decimal positions involved
        this.previousPosition = {x: position.x, y: position.y};
        this.direction = "right"; //default value, could set to null but might mess with default rendered sprite?
        this.animationDirection = "right"
        this.animationTimer = 0;
        this.animationIndex = 0;
        this.sprite = new Sprite(PLAYER_RENDER.idle[this.direction][0], size.dw, size.dh); //tentatively replaces "COMMENT#id" line
        // this.health = 100;//rough draft
        // this.mana = 100;//rough draft
        // this.max_mana = 100;
        this.spawnState = ENTITY_STATE.UNSPAWNED;
        this.base_speed = 1;
        this.speed = 1;
        this.modifiers = [];
        this.effectsOverTime = [];
        this.configReference = PLAYER_CONFIG[this.type];
        this.config = structuredClone(PLAYER_CONFIG[this.type])
        this.stats = this.config.stats;
        this.stats.health.current = this.stats.health.default;
        this.stats.stamina.current = this.stats.stamina.default;
        this.stats.mana.current = this.stats.mana.default;
        this.defenses = this.config.defenses;
        
        //maybe use dot notation for default? not sure, either works.
        //this.sprite = new Sprite(spriteData_player.walk[this.direction[this.animationIndex]]);

    }

    //needs cleaned up
    //called in main.js
    update(player, deltaTime) {
        updateModifiers(player, deltaTime);
        player.effectsOverTime.forEach((effect,i) => {
            effect.update(deltaTime);
        });
    }

    spawnPlayer() {
        this.position.x = screenSize.width/2;
        this.position.y = screenSize.height/2;
    }



    setPreviousPosition() {
        //this.previousPosition = new Position(this.position.x, this.position.y)
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }
    


   
}