import { gnarled_staff } from "./weapon_data.js"

export const item_repository = {
    weapons: {
        [gnarled_staff.id]: gnarled_staff,
    },
}



//could switch to having several repos here, such as weapon_repository, armor_repository,etc.
//if things get messy or too lengthy, may even have to split into separate files such as weapon_repository.js with an eponymous repo obj