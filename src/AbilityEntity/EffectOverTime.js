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
        this.tickSpacing = 0; //then in update this.tickSpacing = this.duration / this.ticks;
        this.ticksRemaining = this.ticks;
        //maybe add active as a safety net incase it doesnt delete properly?
    }

    update() {
        this.durationRemaining = this.duration - this.durationTimer;
        this.tickSpacing = this.duration / this.ticks;
        this.durationTimer ++;
        this.tickTimer ++;
        if(this.durationRemaining <= 0) {
            this.delete = true;
            //this.active = false; only add if adding this.active as a prop
        }
        if(this.tickTimer >= this.tickSpacing && this.durationRemaining >0 && this.ticksRemaining >0 ) {
            applyEffectOverTime(this.effect, this.inflicted, this.inflictor, this.ability);
            this.ticksRemaining--;
            console.log("applying")
        }

    }


}

//maybe type and behavior gall under the effect array such as {type: "effectOverTime" subtype: "mana" behavior "drain"}
//or make type "drain" "funnel", and then a focus: "mana", "stamina", health" etc.
export function applyEffectOverTime(effect, inflicted, inflictor, ability) {
    switch(effect.type) {
        case "drain":
            applyDrainTick(effect, inflicted, inflictor, ability);
            break;
        case "funnel":
            applyFunnelTick(effect, inflicted, inflictor, ability)
    }
    //switch behavior, then for each case call a drainOvertime() or funnelOverTime() function
}

function applyDrainTick(effect, inflicted, inflictor, ability){
    if(effect.subType in inflicted && inflicted[effect.subType] >0+effect.amount) {
        console.log(inflicted.mana)
        inflicted[effect.subType] -= effect.amount/10;
    }
    if(effect.subType in inflictor && inflictor[effect.subType] < 100-effect.amount) {
        inflictor[effect.subType] += effect.amount/10;
    }
}

function applyFunnelTick(effect, inflicted, inflictor, ability) {
    if(effect.subType in inflicted && inflicted[effect.subType] <100-effect.amount) {
        inflicted[effect.subType] += effect.amount/10;
    }
    if(effect.subType in inflictor && inflicted[effect.subType] >0+effect.amount) {
        inflictor[effect.subType] -= effect.amount/10;
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