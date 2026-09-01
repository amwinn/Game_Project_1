export default class Modifier {
    constructor(source, duration, amount) {
        this.source = source;
        this.duration = duration;
        this.amount = amount;
        this.timer = 0;
    }

    revise(source, duration, amount) {
        this.timer ++
        if(this.timer >= duration) {
            //make inactive or delete?
        }

    }
}