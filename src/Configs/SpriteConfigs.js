import { Sprite } from "../Utility.js"

export const playerSpriteConfig = {
    "left": {sprite: new Sprite("../images/simple_wizard1_transparent_left.png")},
    "right": {sprite: new Sprite("../images/simple_wizard1_transparent.png")}
}



//../data/spriteTables.js
export const spriteData = {
    goblin: {
        default: "goblin_default.png",
        right: "goblin_right.png",
        left: "goblin_left.png"
    },

    hobgoblin: {
        default: "hobgoblin_default.png",
        right: "hobgoblin_right.png",
        left: "hobgoblin_left.png"
    },

    orc: {
        default: "orc_default.png",
        right: "orc_right.png",
        left: "orc_left.png"
    }
}

//../data/creatureData.js
//import {spriteData} from "../data/spriteTables.js"

export const creatureData = {
    goblin: {
        sprite: spriteData.goblin, //not spriteData.goblin.default, because then it only allows access to that specific sprite orientation
        health: 10,
        attack: 5,
        defense: 5,
    },
    hobgoblin: {
        sprite: spriteData.hobgoblin,
        health: 10,
        attack: 5,
        defense: 5,
    },
    orc: {
        sprite: spriteData.orc,
        health: 10,
        attack: 5,
        defense: 5,
    }
}