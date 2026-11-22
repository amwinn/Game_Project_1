import { Sprite } from "./Utility.js";
import { GAMEOBJECT_SUBTYPE } from "../data/biome_data/biome_type.js";
// export const rockObjectArray = []; 
// export const treeObjectArray = []; 
// export const bushObjectArray = [];
// export const portalObjectArray = [];
// export const deadTreeObjectArray = [];

export const gameObjectArray = [];



export default class GameObject {
    static rock = "rock";
    static tree = "tree";
    static bush = "bush";
    static portal = "portal";
    //static deadTree = "TREE";
    static spawner = "spawner"

    constructor(type, position, size) {
        this.category = null;
        this.type = type;
        this.position = position;
        this.size = size;
        this.sprite;

    }


}


