import { spellbolt, spellnova, spellblast } from "./simple_magic.js"

export const ability_repository = {
    [spellbolt.id]: spellbolt,
    [spellnova.id]: spellnova,
    [spellblast.id]: spellblast,
}