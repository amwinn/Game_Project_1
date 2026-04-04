import Action from "./Action.js";
import { ability_repository } from "../../data/ability_data/ability_repository.js";
import { castAbility } from "../AbilityLogic/AbilityLogic.js";
export default class AbilityAction extends Action {
    constructor(abilityID) {
        super();
        this.abilityID = abilityID;
    }



    process(source, input, parameterSet ) {
        const ability = ability_repository[this.abilityID];
        castAbility(ability);
    }


}