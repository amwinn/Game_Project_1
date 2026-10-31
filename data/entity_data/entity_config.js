import { CREATURE_TYPE, PLAYER_TYPE } from "./entity_type.js"


export const CREATURE_CONFIG = {
    [CREATURE_TYPE.FOREST_CREATURE]: {
        stats: {
            health: {
                health: 100,
                default: 100,
                max: 100,
                min: 0
            },
            mana: {
                mana: 100,
                default: 100,
                max: 100,
                min: 0
            },
            stamina: {
                stamina: 100,
                default: 100,
                max: 100,
                min: 0
            }
        },

        defense: {
            affliction: 0,
            arcane: 0,
            fire: 0,
            frost: 0,
            holy: 0,
            infliction: 0,
            nature: 0,
            water: 0,
            wind: 0,
            unholy: 0
        }
    },

    [CREATURE_TYPE.GREATER_FOREST_CREATURE]: {
                stats: {
            health: {
                health: 100,
                default: 100,
                max: 100,
                min: 0
            },
            mana: {
                mana: 100,
                default: 100,
                max: 100,
                min: 0
            },
            stamina: {
                stamina: 100,
                default: 100,
                max: 100,
                min: 0
            }
        },

        defense: {
            affliction: 0,
            arcane: 0,
            fire: 0,
            frost: 0,
            holy: 0,
            infliction: 0,
            nature: 0,
            water: 0,
            wind: 0,
            unholy: 0
        }
    }
}




export const PLAYER_CONFIG = {
    [PLAYER_TYPE.PLAYER]: {
        stats: {
            health: {
                health: 100,
                default: 100,
                max: 100,
                min: 0
            },
            mana: {
                mana: 100,
                default: 100,
                max: 100,
                min: 0
            },
            stamina: {
                stamina: 100,
                default: 100,
                max: 100,
                min: 0
            }
        },
        
        defense: {
            affliction: 0,
            arcane: 0,
            fire: 0,
            frost: 0,
            holy: 0,
            infliction: 0,
            nature: 0,
            water: 0,
            wind: 0,
            unholy: 0
        },
    }
}