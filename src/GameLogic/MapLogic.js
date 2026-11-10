import { mapDatabase } from "../../data/map_data/map_data.js";
//needs a lot of work, has state, config, and execution all in the object, needs refactoring before it can be plugged in
export const tileMap = {
    columns: 26,
    rows: 14,
    tsize: 128*1.4,
    mapIndex: 0,
    tiles: mapDatabase[0].tiles,//delete if need //.tiles is needed because mapDatabase holds an array of objects not maps, the objects have the maps in a tile array
};

export const tileMapConfig = {
    columns: 26,
    rows: 14,
    tsize: 128*1.4,
}

export const tileMapData = {
    mapIndex: 0,
    tiles:mapDatabase[0].tiles
}

export function getMapWidth() {
    return tileMap.columns * tileMap.tsize;
}

export function getMapHeight() {
    return tileMap.rows * tileMap.tsize;
}

export function getTile(row, column) {
    return tileMap.tiles[row * tileMap.columns + column]
}

export function getTileMap() {
    return tileMap;
}


export function mapChangeCondition(player, array) {
    for(const object of array) {
        if(
            player.position.x  + player.size.dw/3  > object.position.x &&  
            player.position.x   < object.position.x + object.size.dw /1.5 && 
            player.position.y + player.size.dh/1.3 > object.position.y && 
            player.position.y   < object.position.y + object.size.dh/1.5 
        ) {
            return true;
        } else return false;

    }
}

export function changeMap() {
    
}