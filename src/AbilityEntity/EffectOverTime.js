import { applyDamage } from "../AbilityLogic/Damage.js";

//types: "mana_drain" "mana_funnel" etc.

// instead of mana_drain = "mana_drain", could have just mana, stamina, health, then behavior drain and funnel
export default class EffectOverTime {
    // static MANA_DRAIN = "mana_drain";
    // static HEALTH_DRAIN = "health_drain";
    // static STAMINA_DRAIN = "stamina_drain";
    constructor(effect, inflictor, inflicted, abilityEntity, abilityData) {
        this.effect = effect;
        this.inflictor = inflictor;
        this.inflicted = inflicted;
        this.abilityEntity = abilityEntity;
        this.abilityData = abilityData;
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
            applyEffectOverTime(this.effect, this.inflicted, this.inflictor, this.abilityEntity, this.abilityData);
            this.ticksRemaining--;
            this.tickTimer-=this.tickSpacing;
        }

    }


}

export function applyEffectOverTime(effect, inflicted, inflictor, abilityEntity, abilityData) {
    switch(effect.type) {
        case "drain":
            applyDrainTick(effect, inflicted, inflictor, abilityEntity, abilityData);
            break;
        case "funnel":
            applyFunnelTick(effect, inflicted, inflictor, abilityEntity, abilityData);
            break;
    }
}

function applyDrainTick(effect, inflicted, inflictor, abilityEntity, abilityData){
    if(inflicted.stats[effect.sub_type] ) { //&& inflicted.stats[effect.sub_type].current - effect.amount >= inflicted.stats[effect.sub_type].min
        //console.log(inflicted.stats[effect.sub_type].current)
        //console.log(abilityData.damage_type)
        //inflicted.stats[effect.sub_type].current -= effect.amount;
        //console.log(inflicted.stats[effect.sub_type].current)
        //inflicted.stats[effect.sub_type].current = applyDamage(inflicted, inflictor, effect, abilityEntity, abilityData, inflicted.stats[effect.sub_type].current);
        applyDamage(inflicted, inflictor, effect, abilityEntity, abilityData);
        if(inflicted.stats[effect.sub_type].current < inflicted.stats[effect.sub_type].min) {
            inflicted.stats[effect.sub_type].current = 0;
        }

        //console.log(inflicted.stats[effect.sub_type].current)
    }
    if(inflictor.stats[effect.sub_type] ) { //&& inflictor.stats[effect.sub_type].current + effect.amount <= inflictor.stats[effect.sub_type].max
        inflictor.stats[effect.sub_type].current += effect.amount;
        if(inflictor.stats[effect.sub_type].current > inflictor.stats[effect.sub_type].max) {
            inflictor.stats[effect.sub_type].current = inflictor.stats[effect.sub_type].max;
        }
    }
}

function applyFunnelTick(effect, inflicted, inflictor, abilityEntity, abilityData) {
    if(inflicted.stats[effect.sub_type] && inflictor.stats[effect.sub_type] ) { //&& inflicted.stats[effect.sub_type].current + effect.amount <= inflicted.stats[effect.sub_type].max
        inflicted.stats[effect.sub_type].current += effect.amount;
        if(inflicted.stats[effect.sub_type].current > inflicted.stats[effect.sub_type].max) {
            inflicted.stats[effect.sub_type].current = inflicted.stats[effect.sub_type].max;
        }
    }
    if(inflictor.stats[effect.sub_type] && inflicted.stats[effect.sub_type] ) { //&& inflictor.stats[effect.sub_type].current - effect.amount >= inflictor.stats[effect.sub_type].min
        //inflictor.stats[effect.sub_type].current -= effect.amount;
        applyDamage(inflictor, inflicted, effect, abilityEntity, abilityData); //NOTE that inflictor and inflicted are swapped in the param args b/c inflictor is taking the damage
        if(inflictor.stats[effect.sub_type].current < inflictor.stats[effect.sub_type].min) {
            inflictor.stats[effect.sub_type].current = inflictor.stats[effect.sub_type].min;
        }
        console.log(inflictor.stats[effect.sub_type].current)
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