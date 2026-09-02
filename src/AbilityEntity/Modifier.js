export default class Modifier {
    constructor(modifier, inflictor, inflicted, duration, amount) {
        this.type = modifier;
        this.source = inflictor;
        this.inflicted = inflicted;
        this.duration = duration;
        this.amount = amount;
        this.timer = 0;
        this.active = false;
    }

    //needs to be completely redone to be a switch just as it is done in applyEffects
    revise(inflictor, inflicted, duration, amount) {
        this.timer ++
        if(this.timer >= duration) {
            //make inactive or delete?
        }

        if(!this.active && this.timer < duration) {
            inflicted += amount; //with += doesnt need to know if buff or debuff,but now that will have to change debuff amounts to -x in the data files

        }



    }
    //TODO
    //need to figure out a way to only take the inflicted entity's stats one time, instead of every update tick
    //could just do a boolean if active false then -=amount, active true
    //otherwise, will have to configure a debuff/buff id for every modifier
}