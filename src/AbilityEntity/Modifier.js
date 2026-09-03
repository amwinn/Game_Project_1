export default class Modifier {
    constructor(effect, inflictor, inflicted, ability) {
        this.effect = effect;
        this.source = inflictor;
        this.inflicted = inflicted;
        this.duration = effect?.duration || "null";
        this.amount = effect?.amount || "null";
        this.durationTimer = 0;
        this.active = true;
    }
    //modArray.forEach((item, i) => {update(item)})
    update() {
        this.durationTimer ++;
        if(this.durationTimer >= this.duration) {
            this.delete = true;
            this.active = false;
        }
    }

    //probably scrap the below, using above for now
    // revise(inflictor, inflicted, duration, amount) {
    //     this.timer ++
    //     if(this.timer >= duration) {
    //         this.splice; //this should set it up for splicing
    //         //make inactive / delete
    //     }
    //     if(!this.active && this.timer < duration) {
    //         inflicted += amount; //with += doesnt need to know if buff or debuff,but now that will have to change debuff amounts to -x in the data files
    //     }
    // }
    //TODO
    //need to figure out a way to only take the inflicted entity's stats one time, instead of every update tick
    //could just do a boolean if active false then -=amount, active true
    //otherwise, will have to configure a debuff/buff id for every modifier




}



//REGARDING DOTS/HOTS
//perhaps store them here, but could also make a class Residual, will have to see, a dot/hot could technically be a modifier, but is also an active/ongoing spell presence



//if array.includes("slow") { if array["slow"].amount > effect.amount{return/do nothing} else {splice "slow", array.push"slow""}} //so if new slow is larger amount, replace old slow with it
//main problem with the above brainstorm is that if a 40% slow has a 20 sec duration, and you cast a 70% slow that has a 4 sec duration, then the 40% slow is spliced, prob better to:
//only calculate the largest amount of that effect category at a time? would only be for speed, because haste is usually stackable in most games