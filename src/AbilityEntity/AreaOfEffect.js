import { Position, Size, Sprite } from "../Utility.js";
export default class Area {
    static conal = "conal";
    static radial = "radial";
    constructor(type, ability, position) {
        this.type = type;
        this.ability = ability;
        this.position = position;
        //this.velocity = velocity;
        this.radius = ability.form.data_config.radius;
        this.diameter = this.radius *2;
        this.size = new Size(this.diameter, this.diameter);

        this.animationIndex = 0;
        this.animationDuration = ability.form.data_config.animationDuration || 0;
        this.sprite = new Sprite(ability.form.data_config.sprite[this.animationIndex], this.diameter, this.diameter);
    }

    //IMPORTANT, DETERMINE IF I NEED SIZE AND RADIUS, OR ONE OR THE OTHER
    //Probably size for sprite image, radius for collision related code

    renderAreaOfEffect(renderer, camera) {
        renderer.drawImage(this.sprite.image, this.position.x - camera.x - this.radius, this.position.y - camera.y - this.radius, this.size.dw, this.size.dh);
    }

    setScale(ability, scale) {
        //size * ability.form.scale / 2 or something such as this, /2 to stop it from being too drastic? or simply make the scale 1, 1.25, 1.5, 2, etc., instead of 1, 5, 10 etc.
    }


}

//different types of radials
//nova (expands from center outwards), radial (size is same entire duration)
//so perhaps change current castRadial func in abilitylogic.js to castNovaArea, and make a castRadialArea or something thus akin

//nova needs: duration and/or initialscale endscale, so with a radius of 100 that might be assumed to be the endscale, initialscale might be smaller by x factor, so endscale 1.0, initial scale .25?