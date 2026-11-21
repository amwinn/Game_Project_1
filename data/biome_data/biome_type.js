//cant decide on having one single BIOME_TYPE or several FOREST_TYPE, SWAMP_TYPE etc.
//going with single BIOME_TYPE, only need separate ones if the list grows unwieldy
//depending on



export const BIOME_TYPE = {
    FOREST: "forest",
    SWAMP: "swamp",
}


export const MESH_TYPE = {
    GRASS: "grass"
}


export const GAMEOBJECT_TYPE = {
    BUSH: "bush",
    PORTAL: "portal",
    ROCK: "rock",
    SPAWNER: "spawner",
    TREE: "tree"
}

export const MESH_SUBTYPE = {
    [MESH_TYPE.GRASS]: {
        GRASS_FOREST: "forest_grass",
        GRASS_SWAMP: "swamp_grass",
    },

}

export const GAMEOBJECT_SUBTYPE = {
    [GAMEOBJECT_TYPE.BUSH]: {
        BUSH_FOREST: "forest_bush",
    },
    [GAMEOBJECT_TYPE.PORTAL]: {
        PORTAL_FOREST: "forest_portal",
    },
    [GAMEOBJECT_TYPE.ROCK]: {
        ROCK_FOREST: "forest_rock",
    },
    [GAMEOBJECT_TYPE.SPAWNER]: {
        SPAWNER_FOREST: "forest_spawner",
    },
    [GAMEOBJECT_TYPE.TREE]: {
        TREE_ALPINE: "alpine_tree",
        TREE_FOREST: "forest_tree",
        TREE_SWAMP: "dead_tree"
    },

}



//alternative way to do this is make GAMEOBJECT_TYPE simply be {ROCK: "rock"} etc., and then make a new TREE_TYPE, ROCK_TYPE, BUSH_TYPE, etc., with their respective sub types such as forest tree, dead tree, etc.

