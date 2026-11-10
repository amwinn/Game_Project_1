
export const strike = {
    id: "strike",
    damage_type: {
        category: "physical",
        type: "infliction"
    },
    cooldown: 3,
    resource: [
        {type: "stamina", amount: 10}
    ],
    required: [
        {type: "stamina", amount: 10}
    ],
    form: {
        type: "conal",
        behavior: "static",
        data_config: {
            sprite: [],
            radius: 5
        },
    },
    effect: [
        {type: "damage", amount: 10}
    ]

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
