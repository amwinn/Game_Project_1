//called in gamelogic.js in collision functions
export function applyEffects(effects, inflictor, inflicted) {
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
        }
    });
    //cylce through the effects array
    //damage
    //heal
    //eot (effect over time, hot or dot)
    //buff
    //debuff
}