import { BIOME_TYPE } from "./biome_type.js";

export const BIOME_RENDER = {
    BUSH_FOREST: "Images/Forest/practice_bush1.png",
    GRASS_FOREST: "Images/Forest/practice_grass5.png",
    GRASS_SWAMP: "Images/Swamp/practice_swampGrass1.png",
    PORTAL_FOREST: "Images/Forest/practice_gate3.png",
    ROCK_FOREST: "Images/Forest/practice_rock1.png",
    SPAWNER_FOREST: "Images/Forest/practice_portal1.png",
    TREE_FOREST: "Images/Forest/practice_cypress1.png",
    TREE_SWAMP: "Images/Swamp/practice_deadTree1.png"
}


    biomeTileSheets = {
        "forest": {
            0: {sprite: new Sprite("Images/Forest/practice_grass5.png")},            
            2: {sprite: new Sprite("Images/Forest/practice_grass4.png")},
            3: {sprite: new Sprite("Images/Forest/practice_cypress1.png"), arrayType: treeObjectArray, type: GameObject.tree},       
            4: {sprite: new Sprite("Images/Forest/practice_bush1.png"), arrayType: bushObjectArray, type: GameObject.bush},
            5: {sprite: new Sprite("Images/Forest/practice_rock1.png"), arrayType: rockObjectArray, type: GameObject.rock}, 
            6: {sprite: new Sprite("Images/Forest/practice_portal1.png"), arrayType: portalArray, type: GameObject.portal},
            7: {sprite: new Sprite("Images/Forest/practice_gate3.png"), arrayType: gateObjectArray, type: GameObject.gate}

        },
        "swamp": {
            0: {sprite: new Sprite("Images/Swamp/practice_swampGrass1.png")},            
            2: {sprite: new Sprite("Images/Swamp/practice_swampGrass1.png")},
            3: {sprite: new Sprite("Images/Swamp/practice_deadTree1.png"), arrayType: deadTreeObjectArray, type: GameObject.deadTree},       
            4: {sprite: new Sprite("Images/Forest/practice_bush1.png"), arrayType: bushObjectArray, type: GameObject.bush},
            5: {sprite: new Sprite("Images/Forest/practice_rock1.png"), arrayType: rockObjectArray, type: GameObject.rock}, 
            6: {sprite: new Sprite("Images/Forest/practice_portal1.png"), arrayType: portalArray, type: GameObject.portal},
            7: {sprite: new Sprite("Images/Forest/practice_gate3.png"), arrayType: gateObjectArray, type: GameObject.gate}

        }
    }