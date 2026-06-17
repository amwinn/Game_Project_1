import { CREATURE_RENDER } from "../data/entity_data/entity_render.js";
import { Sprite } from "./Utility.js";
//import all sprite paths here perhaps?
//can act sort of as a registry akin to the spell registry

//array and objects iterated using different words
//for (const key in object)
//for (const item of array)

//temp export version to test player caching
export function loadEntityRenders(data) {
    const renderGroup = {};
    for(const animationState in data) {
        renderGroup[animationState] = {};
        for(const direction in data[animationState]) {
            renderGroup[animationState][direction] = [];
            for(const imagePath of data[animationState][direction]) {
                renderGroup[animationState][direction].push(
                    new Sprite(imagePath, null, null)
                );
            }
        }
    }
    return renderGroup;
}

export default class AssetRegistry {
    constructor() {
        this.registry = [];
    }

    //registerImageObject() something like this could automatically create an image/sprite() obejct?
    //would need an array or object to store the images in

//might not use the loadImageGroup, might instead keep the two separate, loadEntityRenders(), loadGameObjectRenders()
    loadImageGroup(entityData, gameObjectData) {
        loadEntityRenders(entityData)
        //loadGameObjectRenders(gameObjectData)

    }
//pseudo code below
//for entities, function called twice, loadEntityRenders(ENTITY_RENDERS[CREATURE_TYPE.FOREST_CREATURE]) and loadEntityRenders(ENTITY_RENDERS[CREATURE_TYPE.GREATER_FOREST_CREATURE])
//for entities, key hierarchy is state, direction, item hierarchy is simply item of data[state][direction]
//for const state in data 
//for const direction in data[state]
//for const item of data[state][direction] new Sprite()
    loadEntityRenders(data) {
        const renderGroup = {};
        for(const animationState in data) {
            renderGroup[animationState] = {};
            for(const direction in data[animationState]) {
                renderGroup[animationState][direction] = [];
                for(const imagePath of data[animationState][direction]) {
                    renderGroup[animationState][direction].push(
                        new Sprite(imagePath, null, null)
                    );
                }
            }
        }
        return renderGroup;
    }

    unloadImageGroup(group) {
        //destroy image objects when swapping map
        //no need to actually utilize yet until many more images are added to the images folder - currently few enough to all be loaded at once 
    }



}



//updated brainstorm 3:
//now leaning towards multiple instances of AssetRegistry, such as biomeAssetRegistry, globalAssetRegistry, etc.
//does AssetRegistry class have a list of all data files that it would possibly need at runtime?
//for example, has all biome data, so const uncachedRegistry= {swamp: {SWAMP_OBJECT_RENDER, SKELETON_RENDER}, forest: {FOREST_OBJECT_RENDER, CREATURE_RENDER}}
//under constructor this.registry = [] or something akin to this
//then biomeAssetRegistry.changeBiome(load, unload) would yield biomeAssetRegistry.changeBiome(uncachedRegistry[new_biome], biomeAssetRegistry.registry)
//if keeping as one single instance, could just have a manager function that calls as such
//forest_creatureSprites = loadEntityRenders(CREATURE_RENDER["forest_creature"]);
//greater_forest_creatureSprites = loadEntityRenders(CREATURE_RENDER["greater_forest_creature"]);
//player_sprites = loadEntityRenders(spriteData_player)
//in this situation all sprite data would be cached at once, even biomes that are not the current map; would have assetRegistry.swamp_objects, assetRegistry.forest_objects etc.




//updated brainstorm 2:
//will have one single instance of AssetRegistry
//will do assetRegistry.loadImageGroup(Swamp) for example
//loadImageGroup() function could possibly call two other functions, such as loadGameObjectAssets(FOREST_OBJECTS from gameObject_render.js) and loadEntityAssets(FOREST_CREATER from entity_render.js)








//general brainstorm 1
//will need to have a function that acts as a factory of sorts, creating image objects with sprite paths
//these objects can remain dormant and not used until attached to player.sprite, entity.sprite etc., during spriteManagement due to movement etc.
//some research shows that there could be a static obejct that will hold all the image objects, not sure if i like that though
//could separate image objects into related objects, such as player_Assets/playerAssets et., something akin to that
