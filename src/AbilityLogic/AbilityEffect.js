export function applyEffects(effects, target, source) {
    effects.forEach((effect) => {
        switch(effect.type) {
            case "damage":
                target.health -= effect.amount;
                break;
            case "mana_leech":
                if("mana" in target) {
                    target.mana -= effect.amount;
                }
                //add to if statement && source.mana += effect.amount <= source.max_mana (could do something similar for min_mana? instead of setting to 0 as below)
                if("mana" in source) {
                    console.log("hasmana")
                    source.mana += effect.amount;
                }
                if(target.mana < 0) {
                    target.mana = 0;
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