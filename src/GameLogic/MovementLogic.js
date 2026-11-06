import { activeMovementKeys } from "../Input/InputLogic.js";

/*
..................................................................................................................................

            Movement Logic

..................................................................................................................................
*/


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
                    break;
            }
        }
    }
    entity.speed = 1*((fastComponent-slowComponent)*stunComponent);
    return entity.speed;
}


export function movementLogicUpdate(player) {
    adjustDiagonalVelocity(player);
        
}
//this will need to be changed to be more abstract in that it will have to take in whatever keys are assigned to movement
//perhaps something like activeMovementKeys.has(defaultKeyBindings.up.key) which wouldnt work but just a thought
function adjustDiagonalVelocity(player){
    player.setPreviousPosition(); 
    const isDiagonal = (
        (activeMovementKeys.has("KeyW") && activeMovementKeys.has("KeyD")) ||
        (activeMovementKeys.has("KeyW") && activeMovementKeys.has("KeyA")) ||
        (activeMovementKeys.has("KeyS") && activeMovementKeys.has("KeyD")) ||
        (activeMovementKeys.has("KeyS") && activeMovementKeys.has("KeyA")) 
    );

    const hasConflictingDirections = (
        (activeMovementKeys.has("KeyW") && activeMovementKeys.has("KeyS")) ||
        (activeMovementKeys.has("KeyA") && activeMovementKeys.has("KeyD"))
    );
    //console.log(player.velocity, player.diagonalVelocity)
    
    if(isDiagonal) {
        player.velocity = player.diagonalVelocity;
    } else if(hasConflictingDirections) {
        player.velocity =0;
    } else {
        player.velocity = player.previousVelocity;
    }

}





/*
..................................................................................................................................

            End Movement Logic

..................................................................................................................................
*/