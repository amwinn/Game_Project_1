


//imported and directly referenced in src/GameLogic/Gamelogic.js and Entity.js in the determineSprite func
export const CREATURE_RENDER = {
    forest_creature: {
        stance_1: {
            left: "../Images/Entities/Entity_forestSprite/forestSprite_left.png",
            right: "../Images/Entities/Entity_forestSprite/forestSprite_right.png",
            default: "../Images/Entities/Entity_forestSprite/forestSprite_1.png"
        }
    },
    
    //technically they are both forest sprites but im making the mage a temp diff race until the entity role strategy is fully implemented
    greater_forest_creature: {
        stance_1: {
            left: "../Images/Entities/Entity_forestSpriteMage/forestSpriteMage_left.png",
            right: "../Images/Entities/Entity_forestSpriteMage/forestSpriteMage_right.png",
            default: "../Images/Entities/Entity_forestSpriteMage/forestSpriteMage_1.png"
        }
    }
}
//TODO, renaming the names can cause things to break if i forget to rename everywhere else, so at some point we need a ENTITY_TYPES object that will have all the creature types, as thus:
//ENTITY_TYPES = {FOREST_CREATURE:"forest_creature", GREATER_FOREST_CREATURE:"greater_forest_creatuer"}


//below was cut/pasted into creature_data.js from the creatureTypeData.js, instead of having creature_type.js, creature_sprite.js, creature_config.js, will have creature_data, skeleton_data, beast_data, etc



//imported directly and used by entity.js
export const    CREATURE_TYPE = {
    FOREST_CREATURE: "forest_creature",
    GREATER_FOREST_CREATURE: "greater_forest_creature"
}


//NEEDS BIG CHANGES, NO SPRITE STUFF IN HERE ONLY TYPE-RELATED
export const CREATURE_CONFIG = {
    forestSprite: {
        sprite_left: null,//creature_sprite_data.forestsprite.sprite.left,
        sprite_right: null,//creature_sprite_data.forestsprite.sprite.left,
        sprite_default: null,//creature_sprite_data.forestsprite.sprite.left,
        health_default: 100,
        attack: 4,
        defense: 2,
        skill_tree: "wild magic"
    }
}

//CHANGE THIS, HAVE THE SPRITE DATA INSIDE ONE SPRITEDATA, AS SO: 

// spriteData = {
//     forest_sprite: {
//         left:
//         right:
//         default:
//     }

//     goblin: {
//         left:
//         right:
//         default:
//     }
// }