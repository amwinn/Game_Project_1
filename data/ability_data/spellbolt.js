//WIP, format not finalized
//id may be redundant
//need the array [] for required and effect because ill be feeding into a forEach (unless?), form will mostly all be type, speed, scale - could even add cooldown into there?

export const spellbolt = {
    id:"spellbolt",
    cooldown: 300,
    required: {
        type: "mana", amount: 10
    },
    form: {
        type: "projectile",
        speed: 5,
        scale: 1 //might need this to allow dynamic spell size? remove if it doesnt work out
    },
    effect:[{type: "damage", amount: 20}
    ]

}

const firebolt = {
    id:"firebolt",
    cooldown: 600,
    required: {
        type: "mana", amount: 20
    },
    form: {
        type: "projectile",
        speed: 5,
        scale: 1
    },
    effect: {
        type: "damage", amount: 50
    }
}