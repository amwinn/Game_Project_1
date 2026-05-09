import { CREATURE_TYPE } from "./entity_type.js"


//NEEDS BIG CHANGES, NO SPRITE STUFF IN HERE ONLY TYPE-RELATED
export const CREATURE_CONFIG = {
    [CREATURE_TYPE.FOREST_CREATURE]: {
        sprite_left: null,//imported sprite object.left
        sprite_right: null,//imported sprite object.right
        sprite_default: null,//imported sprite object.right
        health_default: 100,
        attack: 4,
        defense: 2,
        skill_tree: "wild magic"
    }
}
