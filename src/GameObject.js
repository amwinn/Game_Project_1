import { Sprite } from "./Utility.js";
import { GAMEOBJECT_TYPE } from "../data/biome_data/biome_type.js";
export const rockObjectArray = []; 
export const treeObjectArray = []; 
export const bushObjectArray = [];
export const portalObjectArray = [];
export const deadTreeObjectArray = [];

export const gameObjectArray = [];



export default class GameObject {
    static rock = "ROCK";
    static tree = "TREE";
    static bush = "BUSH";
    static portal = "PORTAL";
    //static deadTree = "TREE";
    static spawner = "SPAWNER"

    constructor(type, position, size) {
        this.category = null;
        this.type = type;
        this.position = position;
        this.size = size;
        this.sprite;

    }


}


