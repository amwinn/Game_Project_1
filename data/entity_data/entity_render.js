import { CREATURE_TYPE } from "./entity_type.js"


//imported and directly referenced in src/GameLogic/Gamelogic.js and Entity.js in the determineSprite func
export const CREATURE_RENDER = {
    [CREATURE_TYPE.FOREST_CREATURE]: {
        idle: {
            left: [
                "Images/Entities/Entity_forestSprite/forestSprite_left.png"
            ],
            right: [
                "Images/Entities/Entity_forestSprite/forestSprite_right.png"
            ],

        },
        walk: {
            left: [
                "Images/Entities/Entity_forestSprite/forestSprite_left.png"
            ],
            right: [
                "Images/Entities/Entity_forestSprite/forestSprite_right.png"
            ]

        },



        //BELOW MUST BE REPLACES BEFORE PLUGGING CREATURE_RENDER INTO IMAGE LOADING FUNCTIONS, OR ELSE WILL ITERATE THROUGH STANCE_1 WHICH ISNT FORMATTED FOR THE NEW SYSTEM
        //deprecate below section once fully replaced
        // stance_1: {
        //     left: "Images/Entities/Entity_forestSprite/forestSprite_left.png",
        //     right: "Images/Entities/Entity_forestSprite/forestSprite_right.png",
        //     default: "Images/Entities/Entity_forestSprite/forestSprite_1.png"
        // }
    },
    
    //technically they are both forest sprites but im making the mage a temp diff race until the entity role strategy is fully implemented
    [CREATURE_TYPE.GREATER_FOREST_CREATURE]: {
        idle: {
            left: [
                "Images/Entities/Entity_forestSpriteMage/forestSpriteMage_left.png"
            ],
            right: [
                "Images/Entities/Entity_forestSpriteMage/forestSpriteMage_right.png"
            ]
        },
        walk: {
            left: [
                "Images/Entities/Entity_forestSpriteMage/forestSpriteMage_left.png"
            ],
            right: [
                "Images/Entities/Entity_forestSpriteMage/forestSpriteMage_right.png"
            ]

        },



        //BELOW MUST BE REPLACES BEFORE PLUGGING CREATURE_RENDER INTO IMAGE LOADING FUNCTIONS, OR ELSE WILL ITERATE THROUGH STANCE_1 WHICH ISNT FORMATTED FOR THE NEW SYSTEM
        //deprecate below section once fully replaced
        // stance_1: {
        //     left: "Images/Entities/Entity_forestSpriteMage/forestSpriteMage_left.png",
        //     right: "Images/Entities/Entity_forestSpriteMage/forestSpriteMage_right.png",
        //     default: "Images/Entities/Entity_forestSpriteMage/forestSpriteMage_1.png"
        // }
    }
}

export const PLAYER_RENDER = {
    
}