import { mapDatabase } from "../../data/map_data/map_data.js";
//needs a lot of work, has state, config, and execution all in the object, needs refactoring before it can be plugged in
export const tileMap = {
    columns: 26,
    rows: 14,
    tsize: 128*1.4,
    mapIndex: 0,
    tiles: mapDatabase[0].tiles,//delete if need //.tiles is needed because mapDatabase holds an array of objects not maps, the objects have the maps in a tile array
};

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