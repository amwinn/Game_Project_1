import { Position, Size, Sprite } from "../Utility.js";
export default class Area {
    static cone = "cone";
    static radius = "radius";
    constructor(type, ability, position, size, velocity, sprite) {
        this.type = type;
        this.ability = ability;
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.sprite = new Sprite();
    }


    renderAreaOfEffect(camera, renderer) {
        renderer.drawImage(this.sprite.image, this.position.x - camera.x, this.position.y - camera.y, this.size.dw, this.size.dh)
    }

    scale(ability, scale) {
        //size * ability.form.scale / 2 or something such as this, /2 to stop it from being too drastic? or simply make the scale 1, 1.25, 1.5, 2, etc., instead of 1, 5, 10 etc.
    }


}