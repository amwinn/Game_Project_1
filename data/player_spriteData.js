
//imported and directly referenced in src/Player.js, and GameLogic.js under the playerSpriteManager func
export const spriteData_player = {


    idle: {
        left: "../Images/Entities/Entity_player/StoneAutomaton_walk_left_1.png",
        right: "../Images/Entities/Entity_player/StoneAutomaton_walk_right_1.png"
    },

    walk: {
        left: [
        "../Images/Entities/Entity_player/StoneAutomaton_walk_left_1.png",
        "../Images/Entities/Entity_player/StoneAutomaton_walk_left_2.png",
        //"../Images/Entities/Entity_player/StoneAutomaton_walk_left_1.png",
        "../Images/Entities/Entity_player/StoneAutomaton_walk_left_3.png"
        ],

        right: [
        "../Images/Entities/Entity_player/StoneAutomaton_walk_right_1.png",
        "../Images/Entities/Entity_player/StoneAutomaton_walk_right_2.png",
        //"../Images/Entities/Entity_player/StoneAutomaton_walk_right_1.png",
        "../Images/Entities/Entity_player/StoneAutomaton_walk_right_3.png"
        ]

    },
    
    
    // default:"../Images/Entities/Entity_player/simple_wizard1_transparent_left.png",
    // left: {
    //     stance_1: "../Images/Entities/Entity_player/StoneAutomaton_walk_left_1.png",
    //     stance_2: "../Images/Entities/Entity_player/StoneAutomaton_walk_left_2.png",
    //     stance_3: "../Images/Entities/Entity_player/StoneAutomaton_walk_left_3.png"
    // },
    // right: {
    //     stance_1: "../Images/Entities/Entity_player/StoneAutomaton_walk_right_1.png",
    //     stance_2: "../Images/Entities/Entity_player/StoneAutomaton_walk_right_2.png",
    //     stance_3: "../Images/Entities/Entity_player/StoneAutomaton_walk_right_3.png"
    // }

    stance_1: {
        left: "../Images/Entities/Entity_player/simple_wizard1_transparent_left.png",
        right: "../Images/Entities/Entity_player/simple_wizard1_transparent.png",
        default: "../Images/Entities/Entity_player/simple_wizard1_transparent.png",
    },

    // stance_2: {
    //     left:,
    //     right:,
    //     default:
    // }

    // stance_3: {
    //     left:,
    //     right:,
    //     default:
    // }

    // change if dont like but basically stance 1 will be the default stand-still pose, stance 2 will be the right knee forward pose, and
    // stance 3 will be the left knee forward pose. im intending to place the stance 1 between each of the other poses to mimic transition of legs
}

