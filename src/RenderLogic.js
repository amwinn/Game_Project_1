import { meleeEntityArray, rangedEntityArray } from "./Entity.js";
import { gameObjectArray } from "./GameObject.js";
import { entityProjectilesArray, projectilesArray, radialArray } from "./Main.js";
import { objectSpawnTracker } from "./GameLogic/GameLogic.js";
import { test_item_array } from "./Main.js";
import { mapDatabase } from "../data/map_data/map_data.js";
import { getMapHeight, getMapWidth, getTile, tileMapConfig, tileMapData } from "./GameLogic/MapLogic.js";
import { BIOME_CONFIG } from "../data/biome_data/biome_config.js";
import { GAMEOBJECT_SUBTYPE, MESH_SUBTYPE, MESH_TYPE } from "../data/biome_data/biome_type.js";
import { biomeSprites } from "./AssetRegistry.js";




//You're going to be seeing some +22's in this file, and wonder why it's here; well, that's the only way i currently know that removes the grid lines from the map, this isnt a checkerboard its an rpg board


export default class RenderLogic{
    constructor(camera, player){
        //this.mapData = mapData;
        //this.tileMap = this.mapData.tileMap;
        this.camera = camera;
        this.player = player;
        this.initializeProperties();
        
        document.addEventListener("keydown", this.keyDownCodes);
        document.addEventListener("keyup", this.keyUpCodes);

    }



    initializeProperties(){
    this.mapWidth = getMapWidth();
    this.mapHeight = getMapHeight();

    }

    
//Checks if user is zoomed out further than intended,and repositions player x,y if out of bounds
    updatePlayer() {
        
        if (this.player.position.x > tileMapConfig.columns * tileMapConfig.tsize ) {
            this.player.position.x = (tileMapConfig.columns * tileMapConfig.tsize) /2;
        }
        if(this.player.position.y > (tileMapConfig.rows * tileMapConfig.tsize)) {
            this.player.position.y = (tileMapConfig.rows * tileMapConfig.tsize) /2;
        };

    
    }
//is tile within bounds of map?
    checkTileValidity(x,y,w,h) {
        if(
            x < 0 ||
            x > w ||
            y < 0 ||
            y > h
         ) {
            return false; //read: not within bounds of map
         } else return true; //read: is within bounds of map
    }  
//once object creation is moved maybe render map is just renderMesh type of situation
    renderMap(renderer){

        let leftBounds = Math.floor(this.camera.x / tileMapConfig.tsize);//was start col
        let rightBounds = Math.floor((this.camera.x + this.camera.size.dw) / tileMapConfig.tsize) +1; // was originally this.camera.w instead of this.mapWidth //was endcol
        let topBounds = Math.floor(this.camera.y / tileMapConfig.tsize); //was originally this.camera.y instead of this.tilemap.rows //was startrow
        let bottomBounds = Math.floor((this.camera.y + this.camera.size.dh) / tileMapConfig.tsize) +1; //was originally this.camera.h instead of this.mapHeight //was endrow


        for(let c = leftBounds; c <= rightBounds ; c++) { 
            for(let r = topBounds; r <= bottomBounds ; r++) { 
                //recently commented out as of march 8 2026
                //const tileID = `${c},${r}`;
                const tile = getTile(r,c);

                let x = c * tileMapConfig.tsize;
                let y = r * tileMapConfig.tsize;
                
                //recently commented out as of march 8 2026
                //let tileValidity = this.checkTileValidity(x,y, this.mapWidth, this.mapHeight);
                
                let biomeTileAssignments = BIOME_CONFIG[mapDatabase[tileMapData.mapIndex].biome];
                let defaultMeshSprite = biomeSprites[MESH_TYPE.GRASS][biomeTileAssignments[0]];

                for(const grouping in MESH_SUBTYPE) {
                    for(const item in MESH_SUBTYPE[grouping]) {
                        if(MESH_SUBTYPE[grouping][item] === biomeTileAssignments[tile]) {
                            //console.log(gameObjectSprites[grouping][MESH_TYPE[grouping][item]])
                            this.renderSprite(renderer, biomeSprites[grouping][MESH_SUBTYPE[grouping][item]], x, y, tileMapConfig.tsize+2, tileMapConfig.tsize+2);
                        }
                    }
                }
                for(const grouping in GAMEOBJECT_SUBTYPE) {
                    for(const item in GAMEOBJECT_SUBTYPE[grouping]) {
                        if(GAMEOBJECT_SUBTYPE[grouping][item] === biomeTileAssignments[tile]) {
                            //console.log(gameObjectSprites[grouping][GAMEOBJECT_TYPE[grouping][item]]) //not useful b/c its yielding the actual object, doesnt point to mesh
                            this.renderSprite(renderer, defaultMeshSprite, x, y, tileMapConfig.tsize+2, tileMapConfig.tsize+2)
                        }
                    }
                }
            } 
        }  
    }


    renderObjects(renderer, array) {
        array.forEach((object, index) => {
            this.renderSprite(renderer, object.sprite, object.position.x, object.position.y, object.size.dw, object.size.dh);
        })
    }


//REMEMBER: first to render means deepest on the render layer, if wanting to cover other rendered objects, must be rendered AFTER said objects
    renderHandler(renderer) {      
        this.renderMap(renderer);
        radialArray.forEach((radial, index) => {
            radial.renderAreaOfEffect(renderer, this.camera);
            
        })
        this.renderObjects(renderer, gameObjectArray);
        //this.renderObjects(renderer);
        this.renderPlayer(renderer, this.player, this.camera);

        meleeEntityArray.forEach((entity, i) => {
            this.renderEntity(renderer,entity, this.camera);
        })

        rangedEntityArray.forEach((entity, i) => {
            this.renderEntity(renderer, entity, this.camera);
        })

        //TEST CODE
        test_item_array.forEach((item, i) => {
            this.test_renderLoot(renderer, item, this.camera)
        })
        //END TEST CODE

        
    }


 
    renderSprite(renderer, sprite, x, y, dw, dh) {
        if(x >= 0 && x < this.mapWidth && y >= 0 && y < this.mapHeight) {
            
            renderer.drawImage(sprite.image, x - this.camera.x, y-this.camera.y, dw, dh);
        }     
    }

    renderPlayer(renderer, player, camera) {
        renderer.drawImage(player.sprite.image, player.position.x - camera.x , player.position.y - camera.y, player.size.dw, player.size.dh);
    }


    renderEntity(renderer, entity, camera) {
        renderer.drawImage(entity.sprite.image,entity.position.x - camera.x, entity.position.y - camera.y, entity.size.dw, entity.size.dh);
    }

    //START TEST CODE
    test_renderLoot(renderer, loot, camera) {
        renderer.drawImage(loot.sprite.image, loot.x - camera.x, loot.y - camera.y, loot.sprite.dw, loot.sprite.dh);
    }
    //END TEST CODE

    // cullObjects() {
    //     gameObjectArray.length = 0;
    //     projectilesArray.length = 0;
    //     entityProjectilesArray.length = 0;
    //     meleeEntityArray.length = 0;
    //     rangedEntityArray.length = 0
    //     objectSpawnTracker.clear();
    // }

}