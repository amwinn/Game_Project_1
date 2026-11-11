export default class Container {
    constructor() {
        this.inventory = [];
    }
}


//maybe in class args have config parameter, and then in constructor this.max_items = config.max_items
//so there would be a data file with different kinds of inventories like backback, stash, chest, etc.