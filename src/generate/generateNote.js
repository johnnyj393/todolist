import { deleteNote } from "../executive/main";
import { storage, note } from "../executive/config";

// Creates html for noteToGenerate

function generateNote(noteToGenerate) {
  // Make wrapper
  const noteBlock = document.createElement("div");
  noteBlock.classList.add("to-do-block");
  noteBlock.id = `note${noteToGenerate.title}`;

  // Make header
  const noteHeader = document.createElement("div");
  noteHeader.classList.add("note-header");

  // Make title
  const noteTitle = document.createElement("span");
  noteTitle.classList.add("note-title");
  noteTitle.textContent = noteToGenerate.title;
  noteHeader.appendChild(noteTitle);

  // Make delete button
  const deleteNoteButton = document.createElement("button");
  deleteNoteButton.classList.add("to-do-button");
  deleteNoteButton.addEventListener("click", () =>
    deleteNote(noteToGenerate.title)
  );
  deleteNoteButton.innerHTML = "Delete";
  noteHeader.appendChild(deleteNoteButton);

  // Append header to main
  noteBlock.appendChild(noteHeader);

  // Make body with description
  const noteDescription = document.createElement("div");
  noteDescription.classList.add("note-description");
  noteDescription.innerHTML = noteToGenerate.description;
  noteDescription.contentEditable = "true";
  noteDescription.style.whiteSpace = "pre-line";
  noteDescription.addEventListener("input", () =>
    storage.editNoteDescription(
      note,
      noteToGenerate.title,
      noteDescription.innerHTML
    )
  );
  noteBlock.appendChild(noteDescription);

  return noteBlock;
}

export default generateNote;
