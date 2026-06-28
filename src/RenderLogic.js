import GameObject, {rockObjectCharter, treeObjectCharter, bushObjectCharter, gateObjectCharter, deadTreeObjectCharter} from "./GameObject.js";
import { gameObjectMasterArray } from "./Main.js";
import Camera from "./Camera.js";
import Player from "./Player.js";

import { screenSize } from "./Main.js"; //this was preventing the game from loading because it was calling before the grid class in main
import { meleeEnemyCharter, rangedEnemyCharter } from "./Entity.js";
import { projectilesArray, entityProjectilesArray, radialArray } from "./Main.js";
import Portal from "./Portal.js";
import { portalArray } from "./Portal.js";
//import { mapDatabase, biomeTileSheets } from "./MapDB.js";
import { Position, Size, Sprite } from "./Utility.js";
import MapData from "./MapDB.js";
import { objectSpawnTracker } from "./GameLogic/GameLogic.js";

import { test_item_array } from "./Main.js";



//You're going to be seeing some +22's in this file, and wonder why it's here; well, that's the only way i currently know that removes the grid lines from the map, this isnt a checkerboard its an rpg board
export let playerSpawned = false;
export function changePlayerSpawnState(boolean) {
    playerSpawned = boolean;
}
//let collisionDetection = false;
//eventually remove nextMap once it no longer servers a purpose, it has been replaced by a variable of the same name in gamelogic
export let nextMap = false; //MUST BE LET not const, or else it will never be changeable from false
//function that will allow me to change the value of nextMap once its imported (when variables are imported they are read only for some reason)
export function changeNextMap(boolean) {
    nextMap = boolean;
}
//moved objectSpawnTracker to GameLogic and exported it here, seems to work fine atm keep below code awhile longer just to be safe
//let objectSpawnTracker = new Set(); //fills with each grid cell to prevent duplicate object spawns
let objectIndex;
export default class RenderLogic{
    constructor(mapData, camera, player){
        this.mapData = mapData;
        this.tileMap = this.mapData.tileMap;
        this.camera = camera;
        this.player = player;
        this.initializeProperties();
        
        document.addEventListener("keydown", this.keyDownCodes);
        document.addEventListener("keyup", this.keyUpCodes);

    }



    initializeProperties(){
    this.mapWidth = this.tileMap.getMapWidth();
    this.mapHeight = this.tileMap.getMapHeight();

    }

    
//Checks if user is zoomed out further than intended,and repositions player x,y if out of bounds
    updatePlayer() {
        
        if (this.player.position.x > this.tileMap.cols * this.tileMap.tsize ) {
            this.player.position.x = (this.tileMap.cols * this.tileMap.tsize) /2;
        }
        if(this.player.position.y > (this.tileMap.rows * this.tileMap.tsize)) {
            this.player.position.y = (this.tileMap.rows * this.tileMap.tsize) /2;
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

        //let leftBounds = Math.floor(this.tileMap.cols / this.tileMap.tsize); //was originally this.camera.x instead of this.tilemap.cols //btw i dont know how but this fixed where the tilemap kept rendering the map infinitely to the left and right
        //leftBounds still causes the right side grass/paths to unrender( is out of view, have to start 100% zoom and zoom out to see it)
        let leftBounds = Math.floor(this.camera.x / this.tileMap.tsize);//was start col
        let rightBounds = Math.floor((this.camera.x + this.camera.size.dw) / this.tileMap.tsize) +1; // was originally this.camera.w instead of this.mapWidth //was endcol
        let topBounds = Math.floor(this.camera.y / this.tileMap.tsize); //was originally this.camera.y instead of this.tilemap.rows //was startrow
        let bottomBounds = Math.floor((this.camera.y + this.camera.size.dh) / this.tileMap.tsize) +1; //was originally this.camera.h instead of this.mapHeight //was endrow

        //not used for a while, delete once sure
        // let maxCol = this.tileMap.cols;
        // let maxRow = this.tileMap.rows;
        for(let c = leftBounds; c <= rightBounds ; c++) { 
            for(let r = topBounds; r <= bottomBounds ; r++) { 
                //recently commented out as of march 8 2026
                //const tileID = `${c},${r}`;
                const tile = this.tileMap.getTile(c,r);

                let x = c *this.tileMap.tsize;
                let y = r *this.tileMap.tsize;
                
                //recently commented out as of march 8 2026
                //let tileValidity = this.checkTileValidity(x,y, this.mapWidth, this.mapHeight);
                
                
                let selectedTileSheet = this.mapData.biomeTileSheets[this.mapData.mapDatabase[this.tileMap.mapIndex].biome];

                let defaultFloorSprite = selectedTileSheet[0];

                
                let selectedTile = selectedTileSheet[tile];

                //renders non-object terrain tiles (mostly grass)
                if(selectedTile && !selectedTile.arrayType && !selectedTile.type) { //was tile === 0 || tile === 2, decided to make it more abstract
                    this.renderSprite(renderer, selectedTile.sprite, x, y, this.tileMap.tsize+22, this.tileMap.tsize+22)
                }
                

                //creates a background grass for object, the +22 modifiers to size fix the artifact lines, oddly enough they werent visible in fullscreen f11 mode
                if(selectedTile && selectedTile.arrayType && selectedTile.type) { //was if(tile > 2)
                    this.renderSprite(renderer, defaultFloorSprite.sprite, x, y, this.tileMap.tsize+22, this.tileMap.tsize+22); //just recently added this +22 to the dw and dh, else there were grid lines all over
                }


            } 
        }  
    }


    renderObjects(renderer) {
        gameObjectMasterArray.forEach((objectArray, objectArrayIndex) => {
            objectArray.forEach((object, objectIndex) => {
                this.renderSprite(renderer, object.sprite, object.position.x , object.position.y , object.size.dw, object.size.dh);
            });
        });

    }


//REMEMBER: first to render means deepest on the render layer, if wanting to cover other rendered objects, must be rendered AFTER said objects
    renderHandler(renderer) {      
        this.renderMap(renderer);
        radialArray.forEach((eruptive, index) => {
            eruptive.renderAreaOfEffect(renderer, this.camera);
        })
        this.renderObjects(renderer);
        this.renderPlayer(renderer, this.player, this.camera);

        meleeEnemyCharter.forEach((entity, i) => {
            this.renderEntity(renderer,entity, this.camera);
        })

        rangedEnemyCharter.forEach((entity, i) => {
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

    cullObjects() {
        projectilesArray.length = 0;
        entityProjectilesArray.length = 0;
        treeObjectCharter.length = 0;
        rockObjectCharter.length = 0;
        bushObjectCharter.length = 0;   
        gateObjectCharter.length = 0;
        deadTreeObjectCharter.length = 0;
        meleeEnemyCharter.length = 0;
        rangedEnemyCharter.length = 0
        portalArray.length = 0;
        objectSpawnTracker.clear();
    }



}