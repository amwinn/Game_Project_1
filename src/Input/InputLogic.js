import { defaultKeyBindings } from "../Configs/KeybindingsConfig.js";
import { projectilesArray, eruptiveArray } from "../Main.js";
import MovementAction from "../Actions/MovementAction.js";
import ProjectileAction from "../Actions/ProjectileAction.js";
import AbilityAction from "../Actions/AbilityAction.js";
import { inputState } from "./InputState.js";
import { dataSet } from "../Main.js";

export const activeMovementKeys = new Set(); //perhaps move to a more centralized area?

export default class InputLogic {
    constructor(gameLogic, camera, player) {
        this.gameLogic = gameLogic;
        this.camera = camera;
        this.player = player;
        document.addEventListener("mousemove", this.executeMouseMove)
        document.addEventListener("keydown", this.executeKeyDown);
        document.addEventListener("keyup", this.executeKeyUp);
        document.addEventListener("mousedown", this.executeMouseDown);
        document.addEventListener("mouseup", this.executeMouseUp);
        /* important to note that apparently its bad practice to have the addEventListener functions in the constructor, but since its only called once i dont see an issue.
        if it becomes a problem, maybe make a create() func that holds the document.addEventListener and a destroy() func that holds document.removeEventListener */

        
    }



    //Important: 



    /*
    
    until recently, const key was = e.key, because default keybindings used "a", "s" etc., but now they use "KeyA" etc., and so this requires const key = e.code
    if changing back, must change back the default keybindings, and change the key const in executeKeyDown and executeKeyUp functions here in inputlogic
    the diagonal adjustment function in gamelogic.js must also be changed back to "w" "a" "s" "d"
    
    
    
    */

    executeMouseMove = (e) => {
        inputState.cursor.screen.x = e.clientX;
        inputState.cursor.screen.y = e.clientY;
        inputState.cursor.world.x = e.clientX + this.camera.x;
        inputState.cursor.world.y = e.clientY + this.camera.y;
        
    }
    executeKeyDown = (e) => {
        const key = e.code;//.toUpperCase();
        
        if(key in defaultKeyBindings && defaultKeyBindings[key] instanceof MovementAction) {
            activeMovementKeys.add(key);
            defaultKeyBindings[key].process(this.gameLogic, this.player);
            //console.log(key)
        }
        if(key in defaultKeyBindings && defaultKeyBindings[key] instanceof AbilityAction) {
            defaultKeyBindings[key].process(this.player, dataSet)
            //defaultKeyBindings[key].process(this.player, e, {this.camera, projectilesArray})
        }

    }

    executeMouseDown = (e) => {
        //projectile action is being slowly phased out of all code
        const key = "click";
        if(key in defaultKeyBindings && defaultKeyBindings[key] instanceof ProjectileAction) {
            defaultKeyBindings[key].process(this.player, e, this.camera)
        }
        if(key in defaultKeyBindings && defaultKeyBindings[key] instanceof AbilityAction) {
            defaultKeyBindings[key].process(this.player, dataSet)
        }
        //maybe dont need
    }

    executeMouseUp = (e) => {

    }

    executeKeyUp = (e) => {
        const key = e.code;//.toUpperCase();
        activeMovementKeys.delete(key);

    }


    executeInput(){
        //this.player.setPreviousPosition(); //has to go at top of function scope, else diagonal movement was no-clipping through objects; now inside adjustDiagonalVelocity inside gamelogic.js
        activeMovementKeys.forEach(key => {
            // console.log(key)
            defaultKeyBindings[key].process(this.gameLogic, this.player);
        })
        //this.adjustDiagonalVelocity(this.player); //now called in movementLogicUpdate() func in gamelogic.js
    }

}