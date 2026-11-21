import { GAMEOBJECT_SUBTYPE, MESH_SUBTYPE, GAMEOBJECT_TYPE, MESH_TYPE } from "./biome_type.js";

export const BIOME_RENDER = {
    [GAMEOBJECT_TYPE.BUSH]: {
        [GAMEOBJECT_SUBTYPE[GAMEOBJECT_TYPE.BUSH].BUSH_FOREST]: "Images/Forest/practice_bush1.png",
    },
    [MESH_TYPE.GRASS]: {
        [MESH_SUBTYPE[MESH_TYPE.GRASS].GRASS_FOREST]: "Images/Forest/practice_grass5.png",
        [MESH_SUBTYPE[MESH_TYPE.GRASS].GRASS_SWAMP]: "Images/Swamp/practice_swampGrass1.png",
    },
    [GAMEOBJECT_TYPE.PORTAL]: {
        [GAMEOBJECT_SUBTYPE[GAMEOBJECT_TYPE.PORTAL].PORTAL_FOREST]: "Images/Forest/practice_gate3.png",

    },
    [GAMEOBJECT_TYPE.ROCK]: {
        [GAMEOBJECT_SUBTYPE[GAMEOBJECT_TYPE.ROCK].ROCK_FOREST]: "Images/Forest/practice_rock1.png",

    },
    [GAMEOBJECT_TYPE.SPAWNER]: {
        [GAMEOBJECT_SUBTYPE[GAMEOBJECT_TYPE.SPAWNER].SPAWNER_FOREST]: "Images/Forest/practice_portal1.png",

    },
    [GAMEOBJECT_TYPE.TREE]: {
        [GAMEOBJECT_SUBTYPE[GAMEOBJECT_TYPE.TREE].TREE_ALPINE]: "Images/Deprecated/general_tree2.png",
        [GAMEOBJECT_SUBTYPE[GAMEOBJECT_TYPE.TREE].TREE_FOREST]: "Images/Forest/practice_cypress1.png",
        [GAMEOBJECT_SUBTYPE[GAMEOBJECT_TYPE.TREE].TREE_SWAMP]: "Images/Swamp/practice_deadTree1.png"
    },

}