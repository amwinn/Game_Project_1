export const ABILITY_ENTITY_TYPE = {
    PROJECTILE: "projectile",
    AOE: "aoe",
    MODIFIER_CONDITIONAL: "modifier_conditional", //a chosen talent or a skillup, or as long as a certain item is equipped
    MODIFIER_ACTIVE: "modifier_active", //an active, timed modifier such as buff/debuff
    EFFECT_OVER_TIME: "effect_over_time",
}

//might only want projectile and aoe in here, modifier conditional/active could be placed elsewhere, same for effect over time, although effect over time
//already inherits a type/subtype from the spell data