import Action from "./Action.js";
import { Position } from "../Utility.js";
import { withinBottomBounds, withinLeftBounds, withinRightBounds, withinTopBounds } from "../GameLogic/MovementLogic.js";

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


    process(gameLogic, character, deltaTime) {

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
        }
        else if(this.direction === MovementAction.down && withinBottomBounds(character)) { //was gamelogic.withinXbounds(char, gamelogic.mapw, gamelogic.maph)
            this.moveDown(character, deltaTime);
        }
        else if(this.direction === MovementAction.left && withinLeftBounds(character)) { //was gamelogic.withinXbounds(char, gamelogic.mapw, gamelogic.maph)
            this.moveLeft(character, deltaTime);
        }
        else if(this.direction === MovementAction.right && withinRightBounds(character)) { //was gamelogic.withinXbounds(char, gamelogic.mapw, gamelogic.maph)
            this.moveRight(character, deltaTime);
        }

    }


}