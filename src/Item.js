import { generateUID } from "./Utility.js";

export default class Item {
    constructor(id, durability, sprite, x, y) {
        this.id = id;
        this.uid = generateUID();
        this.durability = durability;
        this.owner = null;
        this.sprite = sprite;
        this.x = x;
        this.y = y;

    }
}


//remove some of the constructor args after we are done testing, mostly sprite, x, y, etc. we can grab those from the data at some point
