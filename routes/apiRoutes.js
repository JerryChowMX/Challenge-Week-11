// Importing modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // For generating unique ids for the notes

// Helper function to load the notes from db.json
const loadNotes = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Helper function to save the notes to db.json
const saveNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), 'utf8');
};

// GET route for retrieving all the notes
router.get('/notes', (req, res) => {
  const notes = loadNotes();
  res.json(notes);
});

// POST route for saving a new note
router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = { title, text, id: uuidv4() }; // Create a new note with a unique id
    const notes = loadNotes();
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
  } else {
    res.status(400).json({ error: 'Please provide both a title and text for the note.' });
  }
});

// DELETE route for a specific note
router.delete('/notes/:id', (req, res) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.id !== req.params.id);
  saveNotes(filteredNotes);
  res.json({ message: 'Note has been deleted successfully.' });
});

module.exports = router;
