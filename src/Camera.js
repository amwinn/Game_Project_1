

export default class Camera {
    constructor(x, y, size){  
        this.x = x; 
        this.y = y;
        this.size = size;
    }


    //clamps camera to player
    clampCamera(player) {
        this.x = player.position.x - (this.size.dw/2); //maybe add - math.floor(this.size.dw/2) to prevent jittery movement
        this.y = player.position.y - (this.size.dh/2); 
    }


}
