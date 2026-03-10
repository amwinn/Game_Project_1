import Action from "./Action.js";
import { Position } from "../Utility.js";


export default class MovementAction extends Action {

    static up = "up";
    static down = "down";
    static left = "left";
    static right = "right";
    constructor(direction) {
        super();
        this.direction = direction;
    }


    moveUp(character) {
        character.position.y -= character.velocity;
        character.direction = "up";
        //console.log(" is moving up");
    }

    moveDown(character) {
        character.position.y += character.velocity;
        character.direction = "down";
        //console.log(" is moving down");
        
    }

    moveLeft(character) {

        character.position.x -= character.velocity;
        character.direction = "left";
        //console.log(" is moving left");

    }

    moveRight(character) {
        character.position.x += character.velocity;
        character.direction = "right";
        //console.log(" is moving right");
    }


    process(gameLogic, character) {

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
        if(this.direction === MovementAction.up && gameLogic.withinTopBounds(character, gameLogic.mapWidth, gameLogic.mapHeight)) {
            this.moveUp(character);
        }
        else if(this.direction === MovementAction.down && gameLogic.withinBottomBounds(character, gameLogic.mapWidth, gameLogic.mapHeight)) {
            this.moveDown(character);
        }
        else if(this.direction === MovementAction.left && gameLogic.withinLeftBounds(character, gameLogic.mapWidth, gameLogic.mapHeight)) {
            this.moveLeft(character);
        }
        else if(this.direction === MovementAction.right && gameLogic.withinRightBounds(character, gameLogic.mapWidth, gameLogic.mapHeight)) {
            this.moveRight(character);
        }

    }


}