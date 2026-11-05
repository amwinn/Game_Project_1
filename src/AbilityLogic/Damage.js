
export function applyDamage(inflicted, inflictor, effect, abilityEntity, abilityData) {
    const damage = calculateDamage(inflicted, inflictor, effect,abilityEntity, abilityData);
    console.log(damage)
    inflicted.stats[effect.sub_type].current -= damage;
    //return resource;
}

export function calculateDamage(inflicted, inflictor, effect, abilityEntity, abilityData) {
    //console.log(abilityData)
    const damageCategory = effect?.damage_type?.category ?? abilityData.damage_type.category;
    const damageType = effect?.damage_type?.type ?? abilityData.damage_type.type;
    //console.log(damageCategory)
    const defense = inflicted.defenses[damageCategory][damageType];
    const damage = effect.amount - defense; //simple subtraction formula for testing
    //calcs go here eventually

    return damage;
    
}


//have min damage of 1?

//if using subtractive/additive, make sure defense cant allow inflicted to be immune to damage