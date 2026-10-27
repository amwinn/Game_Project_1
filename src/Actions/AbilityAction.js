import Action from "./Action.js";
import { ability_repository } from "../../data/ability_data/ability_repository.js";
import { castAbility } from "../AbilityLogic/AbilityLogic.js";
import { requiredCheck, resourceCheck } from "../AbilityLogic/AbilityValidation.js";
export default class AbilityAction extends Action {
    constructor(abilityID) {
        super();
        this.abilityID = abilityID;
    }



    process(source, dataSet) {
        const ability = ability_repository[this.abilityID];
        if(resourceCheck(source, ability.resource)) {
           castAbility(ability, source, dataSet);
           console.log(resourceCheck(source, ability.resource))
        }
    }


}