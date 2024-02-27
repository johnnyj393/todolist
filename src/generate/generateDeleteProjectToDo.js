// Generates a row for a to do that is associated with a project that is being deleted

// Div for the selector
const projectSelectorDiv = document.getElementById("projectSelectorDiv");

function generateDeleteProjectToDo(associatedToDo) {
  // Row wrapper
  const toDoRow = document.createElement("div");
  toDoRow.classList.add("to-do-block");
  toDoRow.classList.add("to-do-row");

  // Title of to do
  const toDoTitle = document.createElement("div");
  toDoTitle.textContent = associatedToDo.title;
  toDoRow.appendChild(toDoTitle);

  // Project selector div
  const deleteProjectSelectorDiv = projectSelectorDiv.cloneNode(true);
  // Change to have unique id
  deleteProjectSelectorDiv.id = `deleteProjectSelectorFor${associatedToDo.title}`;
  // Get actual selector to set value
  const deleteProjectSelector =
    deleteProjectSelectorDiv.querySelector("#selectToDoProject");
  // Change to have unique id
  deleteProjectSelector.id = `deleteProjectSelectorFor${associatedToDo.title}`;
  // Change name to be identified uniquely after submission
  deleteProjectSelector.name = associatedToDo.title;

  // Have current project selected when modal comes up
  deleteProjectSelector.value = associatedToDo.project;

  toDoRow.appendChild(deleteProjectSelectorDiv);

  return toDoRow;
}

export default generateDeleteProjectToDo;
