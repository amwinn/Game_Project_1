//types: "mana_drain" "mana_funnel" etc.

// instead of mana_drain = "mana_drain", could have just mana, stamina, health, then behavior drain and funnel
export default class EffectOverTime {
    static MANA_DRAIN = "mana_drain";
    static HEALTH_DRAIN = "health_drain";
    static STAMINA_DRAIN = "stamina_drain";
    constructor(effect, inflictor, inflicted, ability) {
        this.effect = effect;
        this.inflictor = inflictor;
        this.inflicted = inflicted;
        this.ability = ability;
        //duration
        //durationTimer
        //tickInterval
    }
}

//first draft:
//here or elsewhere, make a dealEffectOverTime
//one primary function, effectOverTime(type,behavior, other params)
//two secondary functions, funnelOverTime, drainOverTime
//type is something such as health, mana, stamina
//behavior is funnel, drain, etc.
//probably move functions elsewhere once fleshed out
//mostly keep the updateEffectOverTime() function here, update duration, tick, timers, update state etc
//inside the drainOverTime, could have a calculate/returnDamage or calculate/returnAmount
//that is shared between funnel and drain