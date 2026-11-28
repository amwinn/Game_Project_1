import { gameUI } from "../Main.js"

const vitalsContainer = document.createElement("div");

const healthBarContainer = document.createElement("div");
const manaBarContainer = document.createElement("div");
const staminaBarContainer = document.createElement("div");
vitalsContainer.appendChild(healthBarContainer, manaBarContainer, staminaBarContainer);


gameUI.appendChild(vitalsContainer);
