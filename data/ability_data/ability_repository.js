import { frostbolt } from "./Frost_magic.js"
import { spellbolt, spellnova, spellblast } from "./simple_magic.js"

export const ability_repository = {
    simple_magic: {
    [spellbolt.id]: spellbolt,
    [spellnova.id]: spellnova,
    [spellblast.id]: spellblast,
    },

    frost: {
    [frostbolt.id]: frostbolt
    }


}