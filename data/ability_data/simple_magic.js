//WIP, format not finalized
//id may be redundant
//need the array [] for required and effect because ill be feeding into a forEach (unless?), form will mostly all be type, speed, scale - could even add cooldown into there?

export const spellbolt = {
    id:"spellbolt",
    cooldown: 300,
    resource: [
        {type: "mana", cost: 10}
    ],
    required: [
        {type: "mana", cost: 10}
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
    required: {
        type: "mana", amount: 20
    },
    form: {
        type: "radial",
        data_config: {
            sprite: "../images/magic_bolt1.png",
            size: {dw: 100, dh: 100}, //makes sense that maybe instead of size have radius, or have size: {radius:100} or something akin to that
            speed: 5,
            scale: 1
        }

    },
    effect: [
        {type: "damage", amount: 50}
    ]
}

//maybe add spritePath?