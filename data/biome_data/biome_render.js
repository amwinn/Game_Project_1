import { BIOME_TYPE } from "./biome_type.js";

export const BIOME_RENDER = {
    BUSH: {
        [BIOME_TYPE.BUSH.BUSH_FOREST]: "Images/Forest/practice_bush1.png",
    },
    GRASS: {
        [BIOME_TYPE.GRASS.GRASS_FOREST]: "Images/Forest/practice_grass5.png",
        [BIOME_TYPE.GRASS.GRASS_SWAMP]: "Images/Swamp/practice_swampGrass1.png",

    },
    PORTAL: {
        [BIOME_TYPE.PORTAL.PORTAL_FOREST]: "Images/Forest/practice_gate3.png",

    },
    ROCK: {
        [BIOME_TYPE.ROCK.ROCK_FOREST]: "Images/Forest/practice_rock1.png",

    },
    SPAWNER: {
        [BIOME_TYPE.SPAWNER.SPAWNER_FOREST]: "Images/Forest/practice_portal1.png",

    },
    TREE: {
        [BIOME_TYPE.TREE.TREE_ALPINE]: "Images/Deprecated/general_tree2.png",
        [BIOME_TYPE.TREE.TREE_FOREST]: "Images/Forest/practice_cypress1.png",
        [BIOME_TYPE.TREE.TREE_SWAMP]: "Images/Swamp/practice_deadTree1.png"
    },

}