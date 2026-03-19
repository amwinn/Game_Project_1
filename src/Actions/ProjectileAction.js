import Action from "./Action.js";
import { Position, Size } from "../Utility.js";
import { projectilesArray } from "../Main.js";
import Projectile from "../Projectile.js";


export default class ProjectileAction extends Action {
    constructor() {
        super();
    }


//important note regarding the role of the camera: 
//w/o the camera the player is shooting the projectiles at the monitor's position (the starting viewport at 0,0), while the player is technically far off the screen by this point
//not 100% happy with this yet, due to camera coupling, harcodinged numbers for clientx/y + number, nad for positionx/y + number
    process(source, destination, camera) {
        const x = (destination.clientX-20) - (source.position.x + 32);
        const y = (destination.clientY-20) - (source.position.y + 50);
        const angle = Math.atan2(y + camera.y, x + camera.x);
        const velocity = {x: Math.cos(angle)*3, y: Math.sin(angle)*3};
        const size = new Size(30,30);
        const position = new Position(source.position.x + 32, source.position.y +50);
        projectilesArray.push(new Projectile(Projectile.playerProjectile, position, size, velocity));


    }

/*
..................................................................................................................................

psuedo


constructor type
caster (can be player or entity)
type.data? then in config.js have projectile.data, or spellbolt.data object
spellbolt.data could hold sprite, damage, speed, etc


..................................................................................................................................
*/
}