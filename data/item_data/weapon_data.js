import { Sprite } from "../../src/Utility.js"

export const gnarled_staff = {
    id:"gnarled staff",
    school_type: { //essentially this is what school the weapon unlocks
        category: "nature",
        type: "wild"
    },
    cooldown: 3, //for the primary/default ability that comes with the staff? might not need cooldown
    required: [], //again, might not need, paring is easier than inserting so just placed it here for now
    form: {
        type: "staff",
        data_config: {
            sprite: [],
            //no size in data, think it will have to be tied to player size in order to "snap" the weapon into the right position/place
        },
    },
    effect: [], //this is essentially the modifications, to attributes, defenses, resources, abilities, etc.
}













export const frostbolt = {
    id:"frostbolt",
    damage_type: {
        category: "elemental",
        type: "frost"
    },
    cooldown: 3,
    resource: [
        {type: "mana", amount: 10}
    ],
    required: [
        {type: "mana", amount: 10}
    ],
    form: {
        type: "projectile",
        data_config: {
            sprite: "Images/Abilities/simple_magic/spellbolt_test.png",
            radius: 15,
            speed: 5,
            scale: 1.25 //not sure if i really need, just incase for dynamic size or something, remove if doesnt come to fruition
        },
    },
    effect:[
        {type: "damage", amount: 5},
        {type: "slow", duration: 10, amount: 0.3},
        {type: "drain", sub_type: "health", duration:10, amount:2, ticks: 5}
    ]

}






















export const weapon_data  = [
    {
        id: 1,
        name: "bronze_2handed_sword",
        sprite_default: new Sprite("Images/draft_loot_bag1.png"),
        sprite_right: null,
        sprite_left: null,
        physical_attack:5,
        magic_attack: 5,
        speed:5,
        magnitude:5
    },

    {
        id: 2,
        name:"bronze_1handed_mace",
        sprite_default: null,
        sprite_right: null,
        sprite_left: null,
        physical_attack:5,
        magic_attack: 5,
        speed:5,
        magnitude:5
    }

    // {
    //     // id: 3,
    //     // name:"bronze_round_shield",
    //     // sprite_default:,
    //     // sprite_right:,
    //     // sprite_left:,
    //     // physical_attack:,
    //     // magic_attack: ,
    //     // speed:,
    //     // magnitude:
    // },


    // {
    //     // id: 4,
    //     // name:"bronze_etched_staff",
    //     // sprite_default:,
    //     // sprite_right:,
    //     // sprite_left:,
    //     // physical_attack:,
    //     // magic_attack: ,
    //     // speed:,
    //     // magnitude:
    // },

    // {
    //     // id: 5,
    //     // name:"gnarled_wooden_staff",
    //     // sprite_default:,
    //     // sprite_right:,
    //     // sprite_left:,
    //     // physical_attack:,
    //     // magic_attack: ,
    //     // speed:,
    //     // magnitude:
    // }

]
