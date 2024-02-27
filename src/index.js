import "./css/reset.css";
import "./css/styles.css";
import "./css/modal.css";
import "./executive/modal.js";
import "./executive/form.js";
import "./executive/main.js";
import updateProjects from "./update/updateProjects.js";
import { update, adjustMainContent } from "./executive/main.js";
import {
  storage,
  project,
  todo,
  todos,
  projects,
  notes,
} from "./executive/config.js";

// Later change to make sure there is at least 1 project
if (!localStorage.getItem(project)) {
  // This would normally default to have a "General" project when starting
  // with a blank slate

  // const projectsData = [];
  // const projectGeneral = {
  //   title: "General",
  //   description: "Things in life we just gotta do.",
  // };
  // projectsData.push(projectGeneral);
  //localStorage.setItem(project, JSON.stringify(projectsData));

  //  Load all sample data in
  localStorage.setItem(todo, JSON.stringify(todos));
  localStorage.setItem(project, JSON.stringify(projects));
  localStorage.setItem(notes, JSON.stringify(notes));
}

// Makes sure projects are up to date in dash and new todo dropdown
updateProjects(storage.get(project));

// Set current as all todos
// Switched to project for ease of testing
const current = "todo";
const sort = "all";
storage.setCurrent(current, sort);

// Display all ToDos on main page
update();

// Adjust based on screen size
adjustMainContent();
