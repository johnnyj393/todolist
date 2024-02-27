import { storage, todo, main } from "../executive/config";
import generateToDo from "../generate/generateToDo";

// Will manage what ToDos to display

// Get counts
const todayCount = document.getElementById("todayCount");
const thisWeekCount = document.getElementById("thisWeekCount");

function updateToDos(toDos) {
  // Clear existing To-Dos
  main.innerHTML = "";
  // Get all ToDos
  // const allToDos = storage.get(todo);
  // Sort by parameters
  // type, value
  // Display
  if (Object.keys(toDos).length === 0) {
    console.log("Nothing to do!");
  } else {
    Object.entries(toDos).forEach((toDoItem) => {
      const toDoElement = generateToDo(toDoItem[1]);
      main.appendChild(toDoElement);
    });
  }

  // Also update counters on the side to today and this week
  // Get number of todos
  todayCount.textContent = Object.keys(
    storage.sort(storage.get(todo), "today")
  ).length;
  thisWeekCount.textContent = Object.keys(
    storage.sort(storage.get(todo), "week")
  ).length;
}

export default updateToDos;
