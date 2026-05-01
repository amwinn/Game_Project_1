


//imported and directly referenced in src/GameLogic/Gamelogic.js and Entity.js in the determineSprite func
export const spriteData = {
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