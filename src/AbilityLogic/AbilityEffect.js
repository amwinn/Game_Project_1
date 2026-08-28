//called in gamelogic.js in collision functions
export function applyEffects(effects, ability, inflictor, inflicted) {
    effects.forEach((effect) => {
        switch(effect.type) {
            case "damage":
                inflicted.health -= effect.amount;
                break;
            case "mana_leech":
                if("mana" in inflicted) {
                    inflicted.mana -= effect.amount;
                }
                //add to if statement && source.mana += effect.amount <= source.max_mana (could do something similar for min_mana? instead of setting to 0 as below)
                if("mana" in inflictor && (inflictor.mana + effect.amount <= inflictor.max_mana)) {
                    console.log("hasmana")
                    inflictor.mana += effect.amount;
                } else if ("mana" in inflictor && (inflictor.mana + effect.amount > inflictor.max_mana)) {
                    inflictor.mana = inflictor.max_mana;
                }
                if(inflicted.mana < 0) {
                    inflicted.mana = 0;
                }
                break;
                //in progress:
                case "slow":
                    if(inflicted.slowed !== true) {
                        inflicted.speed -=effect.amount;
                    }
                    inflicted.slowed =true; //very rough wip, change to modifiers array and add "slowed" etc.?
                break;
        }
    });
    //cylce through the effects array
    //damage
    //heal
    //eot (effect over time, hot or dot)
    //buff
    //debuff
}