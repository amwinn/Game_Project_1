import Action from "./Action.js";
import { Position } from "../Utility.js";
import { withinBottomBounds, withinLeftBounds, withinRightBounds, withinTopBounds } from "../GameLogic/MovementLogic.js";
import { gameObjectMasterArray } from "../Main.js";

export default class MovementAction extends Action {

    static up = "up";
    static down = "down";
    static left = "left";
    static right = "right";
    constructor(direction) {
        super();
        this.direction = direction;
    }


    moveUp(character, deltaTime) {
        character.position.y -= character.velocity * character.speed *deltaTime;
        character.direction = "up";
        //console.log(" is moving up");
    }

    moveDown(character, deltaTime) {
        character.position.y += character.velocity * character.speed *deltaTime;
        character.direction = "down";
        //console.log(" is moving down");
        
    }

    moveLeft(character, deltaTime) {
        character.position.x -= character.velocity * character.speed *deltaTime;
        character.direction = "left";
        character.animationDirection = "left";
        //console.log(" is moving left");

    }

    moveRight(character, deltaTime) {
        character.position.x += character.velocity * character.speed *deltaTime;
        character.direction = "right";
        character.animationDirection = "right";

        //console.log(" is moving right");
    }

    playerObjectCollision(player, gameObjectMasterArray) {
        gameObjectMasterArray.forEach((objectArray) => {
            objectArray.forEach((object, objectIndex) => {
                if(
                    player.position.x  + player.size.dw/3  > object.position.x &&  
                    player.position.x   < object.position.x + object.size.dw /1.5 && 
                    player.position.y + player.size.dh/1.3 > object.position.y && 
                    player.position.y   < object.position.y + object.size.dh/1.5 
                ) { 
                    switch(player.direction) {
                        case "up":
                            player.position.y = player.previousPosition.y;
                            break;
                        case "down":
                        player.position.y = player.previousPosition.y;
                            break;
                        case "left":
                        player.position.x = player.previousPosition.x;
                            break;
                        case "right":
                        player.position.x = player.previousPosition.x;
                            break;

                    }
                } 
            });
    
        });
    }


    process(gameLogic, character, deltaTime) {
        //character.setPreviousPosition();
        //console.log(gameLogic.isInBounds(character, gameLogic.mapWidth, gameLogic.mapHeight))
        //console.log(character.direction)
        // character.previousPosition.x = character.position.x;
        // character.previousPosition.y = character.position.y;
        //console.log(character.direction);
        // switch(this.direction) {
        //     case (MovementAction.up && gameLogic.isInBounds(character, gameLogic.mapWidth, gameLogic.mapHeight)): this.moveUp(character); break;
        //     case MovementAction.down: this.moveDown(character); break;
        //     case MovementAction.left: this.moveLeft(character); break;
        //     case MovementAction.right: this.moveRight(character); break;
        // }
        //MUST BE THIS.DIRECTION, NOT CHARACTER.DIRECTION, CHAR IS NOT INSTANCE OF CLASS, THIS. IS THE TEMPLATE FOR INSTANCE, THE PLACEHOLDER.
        if(this.direction === MovementAction.up && withinTopBounds(character)) { //was gamelogic.withinXbounds(char, gamelogic.mapw, gamelogic.maph)
            this.moveUp(character, deltaTime);
            if(this.playerObjectCollision(character, gameObjectMasterArray)) {
                character.position.y = character.previousPosition.y;
            }
        }
        else if(this.direction === MovementAction.down && withinBottomBounds(character)) { //was gamelogic.withinXbounds(char, gamelogic.mapw, gamelogic.maph)
            this.moveDown(character, deltaTime);
            if(this.playerObjectCollision(character, gameObjectMasterArray)) {
                character.position.y = character.previousPosition.y;
            }
        }
        else if(this.direction === MovementAction.left && withinLeftBounds(character)) { //was gamelogic.withinXbounds(char, gamelogic.mapw, gamelogic.maph)
            this.moveLeft(character, deltaTime);
            if(this.playerObjectCollision(character, gameObjectMasterArray)) {
                console.log(character.position.x, character.previousPosition.x)
                character.position.x = character.previousPosition.x;
            }
        }
        else if(this.direction === MovementAction.right && withinRightBounds(character)) { //was gamelogic.withinXbounds(char, gamelogic.mapw, gamelogic.maph)
            this.moveRight(character, deltaTime);
            if(this.playerObjectCollision(character, gameObjectMasterArray)) {
                character.position.x = character.previousPosition.x;
            }
        }

    }


}




