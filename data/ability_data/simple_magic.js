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
            sprite: "../images/spellbolt_test.png",
            radius: 15,
            speed: 5,
            scale: 1.25 //not sure if i really need, just incase for dynamic size or something, remove if doesnt come to fruition
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
        type: "eruptive",
        data_config: {
            sprite: [
                "../images/abilities/simple_magic/spellnova_1.png","../images/abilities/simple_magic/spellnova_1.png","../images/abilities/simple_magic/spellnova_1.png"
            ],
            animation_duration: 200,
            radius: 150, 
            base_scale: 0.25,
            max_scale: 1, 
            scale_incrementor: 0.25,
        }

    },
    effect: [
        {type: "damage", amount: 150}
    ]
}

//maybe add spritePath?

//if an effect is a dot, or multi tick nova, then under effect, there would be type: damage, amount 10, hitCount/tick: 5, interval: 200, or something akin to this