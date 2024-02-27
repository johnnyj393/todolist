import { main } from "../executive/config";
import generateNote from "../generate/generateNote";

// Updates notes section when new one is added

function updateNotes(notes) {
  // Clear existing notes
  main.innerHTML = "";
  // Display all notes
  if (Object.keys(notes).length === 0) {
    console.log("No notes as of now！");
  } else {
    Object.entries(notes).forEach((noteItem) => {
      const noteElement = generateNote(noteItem[1]);
      main.appendChild(noteElement);
    });
  }
}

export default updateNotes;
