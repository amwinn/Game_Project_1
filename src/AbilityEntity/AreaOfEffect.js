import { Position, Size, Sprite } from "../Utility.js";
export default class Area {
    static conal = "conal";
    static radial = "radial";
    static eruptive = "eruptive";
    constructor(type, ability, position, behavior) {
        this.type = type;
        this.behavior = behavior;
        this.ability = ability;
        this.position = position;
        //this.velocity = velocity;
        this.radius = ability.form.data_config.radius * ability.form.data_config.base_scale; //this.radius = ability.form.data_config.radius*ability.form.data_config.initial_scale
        this.diameter = this.radius *2;
        this.size = new Size(this.diameter, this.diameter);
        this.scale = ability.form.data_config.base_scale;

        this.animationIndex = 0;
        this.duration = ability.form.data_config.duration;
        //might not need to declare animationDuration here, perhaps just in animation logic function?
        //this.animationDuration = this.duration;
        //this.animationDuration = ability.form.data_config.animationDuration || 0;
        this.sprite = new Sprite(ability.form.data_config.sprite[this.animationIndex], this.diameter, this.diameter);
    }

    updateRadial(radial, ability, caster) {
    radial.clampToCaster(radial, caster);
    //radial x/y = player x/y
    //if radial timer >= radial duration, radial.collidable = false, radial.delete = true

    }

    updateBehavior(area, ability, caster) {
        switch(area.behavior) {
            case Area.behavior:
                this.updateEruptive(area, ability, caster);
                break
        }
    }



    //IMPORTANT, DETERMINE IF I NEED SIZE AND RADIUS, OR ONE OR THE OTHER
    //Probably size for sprite image, radius for collision related code

    renderAreaOfEffect(renderer, camera) {
        renderer.drawImage(this.sprite.image, this.position.x - camera.x - this.radius, this.position.y - camera.y - this.radius, this.size.dw, this.size.dh);
    }

    setScale(ability, scale) {
        //size * ability.form.scale / 2 or something such as this, /2 to stop it from being too drastic? or simply make the scale 1, 1.25, 1.5, 2, etc., instead of 1, 5, 10 etc.
    }

    updateRadial(radial, ability, player) {
        //radial x/y = player x/y
        //if radial timer >= radial duration, radial.collidable = false, radial.delete = true

    }

    //move renderRadial to renderlogic.js once working, or at least call there -- might actually be better to leave here as declaration and merely call in renderlogic
    renderRadial(radial, ability, player) {

    }

    //move animateRadial to gamelogic.js once working, or animationlogic.js if made by then
    animateRadial(radial, behavior, ability, player) {
        //behavior = getBehavior(behavior)
        //radial.behavior(radial, ability, caster) can you even do that? store function in variable and then call it thus? not sure, will research

    }

    //rename to animateEruption(type, ability, caster) then under updateRadial(behavior, ability, caster) {somehow link behavior to the appropriate function (eruptive, instant, etc.) and call it}
    updateEruptive(eruptive, ability, caster){
        this.clampToCaster(eruptive, caster);
        if(eruptive.scale >= ability.form.data_config.max_scale) {
            eruptive.delete = true;
        }
        if(eruptive.scale < ability.form.data_config.max_scale) {
            eruptive.scale += ability.form.data_config.scale_incrementor/20;
        }
        if(eruptive.scale > ability.form.data_config.max_scale) {
            eruptive.scale = ability.form.data_config.max_scale;
        }
        eruptive.radius = ability.form.data_config.radius * eruptive.scale;
        eruptive.diameter = eruptive.radius*2;
        eruptive.size.dw = eruptive.diameter;
        eruptive.size.dh = eruptive.diameter;
        //if scale < ability.form.data_config.final_scale, scale += ability.form.data_config.scale_multiplier
        //if scale >= ability.form.data_config.final_scale, delete
    }

    clampToCaster(area,caster) {
        area.position.x = caster.position.x + caster.size.dw /2;
        area.position.y = caster.position.y + caster.size.dh /2;
    }


}


//current update:
//radial, conal, square are forms
//eruptive, instant are behaviors
//maybe make change type to form and behavior variables in constructor param




//different types of radials
//nova (expands from center outwards), radial (size is same entire duration)
//so perhaps change current castRadial func in abilitylogic.js to castNovaArea, and make a castRadialArea or something thus akin

//nova needs: duration and/or initialscale endscale, so with a radius of 100 that might be assumed to be the endscale, initialscale might be smaller by x factor, so endscale 1.0, initial scale .25?

//for nova will need constructor's this.radius = ability.form.data_config.radius*ability.form.data_config.initial_scale? something akin to that