//temp, will live in assetregistry unless the class ends up being useless

import { CREATURE_RENDER } from "../../data/entity_data/entity_render.js";
import { PLAYER_RENDER } from "../../data/entity_data/entity_render.js";
import { loadEntityRenders } from "../AssetRegistry.js";
import { activeMovementKeys } from "../Input/InputLogic.js";
let playerSprites = loadEntityRenders(PLAYER_RENDER);
let forest_creatureSprites = loadEntityRenders(CREATURE_RENDER["forest_creature"]);
let greater_forest_creatureSprites = loadEntityRenders(CREATURE_RENDER["greater_forest_creature"]);

export function animationLogicUpdate(deltaTime, player, entityArraysObject) {
    playerSpriteManager(player, deltaTime);
    spriteManager_meleeForestSprite(entityArraysObject.meleeEntityArray, player);
    spriteManager_mageForestSprite(entityArraysObject.rangedEntityArray, player);

}
//slowly implement the animations frames to here
//remember to horizontally mirror all 3 frames so 6 in total, 3 for left, 3 for right orientation
//start placeholder
// playerSprites = loadEntityRenders(spriteData_player);
//end placeholder
function playerSpriteManager(player, deltaTime) {
    //console.log(player.sprite)
    let animationDuration = 0.25; //pre-delta-time was 40
    //this.playerSprites is using temp placeholder code/function
    let selectedSpriteSet = playerSprites.walk[player.animationDirection];

    if (activeMovementKeys.size > 0) {
        player.animationTimer+= deltaTime;
    }
    if (activeMovementKeys.size === 0) {
        player.animationIndex = 0;
        player.sprite = selectedSpriteSet[player.animationIndex];
    }

    if (player.animationTimer >= animationDuration) {
        player.animationIndex++;
        player.animationTimer = 0;
        //player.sprite.image.src = selectedSpriteSet[player.animationIndex].image.src;
    }
    if (player.animationIndex >= selectedSpriteSet.length) {
        player.animationIndex = 0;
        //player.sprite.image.src = selectedSpriteSet[player.animationIndex].image.src;
    }

    player.sprite = selectedSpriteSet[player.animationIndex];


   
    // original rough draft implementation; discard below once new player sprite added in
    // if(player.direction === "left") {
    //     player.sprite.image.src = spriteData_player["stance_1"]["left"];
    // } else if (player.direction === "right") {
    //     player.sprite.image.src = spriteData_player["stance_1"]["right"];
    // } else {
    //     player.sprite.image.src === spriteData_player["stance_1"]["default"];
    // }
}



//refactor to be closer to player sprite manager
//alternative check is to check the velocity, if less than 0 x, dir equals left, if over 0 = right
//feed entityDirectonData config object to the entity properties (no need for construct arg as far as i see at this moment)
function spriteManager_meleeForestSprite(array,player) {
    array.forEach((entity, index) => {
        if(entity.position.x > player.position.x ) {
            entity.sprite = forest_creatureSprites.walk["left"][0];
        } else if (entity.position.x < player.position.x) {
            entity.sprite = forest_creatureSprites.walk["right"][0];
        } else {
            entity.sprite = forest_creatureSprites.idle[entity.direction][0];
        }
    })
}

//refactor to be closer to player sprite manager
function spriteManager_mageForestSprite(array,player){
    array.forEach((entity, index) => {
        if(entity.position.x > player.position.x ) {
            entity.sprite = greater_forest_creatureSprites.walk["left"][0];
        } else if (entity.position.x < player.position.x) {
            entity.sprite = greater_forest_creatureSprites.walk["right"][0];
        } else {
            entity.sprite = greater_forest_creatureSprites.idle[entity.direction][0];
        }
    })
}
