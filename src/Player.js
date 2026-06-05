import { Sprite, Position } from "./Utility.js";
import { spriteData_player } from "../data/player_spriteData.js";

export default class Player{
    constructor(position, size, velocity) {
        this.position = position;
        // this.position.x = x;
        // this.position.y = y;
        this.size = size;
        // this.dw = dw;
        // this.dh = dh;
        this.velocity = velocity;
        this.previousVelocity = velocity;
        this.diagonalVelocity = velocity*.7; //could instead do Math.SQRT2 but there are too many decimal positions involved
        this.previousPosition = {x: position.x, y: position.y};
        this.direction = "right"; //default value, could set to null but might mess with default rendered sprite?
        this.animationDirection = "right"
        this.animationTimer = 0;
        this.animationIndex = 0;
        this.sprite = new Sprite(spriteData_player.idle[this.direction][0], size.dw, size.dh); //tentatively replaces "COMMENT#id" line
        this.health = 100;//rough draft
        this.mana = 100;//rough draft
        this.max_mana = 100;
        
        //maybe use dot notation for default? not sure, either works.
        //this.sprite = new Sprite(spriteData_player.walk[this.direction[this.animationIndex]]);
        //COMMENT#id1 this.sprite = new Sprite(spriteData_player["stance_1"]["default"], this.size.dw, this.size.dh);

        //document.addEventListener("keydown", this.keyDownCodes);
        //document.addEventListener("keyup", this.keyUpCodes);
    }

    //deprecated and moved to gamelogic.js as new function
    // determineSprite() {
    //     if(this.direction == "left") {
    //         this.sprite.image.src = spriteData_player["left"];
    //     } else if (this.direction == "right") {
    //         this.sprite.image.src = spriteData_player["right"];
    //     } else {
    //         this.sprite.image.src == spriteData_player["default"];
    //     }
    // }



    
    //KEYCODES NOW DEPRECATED, SEE NOTE BELOW AT MOVEPLAYER() CONSTRUC
    // keyDownCodes = (e) => {
    //     if(e.keyCode == 87) {
    //         this.moveUp = true;
    //     }
    //     if(e.keyCode == 83) {
    //         this.moveDown = true;
    //     }
    //     if(e.keyCode == 65) {
    //         this.moveLeft = true;
    //     }
    //     if(e.keyCode == 68) {
    //         this.moveRight = true;
    //     }
    // }

    // keyUpCodes = (e) => {
    //     if(e.keyCode == 87) {
    //         this.moveUp = false;
    //     }
    //     if(e.keyCode == 83) {
    //         this.moveDown = false;
    //     }
    //     if(e.keyCode == 65) {
    //         this.moveLeft = false;
    //     }
    //     if(e.keyCode == 68) {
    //         this.moveRight = false;
    //     }
    // }


    setPreviousPosition() {
        this.previousPosition = new Position(this.position.x, this.position.y);
    }
    


//important: if re-implementing into code, need to call it in renderLogic.js mapHandler, because it relies on mapheight/width which are of renderlogic.js
//replaced by the new MovementAction class, using config.js, inputlogic.js, and gamelogic.js
    // movePlayer(mapWidth, mapHeight) {
        //this.velocity = 2;
        //let diagonalVelocityAdjust = this.velocity/3;   //1.33; original was velocity for diagonalVelocityAdjust 1.33
        // let isMoving = false;
    //     this.previousPosition = new Position(this.position.x, this.position.y);
    //     if(this.moveUp == true && this.position.y >= mapHeight - mapHeight) {
    //         this.position.y -=this.velocity;
    //         this.isMoving = true;
    //     }
    //     if(this.moveDown == true && this.position.y < mapHeight - this.size.dh) {
    //         this.position.y +=this.velocity;
    //     }
    //     if(this.moveLeft == true && this.position.x >= mapWidth - mapWidth) {
    //         this.position.x -=this.velocity;
    //     }
    //     if(this.moveRight == true && this.position.x < mapWidth - this.size.dw) {
    //         this.position.x +=this.velocity;
    //     }
    //     if(this.moveUp == true && this.moveRight == true) {
    //         this.position.x -= this.diagonalVelocity;
    //         this.position.y += this.diagonalVelocity;
    //     }
    //     if(this.moveUp == true && this.moveLeft == true) {
    //         this.position.x += this.diagonalVelocity;
    //         this.position.y += this.diagonalVelocity; //was diagonalvelocityadjust
    //     }
    //     if(this.moveDown == true && this.moveRight == true) {
    //         this.position.x -= this.diagonalVelocity;
    //         this.position.y -= this.diagonalVelocity;
    //     }
    //     if(this.moveDown == true && this.moveLeft == true) {
    //         this.position.x += this.diagonalVelocity;
    //         this.position.y -= this.diagonalVelocity;
    //     }
    // }

   
}