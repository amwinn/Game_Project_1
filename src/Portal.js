import GameObject from "./GameObject.js";
export const portalArray = [];

export default class Portal extends GameObject {

    constructor(type, position, size, spawnTimer, spawnTime, health) {
        super(type, position, size);
        this.spawnTimer = spawnTimer;
        this.spawnTime = spawnTime;
        this.health = health;
    }

}

//once spawntimer/spawntime and health classes are made, maybe disassemble?