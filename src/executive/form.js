import updateProjects from "../update/updateProjects";
import { update } from "./main";
import { openModal, closeModal } from "./modal";
import generateDeleteProjectToDo from "../generate/generateDeleteProjectToDo";
import { project, todo, formKey, title, oldTitle, storage } from "./config";

// Handles everything pertaining to the form

// Get main three forms
const forms = document.querySelectorAll(".createNewForm");

// Edit modal associated constants
const editModal = document.getElementById("editModal");
const editModalMain = document.getElementById("editModalMain");

// Get delete project form and associated constants
const deleteProjectTitle = document.getElementById("deleteProjectTitle");
const deleteProjectModal = document.getElementById("deleteProjectModal");
const deleteProjectForm = document.getElementById("deleteProjectForm");
const deleteProjectWarning = document.getElementById("deleteProjectWarning");

// Submit action for three main forms
forms.forEach((form) => {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Get type
    const type = event.target.dataset.type;
    // Block duplicate todos since their identifiers are their names
    // Could change to uuid later but its not a big deal for this practice project
    if (storage.isDuplicate(type, formData.get(formKey[type][title]))) {
      alert("Duplicate name detected! Please choose a different name.");
    } else {
      // Extract data from form
      const cleanData = getCleanData(type, formData);
      // Store data in local storage
      storage.store(type, cleanData);
      // Update current screen
      update();
      // Update projects on side bar and project selector
      if (type === project) {
        updateProjects();
      }
      // Reset form for future use
      event.target.reset();
      // Close modal after submitted
      closeModal(event.target.closest(".modal"));
    }
  });
});

// Extracts data from the form using form key from config
function getCleanData(type, data) {
  const cleanData = {};
  for (const [key, element] of Object.entries(formKey[type])) {
    cleanData[key] = data.get(element);
  }
  return cleanData;
}

// Event listener for edit modal submit button
editModalMain.addEventListener("submit", function (event) {
  event.preventDefault();
  // Target is the whole form
  const formData = new FormData(event.target);
  const type = event.target.dataset.type;
  const oldToDoTitle = formData.get(oldTitle);
  const cleanData = getCleanData(type, formData);
  storage.editToDoName(todo, oldToDoTitle, cleanData);

  update();
  closeModal(event.target.closest(".modal"));
});

// Event listener for delete project modal submit button
deleteProjectForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Target is the whole form
  const formData = new FormData(event.target);
  // Project to be deleted
  const projectToDelete = formData.get("projectToDelete");
  // Get all associated todo items
  const associatedToDosDict = {};
  for (const [key, value] of formData.entries()) {
    // Only include todos, not hidden "projectToDelete"
    if (key !== "projectToDelete") {
      associatedToDosDict[key] = value;
    }
  }

  // First, change data in todos and update project if there were any changes
  Object.entries(associatedToDosDict).forEach(([name, newProject]) => {
    storage.editToDoProject(todo, name, newProject);
  });

  // Second, delete all todos with that project name
  const namesToDelete = storage
    .get(todo)
    .filter((toDoItem) => toDoItem.project === projectToDelete)
    .map((toDoItem) => toDoItem.title);

  namesToDelete.forEach((toDoName) => {
    storage.remove(todo, toDoName);
  });

  // Third, delete project (make sure it gets deleted from dash and options; opposite of create project)
  storage.remove(project, projectToDelete);
  // Update dash and project selector
  updateProjects();

  // Update screen
  update();
  closeModal(event.target.closest(".modal"));
});

// Build edit form
export function editClicked(editToDo) {
  const editForm = formToDo.cloneNode(true);
  // Make sure it is not hidden after cloning
  // the 3 main forms are sometimes hidden depending on what creation the user wants
  if (editForm.classList.contains("hide")) {
    editForm.classList.remove("hide");
  }
  // Create specific id
  editForm.id = "editForm";
  // Set old id hidden to secretly store when it is submitted
  const oldToDoTitle = document.createElement("input");
  oldToDoTitle.type = "hidden";
  oldToDoTitle.name = oldTitle;
  oldToDoTitle.value = editToDo.title;
  // Build form based off of selected todo
  editForm.appendChild(oldToDoTitle);
  editForm.querySelector("#newToDoTitle").value = editToDo.title;
  editForm.querySelector("#newToDoDescription").value = editToDo.description;
  editForm.querySelector("#newDueDate").value = editToDo.date;
  const priorityRadioButtons = editForm.querySelectorAll(
    'input[name="newPriority"]'
  );
  for (const radio of priorityRadioButtons) {
    if (radio.value === editToDo.priority) {
      radio.checked = true;
    }
  }
  editForm.querySelector("#selectToDoProject").value = editToDo.project;

  // This clears out previous edit modal
  editModalMain.innerHTML = "";
  editModalMain.appendChild(editForm);
  openModal(editModal);
}

// Build delete project form
export function deleteProjectClicked(trashProject) {
  // Only open modal if there is at least 1 project - can't have none
  // Set title for modal
  deleteProjectTitle.textContent = "Delete Project: " + trashProject.title;
  // Set warning for modal
  deleteProjectWarning.textContent = `All To-Do items of project ${trashProject.title} will subsequently be deleted. Change project of items you would like to keep.`;

  // Clean delete project form before adding to it
  deleteProjectForm.innerHTML = "";

  // Get data to be displayed
  // data will be all todos, and it needs to be sorted by the title of the project
  const associatedToDos = storage.sort(storage.get(todo), trashProject.title);

  // Build rows and add to form
  Object.entries(associatedToDos).forEach(([key, value]) => {
    const toDoRow = generateDeleteProjectToDo(value);
    deleteProjectForm.appendChild(toDoRow);
  });

  // Add hidden item in form that declares the project to be deleted upon submission
  const hiddenProjectToDelete = document.createElement("input");
  hiddenProjectToDelete.type = "hidden";
  hiddenProjectToDelete.name = "projectToDelete";
  hiddenProjectToDelete.value = trashProject.title;
  deleteProjectForm.appendChild(hiddenProjectToDelete);

  openModal(deleteProjectModal);
}
