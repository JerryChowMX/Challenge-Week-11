// Selectors for the HTML elements
const noteList = document.getElementById('noteList');
const noteTitleInput = document.getElementById('noteTitle');
const noteTextInput = document.getElementById('noteText');
const saveNoteButton = document.getElementById('formSaveNote');

// Function to update the UI with the new note
function addNoteToUI(note) {
  const noteItem = document.createElement('div');
  noteItem.classList.add('note-item');
  noteItem.innerText = note.title;
  noteItem.onclick = function () {
    noteTitleInput.value = note.title;
    noteTextInput.value = note.text;
    // Additional code to handle editing of this note
  };
  noteList.appendChild(noteItem);
}

// Function to handle saving a note
function saveNote() {
  const title = noteTitleInput.value.trim();
  const text = noteTextInput.value.trim();

  if (title && text) {
    const newNote = { title, text };
    // Send the new note to the server
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(note => {
        addNoteToUI(note);
        noteTitleInput.value = ''; // Clear the title input
        noteTextInput.value = ''; // Clear the text input
      })
      .catch(err => console.error('Error saving note:', err));
  } else {
    alert('Both a title and text are required to save a note.');
  }
}

// Event listener for the save button
saveNoteButton.addEventListener('click', saveNote);

// Function to load and display existing notes
function loadNotes() {
  fetch('/api/notes')
    .then(response => response.json())
    .then(notes => {
      notes.forEach(note => addNoteToUI(note));
    })
    .catch(err => console.error('Error loading notes:', err));
}

// Load notes when the page loads
document.addEventListener('DOMContentLoaded', loadNotes);
