import { defaultKeyBindings } from "./Configs/KeybindingsConfig.js";
import MovementAction from "./Actions/MovementAction.js";
import ProjectileAction from "./Actions/ProjectileAction.js";

export const activeMovementKeys = new Set(); //perhaps move to a more centralized area?

export default class InputLogic {
    constructor(gameLogic, camera, player) {
        this.gameLogic = gameLogic;
        this.camera = camera;
        this.player = player;
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


    executeKeyDown = (e) => {
        const key = e.code;//.toUpperCase();
        
        if(key in defaultKeyBindings && defaultKeyBindings[key] instanceof MovementAction) {
            activeMovementKeys.add(key);
            defaultKeyBindings[key].process(this.gameLogic, this.player);
            //console.log(key)
        }

    }

    executeMouseDown = (e) => {
        const key = "click";
        if(key in defaultKeyBindings && defaultKeyBindings[key] instanceof ProjectileAction) {
            defaultKeyBindings[key].process(this.player, e, this.camera)
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