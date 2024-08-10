const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

// Helper function to read and write to db.json
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
};

// GET route to retrieve all notes
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST route to add a new note
router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = { id: uuidv4(), title, text };
    const notes = readNotes();
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
  } else {
    res.status(400).send('Note title and text are required');
  }
});

module.exports = router;