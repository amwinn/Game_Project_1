export function applyRenewal(recipient, inflictor, effect, abilityEntity, abilityData) {
    const renewal = calculateRenewal(recipient, inflictor, effect, abilityEntity, abilityData);
    recipient.stats[effect.sub_type].current += renewal;
}

export function calculateRenewal(recipient, inflictor, effect, abilityEntity, abilityData) {
    const healCategory = effect?.damage_type?.category ?? abilityData.damage_type.category; //refactor damage_type to be agnostic
    const healtype = effect?.damage_type?.type ?? abilityData.damage_type.type; //refactor damage_type to be agnostic
    const defense = recipient.defenses[healCategory][healtype];
    const renewal = effect.amount - defense;
    //not sure if i want -defense or not, adding for now, can easily remove, thinking is that a fire-affinitive mage (fire mage) might have built up resistance to fire even heals
    return renewal;

}