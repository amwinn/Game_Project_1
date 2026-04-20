import { Position, Size, Sprite } from "./Utility.js";

export default class Projectile {
    static playerProjectile = "playerProjectile";
    static enemyProjectile = "enemyProjectile";
    constructor(type, ability, position, size, velocity, sprite) {
        this.type = type;
        this.ability = ability;
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.sprite = sprite;
        //this.sprite = this.determineSprite();        

    }

    //not yet utilized
    determineSprite(){
        if(this.type === "playerProjectile") {
            return new Sprite("../images/magic_bolt1.png", this.dw, this.dh);
        }
        if(this.type === "enemyProjectile") {
            return new Sprite("../images/magic_bolt1.png", this.dw, this.dh);
        } else {
            return new Sprite("../images/magic_bolt1.png", this.dw, this.dh)
        }

    }







    renderProjectile(renderer, camera) {
        renderer.drawImage(this.sprite.image, this.position.x - camera.x, this.position.y - camera.y, this.size.dw, this.size.dh);
    }

    // renderPlayerProjectile(renderer) {
    //     renderer.drawImage(this.sprite.image, this.position.x, this.position.y, this.size.dw, this.size.dh);
    // }
    // updatePlayerProjectile(renderer) {
    //     this.renderPlayerProjectile(renderer);
    //     this.position.x = this.position.x += this.velocity.x;
    //     this.position.y = this.position.y += this.velocity.y;
    // }

    updateProjectile(renderer, camera){
        this.renderProjectile(renderer, camera);
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
    }

    castEntityProjectile(array, enemy, target, ability) {
        const angle = Math.atan2(((target.position.y + target.size.dh/5) - enemy.position.y), ((target.position.x + target.size.dw/5) - enemy.position.x)); //dw/5 and dh/5 can be adjusted as needed
        const size = new Size(30,30);
        const position = new Position(enemy.position.x, enemy.position.y);
        const sprite = new Sprite("../images/magic_bolt1.png", size.dw, size.dh)
        //this.velocity.y = Math.sin(angle);
        //this.velocity.x = Math.cos(angle);
        array.push(new Projectile(Projectile.enemyProjectile, ability, position, size, {x: Math.cos(angle), y:Math.sin(angle)}, sprite));
    }


    //below func splices any projectiles that are out of CANVAS bounds, if you want it to be the tilemap bounds change param construct from gameMap to 2 new params mapWidth and mapHeight
    projectileBounds(projectile, mapWidth, mapHeight, projectileIndex, projectilesArray) {
    if(
        projectile.position.x > mapWidth ||
        projectile.position.x < mapWidth - mapWidth ||
        projectile.position.y > mapHeight ||
        projectile.position.y < mapHeight - mapHeight) {
            projectilesArray.splice(projectileIndex, 1);
        }
    }

    

}