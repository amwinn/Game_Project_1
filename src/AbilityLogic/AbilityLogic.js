import { inputState } from "../Input/InputState.js";
import { Position, Size, Sprite } from "../Utility.js";
import Projectile from "../Projectile.js";
export function castAbility(ability, source, dataSet){
    let form = ability.form.type;
    switch(form) {
        case "projectile":
            castProjectile(ability, source, dataSet);
            break;
        case "radial":
            console.log(ability)
            break;
    }
}



//is this better or worse than just putting the code inside the switch? tentative on it, can always switch back easily
function castProjectile(ability, source, dataSet) {
    const size = new Size(ability.form.data_config.size.dw, ability.form.data_config.size.dh); //change to not be hardcoded, will need to refactor tilemap to be outside of mapdb class
    const x = (dataSet.cursorData.cursor.world.x-size.dw/2) - (source.position.x + source.size.dw /2); //was originally target. source.position.x + +32, and both cursor.y and .x were -20 instead of -5, still havent fixed that portion
    const y = (dataSet.cursorData.cursor.world.y-size.dh/2) - (source.position.y + source.size.dh /2); //was originally source.position.y +50
    const angle = Math.atan2(y, x); // removed (y + camera.y, x + camera.x) and moved to const x and y values above; revert if any bug appears
    const velocity = {x: Math.cos(angle)*5, y: Math.sin(angle)*5};
    const position = new Position(source.position.x + source.size.dw /2, source.position.y + source.size.dh /2); //was +32, +50
    dataSet.projectilesArray.push(new Projectile(Projectile.playerProjectile, position, size, velocity, new Sprite(ability.form.data_config.sprite, ability.form.data_config.size.dw, ability.form.data_config.size.dh) ));
}


//need to resolve the issue that context is not specific enough, probably need it to be context.array?
//need to really decide if i like what im doing with the abstracted data usage,
//right now, ability.form.data_set.size.dw is a mouthful, might cause quite a few bugs if i type it out wrong, but it does allow one source of change,
//if i need to change something i really just have to go to ability_data, and change things there, so in that respect its really nice