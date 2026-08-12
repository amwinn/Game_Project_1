import { Position, Size, Sprite } from "../Utility.js";
export default class Area {
    static conal = "conal";
    static radial = "radial";
    static eruptive = "eruptive";
    static static = "static";
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

        this.animationTimer = 0;
        this.animationIndex = 0;
        this.duration = ability.form.data_config.duration;
        this.durationTimer = 0;
        //might not need to declare animationDuration here, perhaps just in animation logic function?
        //this.animationDuration = this.duration;
        //this.animationDuration = ability.form.data_config.animationDuration || 0;
        this.sprite = new Sprite(ability.form.data_config.sprite[this.animationIndex], this.diameter, this.diameter);
    }

    updateArea(area, ability, caster) {
    //updateForm();
    area.clampToCaster(area, caster); //eventually move to be conditional on if the data says clamp: false, or clamp: true?
    this.updateBehavior(area, ability, caster);
    //radial x/y = player x/y
    //if radial timer >= radial duration, radial.collidable = false, radial.delete = true

    }

    updateForm(area, ability, caster) {
        //switch statements for radial, conal, square, (arc?) etc
        switch(ability.form.type) {
            case Area.radial:
                this.updateRadial(area, ability, caster);
                break;
        }
    }
//updateX can be gamelogic, renderX can be renderlogic, animateX can be animation logic(currently still in gamelogic.js)
    animateBehavior(area, ability, caster){
        switch(ability.form.behavior) {
            case Area.static:
                area.animateStatic(area,ability,caster);
                break;
            case Area.eruptive:
                area.animateEruptive(area, ability, caster);
                break;
        }
        //could have animateEruptive, currently only one frame sprite but might make more

    }

    updateBehavior(area, ability, caster) {
        switch(ability.form.behavior) {
            case Area.eruptive:
                area.updateEruptive(area, ability, caster);
                break;
            case Area.static:
                area.updateStatic(area, ability, caster);
                break;
        }
    }


    //maybe add a manageAnimation or updateAnimation that will sort byhh form/type etc., thats where animatestatic would be located

    updateStatic(area, ability, caster) {
        area.durationTimer ++;
        if(area.durationTimer >= area.ability.form.data_config.duration) {
            area.delete = true;
        }
        if(area.durationTimer === area.ability.form.data_config.duration /2) {
            //collision check goes here
            //actually collision logic doesnt go anywhere near this, just make a collidable = true, then in collision could make a collidable = false?
        }
        
        //best to put here incase duration is shared by animation and gamelogics
        //if aoe timer = ability.duration /2, collision check and aoe.collidable = false after the check is performed for an entire loop through entities.
    }

    //move to gamelogic.js once working
    animateStatic(area, ability, caster) {
        //console.log(area.sprite.image.src)
        let selectedSpriteSet = ability.form.data_config.sprite; //might be overkill if there is a single static image that doesnt change, best to keep format though 
        let frameDuration = 20; //duration of each frame


        area.animationTimer++;
        console.log(area.animationTimer, area.animationIndex, selectedSpriteSet.length)
        if(area.animationTimer >= frameDuration) {
            area.animationIndex++;
            area.animationTimer = 0;
        }
        if(area.animationIndex >= selectedSpriteSet.length) {
            area.animationIndex = 0;
        }
        console.log(area.animationIndex)
        area.sprite.image.src = selectedSpriteSet[area.animationIndex];

        //use similar frame setup as player sprite manager
        
    }

    animateEruptive(area, ability, caster) {
        let selectedSpriteSet = ability.form.data_config.sprite;
        let frameDuration = 20;

        area.animationTimer++;
        console.log(area.animationTimer, area.animationIndex, selectedSpriteSet.length)
        if(area.animationTimer >= frameDuration) {
            area.animationIndex++;
            area.animationTimer = 0;
        }
        if(area.animationIndex >= selectedSpriteSet.length) {
            area.animationIndex = 0;
        }
        console.log(area.animationIndex)
        area.sprite.image.src = selectedSpriteSet[area.animationIndex];
    }

    //research how games do "instant" casted aoe in terms of when collision is checked etc.
    updateRadial(radial, ability, caster) {
        this.clampToCaster(radial, caster);
    //is this update func even necessary? behavior func could handle it all perhaps? keep separate for now
    //duration timer ++
    //if duration timer >= duration, radial.delete = true, radial.collidable = false, maybe radial.sprite = null?
    

    }



    //IMPORTANT, DETERMINE IF I NEED SIZE AND RADIUS, OR ONE OR THE OTHER
    //Probably size for sprite image, radius for collision related code

    renderAreaOfEffect(renderer, camera) {
        renderer.drawImage(this.sprite.image, this.position.x - camera.x - this.radius, this.position.y - camera.y - this.radius, this.size.dw, this.size.dh);
    }

    setScale(ability, scale) {
        //size * ability.form.scale / 2 or something such as this, /2 to stop it from being too drastic? or simply make the scale 1, 1.25, 1.5, 2, etc., instead of 1, 5, 10 etc.
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
    updateEruptive(area, ability, caster){
        //this.clampToCaster(area, caster); //moved to updateRadial, trying to streamline
        if(area.scale >= ability.form.data_config.max_scale) {
            area.delete = true;
        }
        //could potentially use duration as a scale incrementor instead of having it every single tick - slower novas would have a longer duration?
        if(area.scale < ability.form.data_config.max_scale) {
            area.scale += ability.form.data_config.scale_incrementor/20;
        }
        if(area.scale > ability.form.data_config.max_scale) {
            area.scale = ability.form.data_config.max_scale;
        }
        area.radius = ability.form.data_config.radius * area.scale;
        area.diameter = area.radius*2;
        area.size.dw = area.diameter;
        area.size.dh = area.diameter;
        //if scale < ability.form.data_config.final_scale, scale += ability.form.data_config.scale_multiplier
        //if scale >= ability.form.data_config.final_scale, delete
    }

    clampToCaster(area,caster) {
        area.position.x = caster.position.x + caster.size.dw /2;
        area.position.y = caster.position.y + caster.size.dh /2;
    }


}

//form
//radial, conal, square

//behavior
//expand, contract, static

//delivery
//instant, delayed, modifier


//current update:
//radial, conal, square are forms
//eruptive, instant are behaviors
//maybe make change type to form and behavior variables in constructor param

//flow: 
//areaUpdate(area, ability, caster) {
//  formUpdate(area.type);
//  behaviorUpdate(area.behavior)
//}




//different types of radials
//nova (expands from center outwards), radial (size is same entire duration)
//so perhaps change current castRadial func in abilitylogic.js to castNovaArea, and make a castRadialArea or something thus akin

//nova needs: duration and/or initialscale endscale, so with a radius of 100 that might be assumed to be the endscale, initialscale might be smaller by x factor, so endscale 1.0, initial scale .25?

//for nova will need constructor's this.radius = ability.form.data_config.radius*ability.form.data_config.initial_scale? something akin to that