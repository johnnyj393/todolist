import { widthOne } from "../executive/config";
import { editClicked } from "../executive/form";
import { deleteToDo } from "../executive/main";
import { format } from "date-fns";

// Generates HTML for a new To Do item

function generateToDo(toDo) {
  // Main block
  const toDoBlock = document.createElement("div");
  toDoBlock.classList.add("to-do-block");
  toDoBlock.id = `toDo${toDo.title}`;

  // Under main 1 - to do info, the entire row
  const toDoBlockMain = document.createElement("div");
  toDoBlockMain.classList.add("to-do-row");

  // Under main 2 - detail info (drop down)
  const detailsBlock = document.createElement("div");
  detailsBlock.classList.add("to-do-details");
  detailsBlock.classList.add("hide");

  // First will be checkbox to govern completeness
  const checkbox = document.createElement("input");
  checkbox.classList.add("to-do-checkbox");
  // What should I make it do???
  checkbox.type = "checkbox";
  toDoBlockMain.appendChild(checkbox);

  // Add title
  const toDoTitle = document.createElement("span");
  toDoTitle.classList.add("to-do-title");
  toDoTitle.textContent = toDo.title;
  toDoBlockMain.appendChild(toDoTitle);

  // Details button
  const toDoDetails = document.createElement("button");
  toDoDetails.textContent = "Details";
  toDoDetails.classList.add("to-do-button");
  toDoDetails.addEventListener("click", () => detailsClicked(detailsBlock));

  // Adjust on width
  if (window.innerWidth > widthOne) {
    // Put in row
    const toDoProject = document.createElement("span");
    toDoProject.classList.add("to-do-project");
    toDoProject.textContent = toDo.project;
    toDoBlockMain.appendChild(toDoProject);

    // Put details button between project and date
    toDoBlockMain.appendChild(toDoDetails);

    // Due Date
    const toDoDueDate = document.createElement("span");
    toDoDueDate.classList.add("to-do-due-date");
    // Change to better looking format for date
    const formattedDate = format(toDo.date, "M/d");
    toDoDueDate.textContent = formattedDate;
    toDoBlockMain.appendChild(toDoDueDate);
  } else {
    // Put in details
    const toDoProjectDiv = document.createElement("div");
    const toDoProjectLabel = document.createElement("label");
    toDoProjectLabel.classList.add("detail-label");
    toDoProjectLabel.textContent = "Project: ";
    const projectText = document.createElement("span");
    projectText.textContent = toDo.project;
    toDoProjectDiv.appendChild(toDoProjectLabel);
    toDoProjectDiv.appendChild(projectText);
    detailsBlock.appendChild(toDoProjectDiv);

    // Put details button between project and date
    toDoBlockMain.appendChild(toDoDetails);

    // Put in details
    const dateDiv = document.createElement("div");
    const dateLabel = document.createElement("label");
    dateLabel.classList.add("detail-label");
    dateLabel.textContent = "Due Date: ";
    const dateText = document.createElement("span");
    dateText.textContent = toDo.date;
    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateText);
    detailsBlock.appendChild(dateDiv);
  }

  // Edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("to-do-button");
  editButton.addEventListener("click", () => editClicked(toDo));
  toDoBlockMain.appendChild(editButton);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("to-do-button");
  deleteButton.addEventListener("click", () => deleteToDo(toDo.title));
  toDoBlockMain.appendChild(deleteButton);

  // Append toDo main block to the toDo block
  toDoBlock.appendChild(toDoBlockMain);

  // Details drop down section
  // Priority
  const priorityDiv = document.createElement("div");
  const priorityLabel = document.createElement("label");
  priorityLabel.classList.add("detail-label");
  priorityLabel.textContent = "Priority: ";
  const priority = document.createElement("span");
  priority.textContent = toDo.priority;
  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(priority);
  detailsBlock.appendChild(priorityDiv);

  // Descriptions
  const descriptionDiv = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.classList.add("detail-label");
  descriptionLabel.textContent = "Description: ";
  const description = document.createElement("span");
  description.textContent = toDo.description;
  descriptionDiv.appendChild(descriptionLabel);
  descriptionDiv.appendChild(description);
  detailsBlock.appendChild(descriptionDiv);

  // Append details block to main
  toDoBlock.appendChild(detailsBlock);

  return toDoBlock;
}

// Toggle detail drop down showing for each row
function detailsClicked(block) {
  if (block.classList.contains("hide")) {
    block.classList.remove("hide");
  } else {
    block.classList.add("hide");
  }
}

export default generateToDo;
