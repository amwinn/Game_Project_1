import Modifier from "../AbilityEntity/Modifier.js";
//called in gamelogic.js in collision functions
//to clarify, effects is called effect in the spell data, therefor when this func is called in gamelogic.js the first param is (ability.effect), not (ability.effects)
export function applyEffects(effects, ability, inflictor, inflicted) {
    effects.forEach((effect) => {
        switch(effect.type) {
            case "damage":
                inflicted.health -= effect.amount;
                break;
            case "mana_leech":
                if("mana" in inflicted) {
                    inflicted.mana -= effect.amount;
                }
                //add to if statement && source.mana += effect.amount <= source.max_mana (could do something similar for min_mana? instead of setting to 0 as below)
                if("mana" in inflictor && (inflictor.mana + effect.amount <= inflictor.max_mana)) {
                    //console.log("hasmana")
                    inflictor.mana += effect.amount;
                } else if ("mana" in inflictor && (inflictor.mana + effect.amount > inflictor.max_mana)) {
                    inflictor.mana = inflictor.max_mana;
                }
                if(inflicted.mana < 0) {
                    inflicted.mana = 0;
                }
                break;
                //in progress:
                case "fast":
                    if (inflicted.modifiers) {
                        inflicted.modifiers.push(new Modifier(effect, inflictor, inflicted, ability)); //IMPORTANT effect is an object, not just "slow", slow is the effect object's value for the type key {type:"slow"}
                    }
                    break;
                case "slow":
                    if (inflicted.modifiers && inflicted.slowed !== true ) {
                        inflicted.modifiers.push(new Modifier(effect, inflictor, inflicted, ability)); //IMPORTANT effect is an object, not just "slow", slow is the effect object's value for the type key {type:"slow"}
                        inflicted.speed = setSpeed(inflicted);
                    }
                    //inflicted.speed = setSpeed(inflicted); //move once logic is solidified, to somewhere that is onyl called when a modifier is added or removed.
                    // if(!inflicted.slowed) {
                    //     inflicted.speed -=effect.amount;
                    // }
                    inflicted.slowed =true; //very rough wip, change to modifiers array and add "slowed" etc.?
                break;
                case "knockback":
                    //code taken from my gamelogic.js entityCollisionResolution and tweaked to only adjust one entity; if making improvements there, maybe tweak this again
                    if(ability.position.x === inflicted.position.x) {
                        inflicted.position.x -= effect.amount;
                    }

                    if(ability.position.x >= inflicted.position.x) {
                        inflicted.position.x -= effect.amount;
                    }
                    if(inflicted.position.x >= ability.position.x) {
                        inflicted.position.x += effect.amount;
                    }

                    if(ability.position.y >= inflicted.position.y) {
                        inflicted.position.y -= effect.amount;
                    }
                    if(inflicted.position.y >= ability.position.y) {
                        inflicted.position.y += effect.amount;
                    }
                    
                    // inflicted.position.x += (inflicted.velocity.x + effect.amount);
                    // inflicted.position.y += (inflicted.velocity.y + effect.amount);
                    break;
                    case "stun":
                        if(inflicted.modifiers) {
                            inflicted.modifiers.push(new Modifier(effect, inflictor, inflicted, ability));
                            inflicted.speed = setSpeed(inflicted);
                        }
                        break;
        } 
    }); 
    //cylce through the effects array
    //damage
    //heal
    //eot (effect over time, hot or dot)
    //buff
    //debuff
}

//removes old ones?
export function updateModifiers(entity) {
    for(const modifier of entity.modifiers) {
        modifier.update();
        if(modifier.delete) {
            entity.modifiers.splice(modifier);
        }
    }
}

//only handles duplicate effects perhaps
export function coordinateModifiers(entity) {
    for(const modifier of entity.modifiers) {

    }

}

export function setSpeed(entity) {
    entity.speed = entity.base_speed;
    for(const modifier of entity.modifiers) {
        switch(modifier.effect.type) {
            case "slow":
                entity.speed -= modifier.amount;
                break;
            case "fast":
                entity.speed += modifier.amount;
                break;
            case "stun":
                entity.speed = 0;
                break;
        }
        // if(modifier.effect.type === "slow") {
        //     entity.speed -= modifier.amount;
        // }
        // if(modifier.effect.type === "fast") {
        //     entity.speed += modifier.amount;
        // }
    }
    return entity.speed;

}

//import modifier arrays here perhaps, and apply effects here? so calculations go here. modifier just handles the lifetime of the buffs/debuffs, not the -= amount etc.