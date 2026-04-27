import { inputState } from "../Input/InputState.js";
import { Position, Size, Sprite } from "../Utility.js";
import Projectile from "../AbilityEntity/Projectile.js";
import Area from "../AbilityEntity/AreaofEffect.js";
import { radialArray } from "../Main.js";

export function castAbility(ability, source, dataSet){
    let form = ability.form.type;
    switch(form) {
        case "projectile":
            castProjectile(ability, source, dataSet);
            break;
        case "radial":
            console.log(ability)
            castRadial(ability, source, dataSet)
            break;
    }
}



//is this better or worse than just putting the code inside the switch? tentative on it, can always switch back easily
function castProjectile(ability, source, dataSet) {
    const size = new Size(ability.form.data_config.radius*2, ability.form.data_config.radius*2); //change to not be hardcoded, will need to refactor tilemap to be outside of mapdb class
    const x = (dataSet.cursorData.cursor.world.x-size.dw/2) - (source.position.x + source.size.dw /2); //was originally target. source.position.x + +32, and both cursor.y and .x were -20 instead of -5, still havent fixed that portion
    const y = (dataSet.cursorData.cursor.world.y-size.dh/2) - (source.position.y + source.size.dh /2); //was originally source.position.y +50
    const angle = Math.atan2(y, x); // removed (y + camera.y, x + camera.x) and moved to const x and y values above; revert if any bug appears
    const velocity = {x: Math.cos(angle)*5, y: Math.sin(angle)*5};
    const position = new Position(source.position.x + source.size.dw /2, source.position.y + source.size.dh /2); //was +32, +50
    dataSet.projectilesArray.push(new Projectile(Projectile.playerProjectile, ability, position, size, velocity, new Sprite(ability.form.data_config.sprite, size.dw, size.dh) ));
    ability.resource.forEach((resource,index) => {
        source[resource.type] -= resource.amount;
    });
}

//not yet ready, need to remove enemyProjectile, just have projectilesArray, conform the castEntityProjectile parameters to the castProjectile
export function castEntityProjectile(array, enemy, target, ability) {
    const size = new Size(30,30);
    const angle = Math.atan2(((target.position.y + target.size.dh/5) - enemy.position.y), ((target.position.x + target.size.dw/5) - enemy.position.x)); //dw/5 and dh/5 can be adjusted as needed
    const position = new Position(enemy.position.x, enemy.position.y);
    const sprite = new Sprite("../images/magic_bolt1.png", size.dw, size.dh)
    array.push(new Projectile(Projectile.entityProjectile, ability, position, size, {x: Math.cos(angle), y:Math.sin(angle)}, sprite));
}

function castRadial(ability, source, dataSet) {
    const radius = ability.form.data_config.radius;
    const size = new Size(radius *2, radius *2);
    //const casterPosition = new Position(source.position.x, source.position.y)//trying to spawn position at middle of caster
    const sourceCenter = new Position(source.position.x + source.size.dw /2, source.position.y + source.size.dh /2);
    const radialPosition = new Position(sourceCenter.x, sourceCenter.y);//might need to redo above and current lines
    dataSet.radialArray.push(new Area(Area.radial, ability, radialPosition));
    //dataSet.projectilesArray.push(new Projectile(Projectile.playerProjectile, ability, radialPosition, size, {x:0, y:0}, new Sprite(ability.form.data_config.sprite, size.dw, size.dh)))
}


//need to resolve the issue that context is not specific enough, probably need it to be context.array?
//need to really decide if i like what im doing with the abstracted data usage,
//right now, ability.form.data_set.size.dw is a mouthful, might cause quite a few bugs if i type it out wrong, but it does allow one source of change,
//if i need to change something i really just have to go to ability_data, and change things there, so in that respect its really nice