import MovementAction from "../Actions/MovementAction.js"
import ProjectileAction from "../Actions/ProjectileAction.js"


//If necessary later on, add more types and identifiers to each key, such as with the sprite map. actionType: movement, actionType: spell, etc.
export const defaultKeyBindings = {
    "KeyA": new MovementAction(MovementAction.left),
    "KeyS": new MovementAction(MovementAction.down),
    "KeyW": new MovementAction(MovementAction.up),
    "KeyD": new MovementAction(MovementAction.right),
    "click": new ProjectileAction(),
}