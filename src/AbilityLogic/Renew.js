export function applyRenewal(inflicted, inflictor, effect, abilityEntity, abilityData) {
    const renewal = calculateRenewal(inflicted, inflictor, effect, abilityEntity, abilityData);
    inflicted.stats[effect.sub_type].current += renewal;
}

export function calculateRenewal(inflicted, inflictor, effect, abilityEntity, abilityData) {
    const healCategory = effect?.damage_type?.category ?? abilityData.damage_type.category; //refactor damage_type to be agnostic
    const healtype = effect?.damage_type?.type ?? abilityData.damage_type.type; //refactor damage_type to be agnostic
    const defense = inflicted[healCategory][healtype];
    const renewal = effect.amount - defense;
    return renewal;

}