import { returnSpeed } from "../GameLogic/MovementLogic.js";

export function assignActiveness(entity, newModifier) {
    for(const modifier of entity.modifiers) {
        if(modifier === newModifier) {
            continue; //mainly for updateActiveness() to not check agains itself
        }
        if(modifier.effect.type !== newModifier.effect.type) {
            console.log("different type")
            continue;
        }
        console.log(modifier.durationRemaining, newModifier.durationRemaining)
        if(modifier.amount > newModifier.amount) {
            newModifier.active = false;
            console.log("inactive by amount")
            return;
        }
        if(modifier.amount === newModifier.amount) {
            console.log("here")
            if(newModifier.durationRemaining <= modifier.durationRemaining) {
                newModifier.active = false;
                console.log("decided upon by duration")
                return;
            }
        }
    }
    console.log("its active:", newModifier.effect.type)
    newModifier.active = true;
}


export function updateActiveness(entity) {
    for(const modifier of entity.modifiers) {
        modifier.active = false;
    }
    for(const modifier of entity.modifiers) {
        assignActiveness(entity, modifier);
    }
    entity.speed = returnSpeed(entity);
}

export function updateModifiers(entity) {
    for(let i = 0; i < entity.modifiers.length; i++) {
        entity.modifiers[i].update();
        if(entity.modifiers[i].delete) {
            entity.modifiers.splice(i, 1);
            updateActiveness(entity);
        }
    }
    entity.speed = returnSpeed(entity);
}