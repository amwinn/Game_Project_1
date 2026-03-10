import { Sprite } from "./Utility.js";
export const rockObjectCharter = []; 
export const treeObjectCharter = []; 
export const bushObjectCharter = [];
export const gateObjectCharter = [];
export const deadTreeObjectCharter = [];



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


