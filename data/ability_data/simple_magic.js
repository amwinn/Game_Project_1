//WIP, format not finalized
//id may be redundant
//need the array [] for required and effect because ill be feeding into a forEach (unless?), form will mostly all be type, speed, scale - could even add cooldown into there?

export const spellbolt = {
    id:"spellbolt",
    cooldown: 3,
    resource: [
        {type: "mana", amount: 0}
    ],
    required: [
        {type: "mana", amount: 0}
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
        {type: "damage", amount: 1},
        {type: "slow", duration: 5, amount: 0.5},
        {type: "drain", subType: "mana", duration: 10, amount: 5, ticks: 5} //decided not to tie initital damage into the same effect, keeping a separate type: "damage" format instead
    ]

}

export const spellnova = {
    id:"spellnova",
    cooldown: 6,
    resource: [
        {type: "mana", amount: 40}
    ],
    required: [
        {type: "mana", amount: 40}
    ],
    form: {
        type: "radial", //would like this to eventually be AREA_TYPE["radial"] or akin to that
        behavior: "eruptive",
        data_config: {
            sprite: [
                "Images/Abilities/simple_magic/spellnova_1.png","Images/Abilities/simple_magic/spellnova_1.png"
            ],
            duration: 0.75,
            trigger: 100,
            radius: 300, 
            base_scale: 0.25,
            max_scale: 1, 
            scale_incrementor: 0.25,
        }

    },
    effect: [
        {type: "knockback", amount: 75},
        {type: "slow", duration: 25, amount: 0.9},
        {type: "stun", duration: 10},
        {type: "fast", duration: 25, amount: 1.1},
        {type: "drain", subType: "health", duration: 10, amount: 10, ticks: 10}
        //{type: "slow", duration: 2500, amount: .9}
    ]
}

export const spellblast = {
    id:"spellblast",
    cooldown: 6,
    resource: [
        {type: "mana", amount: 40}
    ],
    required: [
        {type: "mana", amount: 40}
    ],
    form: {
        type: "radial",
        behavior: "static",
        data_config: {
            sprite: [
                "Images/spellnova_test.png", "Images/Abilities/simple_magic/spellnova_1.png"
            ],
            duration: 0.75,
            radius: 150,
            base_scale: 1,
            max_scale: 1,
            scale_incrementor: 0.25
        }
    },
    effect: [
        {type: "damage", amount: 1},
        {type: "fast", duration: 15, amount: 1.9}
    ]
}

//maybe add spritePath?

//if an effect is a dot, or multi tick nova, then under effect, there would be type: damage, amount 10, hitCount/tick: 5, interval: 200, or something akin to this