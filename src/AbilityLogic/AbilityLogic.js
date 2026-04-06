import { inputState } from "../Input/InputState.js";
import { Position, Size } from "../Utility.js";
import Projectile from "../Projectile.js";
export function castAbility(ability, source, input, context){
    let form = ability.form.type;
    switch(form) {
        case "projectile":
            const size = new Size(30,30); //change to not be hardcoded, will need to refactor tilemap to be outside of mapdb class
            const x = (inputState.cursor.world.x-size.dw/2) - (source.position.x + source.size.dw /2); //was originally target. source.position.x + +32, and both cursor.y and .x were -20 instead of -5, still havent fixed that portion
            const y = (inputState.cursor.world.y-size.dh/2) - (source.position.y + source.size.dh /2); //was originally source.position.y +50
            const angle = Math.atan2(y, x); // removed (y + camera.y, x + camera.x) and moved to const x and y values above; revert if any bug appears
            const velocity = {x: Math.cos(angle)*5, y: Math.sin(angle)*5};
            const position = new Position(source.position.x + source.size.dw /2, source.position.y + source.size.dh /2); //was +32, +50
            context.push(new Projectile(Projectile.playerProjectile, position, size, velocity));
            break;
        case "radial":
            console.log(ability)
            break;
    }
}


//need to resolve the issue that context is not specific enough, probably need it to be context.array?