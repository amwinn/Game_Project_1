import { BIOME_TYPE, GAMEOBJECT_TYPE } from "./biome_type.js"


//thinking here is that we just map the numbers to each biome by biome type, and then any one-off/odd objects can be isnerted at any time
export const BIOME_CONFIG = {
    [BIOME_TYPE.FOREST]: {
        0:[GAMEOBJECT_TYPE.GRASS.GRASS_FOREST],
        3:[GAMEOBJECT_TYPE.TREE.TREE_FOREST],
        4:[GAMEOBJECT_TYPE.BUSH.BUSH_FOREST],
        5:[GAMEOBJECT_TYPE.ROCK.ROCK_FOREST],
        6:[GAMEOBJECT_TYPE.SPAWNER.SPAWNER_FOREST],
        7:[GAMEOBJECT_TYPE.PORTAL.PORTAL_FOREST],
    },
    [BIOME_TYPE.SWAMP]: {
        0:[GAMEOBJECT_TYPE.GRASS.GRASS_SWAMP],
        3:[GAMEOBJECT_TYPE.TREE.TREE_SWAMP],
        4:[GAMEOBJECT_TYPE.BUSH.BUSH_FOREST],
        5:[GAMEOBJECT_TYPE.ROCK.ROCK_FOREST],
        6:[GAMEOBJECT_TYPE.SPAWNER.SPAWNER_FOREST],
        7:[GAMEOBJECT_TYPE.PORTAL.PORTAL_FOREST],
    }

}