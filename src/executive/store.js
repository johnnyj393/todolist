import { title, project, todo, note } from "./config";
import { format, add } from "date-fns";

// Manages storage
// Types - projects / todos / notes
// Case-sensitive

function storageManager() {
  function store(type, data) {
    console.log(data);
    const storageData = get(type);
    // Three main data types are stored as arrays in local storage to maintain order when unsorted
    storageData.push(data);
    localStorage.setItem(type, JSON.stringify(storageData));
  }

  function get(type) {
    var existing = localStorage.getItem(type);
    // Put something in here later to sort out the index arrays from that data that
    // you (may or may not need?) in your code
    if (existing) {
      if (type === note) {
        // Make sure new lines show up
        // const formattedText = existing.replace(/\n/g, "br");
        // return JSON.parse(formattedText);
      }
      return JSON.parse(existing);
    } else {
      return [];
    }
  }

  function editToDoName(type, oldName, newData) {
    const existingData = get(type);
    const indexUpdate = existingData.findIndex(
      (dataSet) => dataSet[title] === oldName
    );
    if (indexUpdate !== -1) {
      existingData[indexUpdate] = newData;
    }
    // Store new data in storage
    localStorage.setItem(type, JSON.stringify(existingData));
  }

  function editToDoProject(type, toDoName, newProject) {
    const existingData = get(type);
    // Find to do to edit
    const indexUpdate = existingData.findIndex(
      (toDoItem) => toDoItem[title] === toDoName
    );
    if (indexUpdate !== -1) {
      existingData[indexUpdate].project = newProject;
    }
    // Store new data in storage
    localStorage.setItem(type, JSON.stringify(existingData));
  }

  function editNoteDescription(type, name, newD) {
    const existingData = get(type);
    const indexUpdate = existingData.findIndex((note) => note[title] === name);
    if (existingData !== -1) {
      existingData[indexUpdate].description = newD;
    }
    // Store new data
    console.log("Saved");
    localStorage.setItem(type, JSON.stringify(existingData));
  }

  function remove(type, name) {
    const storageData = get(type);
    for (const [index, dataSet] of Object.entries(storageData)) {
      // Remove old to do from storage
      if (name === dataSet.title) {
        // Delete data
        storageData.splice(index, 1);
      }
    }
    localStorage.setItem(type, JSON.stringify(storageData));
  }

  function isDuplicate(type, name) {
    const storageData = get(type);
    if (Object.keys(storageData).length === 0) {
      return false;
    }
    for (const [index, dataSet] of Object.entries(storageData)) {
      if (name === dataSet.title) {
        return true;
      }
    }
    return false;
  }

  function setCurrent(type, sort) {
    // This will save what is currently being displayed
    // This if statement says if a type: project not "all" is passed in, it will grab data for todos
    // to display (to be sorted by the respective project later)
    if (type === project && sort !== "all") {
      type = todo;
    }
    const current = { type, sort };
    localStorage.setItem("current", JSON.stringify(current));
  }

  function getCurrent() {
    // Fetches data to be displayed, sorts by "current"
    // Also returns the type so it knows whether to display todo or note
    const current = get("current");
    const dataToSort = get(current.type);
    return [current.type, sort(dataToSort, current.sort)];
  }

  function sort(data, sort) {
    // Data passed in is already of the correct type; below will sort data without needing to know type
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");
    // Sorts depending on what is clicked
    switch (sort) {
      case "all":
        return data;
      case "today":
        const newData = {};
        Object.entries(data).forEach(([key, item]) => {
          if (formattedDate === item["date"]) {
            newData[key] = item;
          }
        });
        return newData;
      case "week":
        // Make week array
        const nextWeekDates = [];
        for (let i = 0; i < 7; i++) {
          const currentDate = add(today, { days: i });
          const formattedDate = format(currentDate, "yyyy-MM-dd");
          nextWeekDates.push(formattedDate);
        }
        // Compare and grab todos from next week
        const thisWeekToDoList = {};
        for (const date of nextWeekDates) {
          Object.entries(data).forEach(([key, item]) => {
            if (date === item["date"]) {
              thisWeekToDoList[key] = item;
            }
          });
        }
        return thisWeekToDoList;
      default:
        // Sort through the todos ie data, match it with project ie sort
        const dataSortedByProject = {};
        Object.entries(data).forEach(([key, item]) => {
          if (sort === item.project) {
            dataSortedByProject[key] = item;
          }
        });
        return dataSortedByProject;
    }
  }

  return {
    store,
    get,
    editToDoName,
    editToDoProject,
    editNoteDescription,
    remove,
    isDuplicate,
    setCurrent,
    getCurrent,
    sort,
  };
}

export default storageManager;
