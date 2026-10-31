export const frostbolt = {
    id:"frostbolt",
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
        {type: "slow", duration: 10, amount: 0.3}
    ]

}

//had to recreate file due to file retaining capital F in the windows files somehow