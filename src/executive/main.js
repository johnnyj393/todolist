import { todo, storage, project, note, main, widthTwo } from "./config";
import updateNotes from "../update/updateNotes";
import updateProjects from "../update/updateProjects";
import updateToDos from "../update/updateToDos";
import { deleteProjectClicked } from "./form";

// Controls manipulation of main page

// Get all tabs to add event listeners to
const switchMain = document.querySelectorAll("[data-switch-main]");

// Toggle dash button
const dash = document.getElementById("dash");
const hideDashButton = document.getElementById("hideDashButton");

// Toggle dash projects button
const collapseProjectsButton = document.getElementById(
  "collapseProjectsButton"
);
const dashProjectDisplay = document.getElementById("dashProjectDisplay");
const icon = collapseProjectsButton.querySelector("i");
// Images for collapse and expand projects button
const collapseProjects = document.createElement("i");
collapseProjects.className = "fa-solid fa-chevron-up";
const expandProjects = document.createElement("i");
expandProjects.className = "fa-solid fa-chevron-down";

// Toggle what is shown on the main area
switchMain.forEach((button) => {
  button.addEventListener("click", function (event) {
    const target = event.target.closest("[data-switch-main]");
    const targetType = target.dataset.type;
    const targetSort = target.dataset.sort;
    storage.setCurrent(targetType, targetSort);
    update();
  });
});

// Toggle side dash
hideDashButton.addEventListener("click", hideDash);

function hideDash() {
  dash.classList.toggle("retract");
  main.classList.toggle("retract");
}

// Toggle dash projects (and switch image on button)
collapseProjectsButton.addEventListener("click", function (event) {
  // Toggle projects div hide / unhide
  dashProjectDisplay.classList.toggle("hide");
  // Toggle the classlists to switch image
  icon.classList.toggle("fa-chevron-up");
  icon.classList.toggle("fa-chevron-down");
  event.stopPropagation();
});

// Universal update function
export function update() {
  // Get data from current
  const [type, data] = storage.getCurrent();

  // Sort current into type and data to display
  switch (type) {
    case project:
      if (main.classList.contains("notes")) {
        main.classList.remove("notes");
      }
      updateProjects(data, true);
      break;
    case todo:
      if (main.classList.contains("notes")) {
        main.classList.remove("notes");
      }
      updateToDos(data);
      break;
    case note:
      updateNotes(data);
      // Toggle for grid view
      main.classList.toggle("notes");
      break;
    default:
      console.log("Failed to update projects / todos / notes");
  }
}

// Delete a To-Do from the main area and storage
export function deleteToDo(toDoTitle) {
  // Delete from DOM specifically
  // Later - delete from data then update() !!!!!!!!
  const trashElement = document.getElementById(`toDo${toDoTitle}`);
  trashElement.remove();
  // Delete from storage
  storage.remove(todo, toDoTitle);
  // Refresh To-Dos - need?
}

// Delete a project from the main area and storage
export function deleteProject(trashProject) {
  // Only bring up modal if there is more than 1 project
  if (storage.get(project).length > 1) {
    deleteProjectClicked(trashProject);
  } else {
    alert("You must have at least 1 project at all times.");
  }
}

export function deleteNote(noteTitle) {
  // Remove note from DOM
  const noteBlock = document.getElementById(`note${noteTitle}`);
  noteBlock.remove();
  // Remove from storage
  storage.remove(note, noteTitle);
}

// Event listener for window
window.addEventListener("resize", adjustMainContent);

// Adjust content based on width
export function adjustMainContent() {
  // Updates screen based on content
  update();
  // Collapses bar if less than second width
  if (window.innerWidth < widthTwo) {
    if (!dash.classList.contains("retract")) {
      hideDash();
    }
  }
  // Dash opens into entire width when less than second width
}

// function hideDash() {
//   dash.classList.toggle("retract");
//   main.classList.toggle("retract");
// }
