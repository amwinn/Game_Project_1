import Action from "./Action.js";
import { ability_repository } from "../../data/ability_data/ability_repository.js";
import { castAbility } from "../AbilityLogic/AbilityLogic.js";
import { requiredCheck, resourceCheck } from "../AbilityLogic/AbilityValidation.js";
export default class AbilityAction extends Action {
    constructor(ability) {
        super();
        this.ability = ability;
    }



    process(source, dataSet) {
        const ability = this.ability; //was const ability = ability_repository[this.abilityID]; when ability_repository only had one layer instead of simple_magic/frost objects layer
        if(resourceCheck(source, ability.resource)) {
           castAbility(ability, source, dataSet);
           console.log(resourceCheck(source, ability.resource))
        }
    }


}


//Notes
//Until recently ability property was abilityID, but now the ability object itself is passed into ability action class from keybindings config