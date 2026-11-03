export function applyRenewal(inflicted, inflictor, effect, abilityEntity, abilityData) {
    const renewal = calculateRenewal(inflicted, inflictor, effect, abilityEntity, abilityData);
    inflicted.stats[effect.sub_type].current += renewal;
}

export function calculateRenewal(inflicted, inflictor, effect, abilityEntity, abilityData) {

}