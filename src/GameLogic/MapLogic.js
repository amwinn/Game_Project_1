
//needs a lot of work, has state, config, and execution all in the object, needs refactoring before it can be plugged in
export const tileMap = {
    columns: 26,
    rows: 14,
    tsize: 128*1.4,
    mapIndex: 0,
    //tiles: mapData.mapDatabase[0].tiles,//delete if need //.tiles is needed because mapDatabase holds an array of objects not maps, the objects have the maps in a tile array
};

export function getMapWidth(tileMap) {
    return tileMap.columns * tileMap.tsize;
}

export function getMapHeight(tileMap) {
    return tileMap.columns * tileMap.tsize;
}

export function getTile(tileMap, row, column) {
    return tileMap.tiles[row * tileMap.columns + column]
}

export function getTileMap() {
    return this.tileMap;
}