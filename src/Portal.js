import GameObject from "./GameObject.js";
export const portalArray = [];

export default class Portal extends GameObject {

    constructor(type, position, size, spawnTime) {
        super(type, position, size);
        this.spawnTimer = 0;
        this.spawnTime = spawnTime;
        this.health = 100;
    }

    updatePortal(deltaTime) {
        this.spawnTimer += deltaTime;
    }

}

//once spawntimer/spawntime and health classes are made, maybe disassemble?