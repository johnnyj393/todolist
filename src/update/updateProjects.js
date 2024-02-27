import { storage, project, main } from "../executive/config";
import generateProject from "../generate/generateProject";

// DOM elements to edit
const dashProjects = document.getElementById("dashProjectDisplay");
const selectProjects = document.getElementById("selectToDoProject");

// Updates projects in storage and on screen if display input is true
function updateProjects(
  currentProjects = storage.get(project),
  display = false
) {
  // Clear dash projects
  dashProjects.innerHTML = "";
  // Clear project selector
  selectProjects.innerHTML = "";
  // Clear main if we are to refresh display
  if (display) {
    main.innerHTML = "";
  }

  // There wil always be at least 1 project, so this will never fail
  Object.entries(currentProjects).forEach(([key, projectItem]) => {
    addToDash(projectItem.title);
    addToNewToDo(projectItem.title);
    if (display) {
      const displayBlock = generateProject(projectItem);
      main.appendChild(displayBlock);
    }
  });
}

// Add project to dash on side
function addToDash(name) {
  const newDashProject = document.createElement("div");
  newDashProject.textContent = name;
  newDashProject.setAttribute("data-switch-main", "");
  newDashProject.setAttribute("data-type", project);
  newDashProject.setAttribute("data-sort", name);
  // Eventually add delete button? which will delete all todos with that project?
  dashProjects.appendChild(newDashProject);
}

// Add project to main todo form selector
function addToNewToDo(name) {
  const newProjectOption = document.createElement("option");
  newProjectOption.value = name;
  newProjectOption.text = name;
  selectProjects.add(newProjectOption);
}

export default updateProjects;
