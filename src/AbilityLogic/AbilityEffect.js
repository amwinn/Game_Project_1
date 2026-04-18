export function applyEffects(effects, target) {
    effects.forEach((effect) => {
        switch(effect.type) {
            case "damage":
                target.health -= effect.amount;
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