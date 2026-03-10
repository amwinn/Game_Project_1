


//imported and directly referenced in src/GameLogic/Gamelogic.js and Entity.js in the determineSprite func
export const spriteData = {
    forest_sprite: {
        stance_1: {
            left: "../Images/Entities/Entity_forestSprite/forestSprite_left.png",
            right: "../Images/Entities/Entity_forestSprite/forestSprite_right.png",
            default: "../Images/Entities/Entity_forestSprite/forestSprite_1.png"
        }
    },
    
    //technically they are both forest sprites but im making the mage a temp diff race until the entity role strategy is fully implemented
    greater_forest_sprite: {
        stance_1: {
            left: "../Images/Entities/Entity_forestSpriteMage/forestSpriteMage_left.png",
            right: "../Images/Entities/Entity_forestSpriteMage/forestSpriteMage_right.png",
            default: "../Images/Entities/Entity_forestSpriteMage/forestSpriteMage_1.png"
        }
    }
}