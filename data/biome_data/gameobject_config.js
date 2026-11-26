import { GAMEOBJECT_TYPE } from "./biome_type.js";


export const GAMEOBJECT_CONFIG = {
    [GAMEOBJECT_TYPE.BUSH]: {
       tile_size_offset: {x: .5, y: .5},
       render_factor: {x: 1, y: 1},
       collision_factor: {x: 1, y: 1}
    },
    [GAMEOBJECT_TYPE.PORTAL]: {
       tile_size_offset: {x: 1, y: 1},
       render_factor: {x: 1, y: 1},
       collision_factor: {x: 1, y: 1}
    },
    [GAMEOBJECT_TYPE.ROCK]: {
       tile_size_offset: {x: 1, y: 1},
       render_factor: {x: 1, y: 1},
       collision_factor: {x: 1, y: 1}
    },
    [GAMEOBJECT_TYPE.SPAWNER]: {
       tile_size_offset: {x: 1, y: 1},
       render_factor: {x: 1, y: 1},
       collision_factor: {x: 1, y: 1}
    },
    [GAMEOBJECT_TYPE.TREE]: {
       tile_size_offset: {x: 1, y: 1},
       render_factor: {x: 1, y: 1},
       collision_factor: {x: 1, y: 1}
    }
    
}