//import all sprite paths here perhaps?
//can act sort of as a registry akin to the spell registry




export default class AssetRegistry {
    constructor() {

    }

    //registerImageObject() something like this could automatically create an image/sprite() obejct?
    //would need an array or object to store the images in


    loadImageGroup(data) {

    }

    loadEntityRenders(data) {
        //need to iterate through data object keys unless turning it to array
    }



}

//updated brainstorm:
//will have one single instance of AssetRegistry
//will do assetRegistry.loadImageGroup(Swamp) for example
//loadImageGroup() function could possibly call two other functions, such as loadGameObjectAssets(FOREST_OBJECTS from gameObject_render.js) and loadEntityAssets(FOREST_CREATER from entity_render.js)








//general brainstorm
//will need to have a function that acts as a factory of sorts, creating image objects with sprite paths
//these objects can remain dormant and not used until attached to player.sprite, entity.sprite etc., during spriteManagement due to movement etc.
//some research shows that there could be a static obejct that will hold all the image objects, not sure if i like that though
//could separate image objects into related objects, such as player_Assets/playerAssets et., something akin to that
