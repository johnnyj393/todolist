import { toggleTabs } from "./config";

// Set up controls to manipulate modal windows

// Constants

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

// Crearte new side dash associated constants
const newDashOptions = document.querySelectorAll(".newDash");
var newTitle = document.getElementById("newTitle");

// Modal event listeners

// Open create new modal buttons
openModalButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    switchNewTab(button.dataset.type);
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
    event.stopPropagation();
  });
});

// Exit modal buttons - not submit buttons
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// Event listeners for dash side toggle new buttons
newDashOptions.forEach((option) => {
  option.addEventListener("click", () => {
    switchNewTab(option.dataset.type);
  });
});

// Functions

// Toggle among the 3 available tabs
export function switchNewTab(type) {
  // Switch name to currently selected type of new item
  newTitle.textContent = toggleTabs[type].name;
  // Unhide all
  for (const option of Object.values(toggleTabs)) {
    option.window.classList.remove("hide");
  }
  // Hide the ones we don't want
  for (const [key, option] of Object.entries(toggleTabs)) {
    if (key !== type) {
      option.window.classList.add("hide");
    }
  }
  // Change right side hightlighted part
}

// Functions to show and hide modal
export function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

export function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
