import { GAMEOBJECT_SUBTYPE, MESH_TYPE } from "./biome_type.js";

export const BIOME_RENDER = {
    BUSH: {
        [GAMEOBJECT_SUBTYPE.BUSH.BUSH_FOREST]: "Images/Forest/practice_bush1.png",
    },
    GRASS: {
        [MESH_TYPE.GRASS.GRASS_FOREST]: "Images/Forest/practice_grass5.png",
        [MESH_TYPE.GRASS.GRASS_SWAMP]: "Images/Swamp/practice_swampGrass1.png",
    },
    PORTAL: {
        [GAMEOBJECT_SUBTYPE.PORTAL.PORTAL_FOREST]: "Images/Forest/practice_gate3.png",

    },
    ROCK: {
        [GAMEOBJECT_SUBTYPE.ROCK.ROCK_FOREST]: "Images/Forest/practice_rock1.png",

    },
    SPAWNER: {
        [GAMEOBJECT_SUBTYPE.SPAWNER.SPAWNER_FOREST]: "Images/Forest/practice_portal1.png",

    },
    TREE: {
        [GAMEOBJECT_SUBTYPE.TREE.TREE_ALPINE]: "Images/Deprecated/general_tree2.png",
        [GAMEOBJECT_SUBTYPE.TREE.TREE_FOREST]: "Images/Forest/practice_cypress1.png",
        [GAMEOBJECT_SUBTYPE.TREE.TREE_SWAMP]: "Images/Swamp/practice_deadTree1.png"
    },

}