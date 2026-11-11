import { Sprite } from "./Utility.js";
export const rockObjectArray = []; 
export const treeObjectArray = []; 
export const bushObjectArray = [];
export const gateObjectArray = [];
export const deadTreeObjectArray = [];



export default class GameObject {
    static rock = "rock";
    static tree = "tree";
    static bush = "bush";
    static gate = "gate";
    static deadTree = "deadTree";
    static portal = "portal"

    constructor(type, position, size) {
        this.type = type;
        this.position = position;
        this.size = size;
        this.sprite;

    }


}


