export class Position {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

export class Size{
    constructor(dw, dh) {
        this.dw = dw;
        this.dh = dh;
        //if we change this to just size then we need to go change all of the instances of new Sprite in the various folders
        // Projectile has 2, player 1 object like 5 or 6
    }
}



export class Sprite {
    constructor(imageSource, dw, dh) {
        this.image = new Image();
        this.image.src = imageSource;
        this.dw = dw;
        this.dh = dh;
    }
}

//havent added size to Sprite yet because i might remove 
//this code if i find it unnecessary towards end of project


//ATTRIBUTE CLASS NOT YET IMPLEMENTED
//probably scrap or reorganize
export class Attribute {
    constructor(health) { //maybe add hasHealth to constructor?
        this.health = health;
        //maybe add setHealth func?
    }
}

//will be exported to Item.js most likely

let counter = 0;
export function generateUID() {
const time = Date.now().toString(36);
let uid = time + counter.toString(36);
counter++;
return uid;
}