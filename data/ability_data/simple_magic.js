//WIP, format not finalized
//id may be redundant
//need the array [] for required and effect because ill be feeding into a forEach (unless?), form will mostly all be type, speed, scale - could even add cooldown into there?

export const spellbolt = {
    id:"spellbolt",
    cooldown: 300,
    //not really sure if i need redundancy below with resource and required, but it is an important distinction
    //incase there is a spell that REQUIRES 10 health, but doesnt COST/CONSUME 10 health
    resource: [
        {type: "mana", amount: 10}
    ],
    required: [
        {type: "mana", amount: 10}
    ],

    form: {
        type: "projectile",
        data_config: {
            sprite: "../images/magic_bolt1.png",
            size: {dw: 30, dh: 30},
            speed: 5,
            scale: 1 //not sure if i really need, just incase for dynamic size or something, remove if doesnt come to fruition
    },

    },
    effect:[{type: "damage", amount: 20}
    ]

}

export const spellnova = {
    id:"spellnova",
    cooldown: 600,
    resource: [
        {type: "mana", amount: 0}
    ],
    required: [
        {type: "mana", amount: 0}
    ],
    form: {
        type: "radial",
        data_config: {
            sprite: "../images/magic_bolt1.png",
            size: {dw: 120, dh: 120}, //makes sense that maybe instead of size have radius, or have size: {radius:100} or something akin to that
            speed: 5,
            scale: 1
        }

    },
    effect: [
        {type: "damage", amount: 50}
    ]
}

//maybe add spritePath?