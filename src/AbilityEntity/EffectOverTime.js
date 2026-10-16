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
        this.duration = ability?.duration ?? null;
        this.durationTimer = 0;
        this.durationRemaining = 0;
        //tickAmount?
        //amount?
        //durationTimer
        //tickInterval
        //maybe add active as a safety net incase it doesnt delete properly?
    }

    update() {
        this.durationRemaining = this.duration - this.durationTimer;
        this.durationTimer ++;
        if(this.durationRemaining <= 0) {
            this.delete = true;
            //this.active = false; only add if adding this.active as a prop
        }

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