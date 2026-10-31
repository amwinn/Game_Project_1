import AbilityAction from "../Actions/AbilityAction.js"
import MovementAction from "../Actions/MovementAction.js"
import ProjectileAction from "../Actions/ProjectileAction.js"
import { ability_repository } from "../../data/ability_data/ability_repository.js"


//If necessary later on, add more types and identifiers to each key, such as with the sprite map. actionType: movement, actionType: spell, etc.
export const defaultKeyBindings = {
    "KeyA": new MovementAction(MovementAction.left),
    "KeyS": new MovementAction(MovementAction.down),
    "KeyW": new MovementAction(MovementAction.up),
    "KeyD": new MovementAction(MovementAction.right),
    "click": new AbilityAction(ability_repository.simple_magic["spellbolt"]), // was new ProjectileAction() - slowly being phased out as AbilityAction is introduced in the code
    "KeyE": new AbilityAction(ability_repository.frost["frostbolt"]),
    "KeyQ": new AbilityAction(ability_repository.simple_magic["spellnova"]),
    "KeyT": new AbilityAction(ability_repository.simple_magic["spellblast"])
}