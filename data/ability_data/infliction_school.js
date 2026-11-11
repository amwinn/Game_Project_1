
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





