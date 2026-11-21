import GameObject from "./GameObject.js";
export const spawnerArray = [];

export default class Spawner extends GameObject {

    constructor(type, position, size) { //was type, position, size, spawnTime
        super(type, position, size);
        this.spawnTimer = 0;
        this.spawnTime = 4; //was spawnTime, but removed the class arg
        this.health = 100;
    }

    updatePortal(deltaTime) {
        this.spawnTimer += deltaTime;
    }

}

//once spawntimer/spawntime and health classes are made, maybe disassemble?