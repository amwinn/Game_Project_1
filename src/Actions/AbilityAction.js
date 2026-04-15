import Action from "./Action.js";
import { ability_repository } from "../../data/ability_data/ability_repository.js";
import { castAbility } from "../AbilityLogic/AbilityLogic.js";
import { validationCheck } from "../AbilityLogic/AbilityValidation.js";
export default class AbilityAction extends Action {
    constructor(abilityID) {
        super();
        this.abilityID = abilityID;
    }



    process(source, dataSet ) {
        const ability = ability_repository[this.abilityID];
        // castAbility(ability, source, dataSet);
        if(validationCheck(source, ability.required)) {
           castAbility(ability, source, dataSet);
           console.log(validationCheck(source, ability.required))
        }
    }


}