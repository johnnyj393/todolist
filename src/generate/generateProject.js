import { deleteProject } from "../executive/main";

// Creates html for a project block

function generateProject(project) {
  // Make wrapper
  const projectBlock = document.createElement("div");
  projectBlock.classList.add("to-do-block");

  // Project row
  const projectRow = document.createElement("div");
  projectRow.classList.add("to-do-row");

  // Title
  const projectTitle = document.createElement("span");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;
  projectRow.appendChild(projectTitle);

  // Body
  const projectDescription = document.createElement("span");
  projectDescription.classList.add("project-description");
  projectDescription.textContent = project.description;
  projectRow.appendChild(projectDescription);

  // Delete button
  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.innerHTML = "Delete";
  deleteProjectButton.classList.add("to-do-button");
  deleteProjectButton.addEventListener("click", () => deleteProject(project));
  projectRow.appendChild(deleteProjectButton);

  // Append row
  projectBlock.appendChild(projectRow);

  return projectBlock;
}

export default generateProject;
