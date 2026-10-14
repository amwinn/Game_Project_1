export function returnSpeed(entity) {
    let fastComponent = 1;
    let slowComponent = 0;
    let stunComponent = 1;
    for(const modifier of entity.modifiers) {
        if(modifier.active === true) {
            switch(modifier.effect.type) {
                case "slow":
                    slowComponent = modifier.effect.amount;
                    break;
                case "fast":
                    fastComponent = modifier.effect.amount;
                    break;
                case "stun":
                    stunComponent = 0;
                    console.log("STUN OVERRIDE")
                    break;
            }
        }
    }
    entity.speed = 1*((fastComponent-slowComponent)*stunComponent);
    return entity.speed;
}