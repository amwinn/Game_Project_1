export default class AssetLoader {
    constructor() {

    }
}

//general brainstorm
//will need to have a function that acts as a factory of sorts, creating image objects with sprite paths
//these objects can remain dormant and not used until attached to player.sprite, entity.sprite etc., during spriteManagement due to movement etc.
//some research shows that there could be a static obejct that will hold all the image objects, not sure if i like that though
//could separate image objects into related objects, such as player_Assets/playerAssets et., something akin to that