//types: "mana_drain" "mana_funnel" etc.

// instead of mana_drain = "mana_drain", could have just mana, stamina, health, then behavior drain and funnel
export default class EffectOverTime {
    // static MANA_DRAIN = "mana_drain";
    // static HEALTH_DRAIN = "health_drain";
    // static STAMINA_DRAIN = "stamina_drain";
    constructor(effect, inflictor, inflicted, ability) {
        this.effect = effect;
        this.inflictor = inflictor;
        this.inflicted = inflicted;
        this.ability = ability;
        this.amount = effect?.amount ?? null;
        this.duration = effect?.duration ?? null;
        this.durationTimer = 0;
        this.durationRemaining = 0;
        this.ticks = effect?.ticks ?? null;
        this.tickTimer = 0;
        this.tickSpacing = this.duration / this.ticks; //then in update this.tickSpacing = this.duration / this.ticks;
        this.ticksRemaining = this.ticks;
        //maybe add active as a safety net incase it doesnt delete properly?
    }

    update(deltaTime) {
        this.durationRemaining = this.duration - this.durationTimer;
        //this.tickSpacing = this.duration / this.ticks;
        this.durationTimer += deltaTime;
        this.tickTimer += deltaTime;
        if(this.durationRemaining <= 0) {
            this.delete = true;
            return;
            //this.active = false; only add if adding this.active as a prop
        }
        //the below if originally had && durationRemaining >0
        if(this.tickTimer >= this.tickSpacing && this.ticksRemaining >0 ) {
            applyEffectOverTime(this.effect, this.inflicted, this.inflictor, this.ability);
            this.ticksRemaining--;
            this.tickTimer-=this.tickSpacing;
        }

    }


}

export function applyEffectOverTime(effect, inflicted, inflictor, ability) {
    switch(effect.type) {
        case "drain":
            applyDrainTick(effect, inflicted, inflictor, ability);
            break;
        case "funnel":
            applyFunnelTick(effect, inflicted, inflictor, ability);
            break;
    }
}

function applyDrainTick(effect, inflicted, inflictor, ability){
    if(effect.subType in inflicted && inflicted[effect.subType] >0+effect.amount) {
        console.log(inflicted.mana)
        inflicted[effect.subType] -= effect.amount;
    }
    if(effect.subType in inflictor && inflictor[effect.subType] < 100-effect.amount) {
        inflictor[effect.subType] += effect.amount;
    }
}

function applyFunnelTick(effect, inflicted, inflictor, ability) {
    if(effect.subType in inflicted && inflicted[effect.subType] <100-effect.amount) {
        inflicted[effect.subType] += effect.amount;
    }
    if(effect.subType in inflictor && inflicted[effect.subType] >0+effect.amount) {
        inflictor[effect.subType] -= effect.amount;
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


//plan:
//tick amount static
//tick interval or durationTimer can be sped up depending on haste or int or something akin to this
//in other words duration will be affected by stats, but tick amount will always be as declared