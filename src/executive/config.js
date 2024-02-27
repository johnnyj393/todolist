import storageManager from "./store";

// Global Variables

// Key when storing data
export const project = "project";
export const todo = "todo";
export const note = "note";

export const title = "title";
export const oldTitle = "oldTitle";

export const widthOne = 830;
export const widthTwo = 630;

export const formKey = {
  project: {
    title: "newProjectTitle",
    description: "newProjectDescription",
  },
  todo: {
    title: "newToDoTitle",
    description: "newToDoDescription",
    date: "newDueDate",
    priority: "newPriority",
    project: "selectToDoProject",
  },
  note: {
    title: "newNoteTitle",
    description: "newNoteDescription",
  },
};

// Add new project / to do / note window constant values
export const toggleTabs = {
  project: {
    name: "New Project",
    window: document.getElementById("formProject"),
  },
  todo: {
    name: "New To-Do Task",
    window: document.getElementById("formToDo"),
  },
  note: {
    name: "New Note",
    window: document.getElementById("formNote"),
  },
};

// Global storage manager
export const storage = storageManager();

// Main block
export const main = document.getElementById("main");

// Practice data to load at beginning

export const todos = [
  {
    title: "Read",
    description: "Read the Chinese novel, don't give up!",
    date: "2024-02-21",
    priority: "high",
    project: "Self-Improvement",
  },
  {
    title: "Crossfit",
    description: "Do it",
    date: "2024-02-22",
    priority: "medium",
    project: "Exercise",
  },
  {
    title: "Finish this project",
    description: "Finish to do project (this website)",
    date: "2024-02-23",
    priority: "medium",
    project: "Programming",
  },
  {
    title: "Listen to Chinese News Podcast",
    description: "Listen to the podcast of the day",
    date: "2024-02-25",
    priority: "medium",
    project: "Podcasts",
  },
  {
    title: "Study Chinese",
    description: "Study the 4 character chengyu flashcards that you made.",
    date: "2024-02-26",
    priority: "medium",
    project: "Language",
  },
  {
    title: "Cook for the week",
    description: "Do meal prep for the week",
    date: "2024-02-27",
    priority: "high",
    project: "Cooking",
  },
  {
    title: "Buy clothes",
    description: "Get some new clothes and treat yourself!",
    date: "2024-02-28",
    priority: "low",
    project: "Shopping",
  },
  {
    title: "DD",
    description: "Drunk drive (Mario Kart) with the peeps!",
    date: "2024-03-02",
    priority: "medium",
    project: "Social",
  },
  {
    title: "Birthday",
    description: "Call sis for her birthday!",
    date: "2024-03-19",
    priority: "high",
    project: "Social",
  },
  {
    title: "Work",
    description: "Work 5-9",
    date: "2024-02-20",
    priority: "medium",
    project: "General",
  },
  {
    title: "Cut Hair",
    description: "Buzz it baby",
    date: "2024-02-21",
    priority: "high",
    project: "Self-Improvement",
  },
  {
    title: "Finish todo list",
    description: "Finish this goddamn todo list project!",
    date: "2024-02-24",
    priority: "medium",
    project: "Programming",
  },
  {
    title: "Take a walk",
    description: "Take a walk outside today",
    date: "2024-02-24",
    priority: "high",
    project: "Exercise",
  },
];

export const projects = [
  { title: "General", description: "Things in life we just gotta do." },
  { title: "Shopping", description: "Things to buy." },
  {
    title: "Exercise",
    description: "This project includes all exercise goals and plans.",
  },
  {
    title: "Self-Improvement",
    description: "Things like reading, listening to podcasts, etc",
  },
  {
    title: "Social",
    description: "Calling family members, making plans with friends, etc.",
  },
  {
    title: "Programming",
    description:
      "Things related to programming development, goals, projects, etc.",
  },
  { title: "Cooking", description: "Goals related to cooking" },
  { title: "Health", description: "Health related goals" },
  { title: "Leisure", description: "All leasure activities" },
  { title: "Podcasts", description: "All the podcasts I want to listen to." },
  { title: "Language", description: "Studying language" },
];

export const notes = [
  {
    title: "Favorite Movies",
    description: "Gladiator<div>Beauty and the Beast</div><div>Zoolander</div>",
  },
  { title: "Favorite People", description: "Mom↵Dad↵Michael↵Jen↵Val↵Maria" },
  { title: "Favorite Places", description: "1223↵2845↵7842" },
  { title: "Favorite Drinks", description: "Coke↵Mountain Dew↵Water" },
];
