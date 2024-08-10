document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const noteForm = document.getElementById('note-form');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
  
    // Fetch and display existing notes
    const fetchNotes = async () => {
      const response = await fetch('/api/notes');
      const notes = await response.json();
      notesContainer.innerHTML = notes.map(note => `<div>${note.title}</div>`).join('');
    };
  
    // Save a new note
    noteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newNote = {
        title: noteTitle.value,
        text: noteText.value,
      };
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      noteTitle.value = '';
      noteText.value = '';
      fetchNotes();
    });
  
    fetchNotes();
  });