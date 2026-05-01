

//imported directly and used by entity.js
export const ENTITY_TYPE_NAME = {
    FOREST_CREATURE: "forest_creatuer",
    GREATER_FOREST_CREATURE: "greater_forest_creature"
}


//NEEDS BIG CHANGES, NO SPRITE STUFF IN HERE ONLY TYPE-RELATED
export const entityType = {
    forestSprite: {
        sprite_left: null,//creature_sprite_data.forestsprite.sprite.left,
        sprite_right: null,//creature_sprite_data.forestsprite.sprite.left,
        sprite_default: null,//creature_sprite_data.forestsprite.sprite.left,
        health_default: 100,
        attack: 4,
        defense: 2,
        skill: "wild magic"
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