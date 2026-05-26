
//imported and directly referenced in src/Player.js, and GameLogic.js under the playerSpriteManager function
export const spriteData_player = {


    idle: {
        left: "./Images/Entities/Entity_player/StoneAutomaton_walk_left_1.png",
        right: "./Images/Entities/Entity_player/StoneAutomaton_walk_right_1.png"
    },

    walk: {
        left: [
        "./Images/Entities/Entity_player/StoneAutomaton_walk_left_1.png",
        "./Images/Entities/Entity_player/StoneAutomaton_walk_left_2.png",
        "./Images/Entities/Entity_player/StoneAutomaton_walk_left_1.png",
        "./Images/Entities/Entity_player/StoneAutomaton_walk_left_3.png"
        ],

        right: [
        "./Images/Entities/Entity_player/StoneAutomaton_walk_right_1.png",
        "./Images/Entities/Entity_player/StoneAutomaton_walk_right_2.png",
        "./Images/Entities/Entity_player/StoneAutomaton_walk_right_1.png",
        "./Images/Entities/Entity_player/StoneAutomaton_walk_right_3.png"
        ]
    },
    
    //original direction code with old sprite, remove soon, keeping in case of testing necessity
    // stance_1: {
    //     left: "../Images/Entities/Entity_player/simple_wizard1_transparent_left.png",
    //     right: "../Images/Entities/Entity_player/simple_wizard1_transparent.png",
    //     default: "../Images/Entities/Entity_player/simple_wizard1_transparent.png",
    // }

}

