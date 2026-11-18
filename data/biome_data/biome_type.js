//cant decide on having one single BIOME_TYPE or several FOREST_TYPE, SWAMP_TYPE etc.
//going with single BIOME_TYPE, only need separate ones if the list grows unwieldy
//depending on


export const GAMEOBJECT_TYPE = {
    BUSH: {
        BUSH_FOREST: "forest_bush",
    },
    GRASS: {
        GRASS_FOREST: "forest_grass",
        GRASS_SWAMP: "swamp_grass",

    },
    PORTAL: {
        PORTAL_FOREST: "forest_portal",
    },
    ROCK: {
        ROCK_FOREST: "forest_rock",
    },
    SPAWNER: {
        SPAWNER_FOREST: "forest_spawner",
    },
    TREE: {
        TREE_ALPINE: "alpine_tree",
        TREE_FOREST: "forest_tree",
        TREE_SWAMP: "dead_tree"
    },

}

