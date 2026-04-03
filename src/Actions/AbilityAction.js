import Action from "./Action.js";
import { spellbolt } from "../../data/ability_data/spellbolt.js";
import { castAbility } from "../AbilityLogic/AbilityLogic.js";
export default class AbilityAction extends Action {
    constructor(ability) {
        super();
        this.ability = ability;
    }



    process(source, input, parameterSet ) {
        
    }


}