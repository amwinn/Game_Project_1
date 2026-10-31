import { CREATURE_TYPE, PLAYER_TYPE } from "./entity_type.js"


export const CREATURE_CONFIG = {
    [CREATURE_TYPE.FOREST_CREATURE]: {
        stats: {
            health: {
                default: 100,
                max: 100,
                min: 0
            },
            mana: {
                default: 100,
                max: 100,
                min: 0
            },
            stamina: {
                default: 100,
                max: 100,
                min: 0
            }
        },

        defense: {
            physical: {
                infliction: 0,
                affliction: 0
            },
            elemental: {
                earth: 0,
                fire: 0,
                frost: 0,
                wind: 0
            },
            divine: {
                holy: 0,
                unholy: 0
            },
            nature: {
                wild: 0,
            },
            sorcery: {
                arcane: 0,
                ritual: 0
            }
        }
    },

    [CREATURE_TYPE.GREATER_FOREST_CREATURE]: {
                stats: {
            health: {
                default: 100,
                max: 100,
                min: 0
            },
            mana: {
                default: 100,
                max: 100,
                min: 0
            },
            stamina: {
                default: 100,
                max: 100,
                min: 0
            }
        },

        defense: {
            physical: {
                infliction: 0,
                affliction: 0
            },
            elemental: {
                earth: 0,
                fire: 0,
                frost: 0,
                wind: 0
            },
            divine: {
                holy: 0,
                unholy: 0
            },
            nature: {
                wild: 0,
            },
            sorcery: {
                arcane: 0,
                ritual: 0
            }
        }
    }
}




export const PLAYER_CONFIG = {
    [PLAYER_TYPE.PLAYER]: {
        stats: {
            health: {
                default: 100,
                max: 100,
                min: 0
            },
            mana: {
                default: 100,
                max: 100,
                min: 0
            },
            stamina: {
                default: 100,
                max: 100,
                min: 0
            }
        },
        
        defense: {
            physical: {
                infliction: 0,
                affliction: 0
            },
            elemental: {
                earth: 0,
                fire: 0,
                frost: 0,
                wind: 0
            },
            divine: {
                holy: 0,
                unholy: 0
            },
            nature: {
                wild: 0,
            },
            sorcery: {
                arcane: 0,
                ritual: 0
            }
        }
    }
}



//one configuration of defenses that may be reaching too far for the confines of this project, keeping just incase
        // defense: {
        //     physical: {
        //         infliction: 0,
        //         affliction: 0
        //     },
        //     elemental: {
        //         earth: 0,
        //         fire: 0,
        //         frost: 0,
        //         wind: 0
        //     },
        //     divine: {
        //         holy: 0,
        //         unholy: 0
        //     },
        //     nature: {
        //         wild: 0,
        //         decay: 0
        //     },
        //     arcane: {
        //         magick: 0,
        //         ritual: 0
        //     }
        // }


//early configuration keeping incase i go back to drawing-board
        // defense: {
        //     affliction: 0,
        //     arcane: 0,
        //     fire: 0,
        //     frost: 0,
        //     holy: 0,
        //     infliction: 0,
        //     nature: 0,
        //     water: 0,
        //     wind: 0,
        //     unholy: 0
        // }