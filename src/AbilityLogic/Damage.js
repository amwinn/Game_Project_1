
export function applyDamage(inflicted, inflictor, effect, ability, damageType) {

}

export function calculateDamage(inflicted, inflictor, effect, ability, damageType) {
    
}

//all pseudo brainstorm phase, might not even need both functions
//start with easy formula, damagetype checks against damagetype defense on the inflicted
//example if(inflicted.defense.damagetype) {damage = damage - inflicted.defense.damagetype}
//no need to add weapon stuff yet such as weapon damage, can adda  base defense though that mitigates physical damage
//eventually will need to figure out all the different formula components, so damage types, defense types, modifiers, weapons, items, resistences, immunities, etc.
//maybe categorize the above list into sections such as damage, modifiers, items (weps and armor), resist maybe just add to defense
//actually, most of above could also factor into the defense; mods, items, resist can all change the value of the defense value, makes the damage calc easier
// pseudo:
// calculateDamage() {
//     damage = 
//     damage - defense.damageType
//     misc logic here for handling immunities (first though is make immune a multiplier value of either 1 or 0, and each defense type can have an immune key, so defense.fire.immune = true;
// }
//have min damage of 1?