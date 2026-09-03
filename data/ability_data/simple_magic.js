//WIP, format not finalized
//id may be redundant
//need the array [] for required and effect because ill be feeding into a forEach (unless?), form will mostly all be type, speed, scale - could even add cooldown into there?

export const spellbolt = {
    id:"spellbolt",
    cooldown: 300,
    //not really sure if i need redundancy below with resource and required, but it is an important distinction
    //incase there is a spell that REQUIRES 10 health, but doesnt COST/CONSUME 10 health
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
        {type: "damage", amount: 5},
        {type: "mana_leech", amount: 20},
        {type: "slow", duration: 500, amount: 0.4}
    ]

}

export const spellnova = {
    id:"spellnova",
    cooldown: 600,
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
            duration: 150,
            trigger: 100,
            radius: 200, 
            base_scale: 0.25,
            max_scale: 1, 
            scale_incrementor: 0.25,
        }

    },
    effect: [
        {type: "knockback", amount: 75}
    ]
}

export const spellblast = {
    id:"spellblast",
    cooldown: 600,
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
                "Images/spellnova_test.png"
            ],
            duration: 150,
            radius: 150,
            base_scale: 1,
            max_scale: 1,
            scale_incrementor: 0.25
        }
    },
    effect: [
        {type: "damage", amount: 10},
        {type: "slow", duration: 500, amount: .75}
    ]
}

//maybe add spritePath?

//if an effect is a dot, or multi tick nova, then under effect, there would be type: damage, amount 10, hitCount/tick: 5, interval: 200, or something akin to this