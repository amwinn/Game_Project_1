
//just initial foundations, need to test around how this will actually look/manifest
export function validationCheck(source, conditions) {
    return conditions.every((condition) => {
        switch (condition.type){
            case "mana":
                return source.mana > condition.cost;
        }
    });
//will need to cycle through all requirement types
//mana
//level
//item (armour, wep, etc.)
//ability_unlocked
//unaffected_buff
//unaffected_debuff
//off_cooldown


//return true/false?
}

//will import this function at AbilityAction.js?

//array as param?
//array.forEach((requirement, index) => {switch case for mana/level/etc. etc.})
//so in a case where requirement.type = affected_debuff, if player.debuffs has [affected_debuff.debuff] something like that perhaps? not sure how to store active buffs/debuffs/modifiers on player
//maybe have modifiers_players = []; on initialization, and add/remove stuff from it? maybe const modifiers_player = {}
