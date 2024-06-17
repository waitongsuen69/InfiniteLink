import React, { useState } from 'react';
import AddNote from './NoteFunc/note_add_new.js';
import MindMap from './NoteFunc/note_map.js';
import { ImportCSV, ExportCSV } from './NoteFunc/csv_handle.js';
const handler = require('./NoteFunc/handler.js');

function App() {
  const [notes, setNotes] = useState([]);

  // Function to fetch all notes
  const getAllNotes = async () => {
    try {
      const allNotes = await handler.fetchAllNotes();
      setNotes(allNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={getAllNotes}>Get All Notes</button>

      {/* <AddNote onNoteAdded={getAllNotes} /> */}

      <MindMap />

      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.FILE_NAME} - type: {note.TYPE} - last update time: {note.UPDATE_TIME}</li>
        ))}
      </ul>

      <ExportCSV />
      <ImportCSV get_all_notes={handler.fetchAllNotes} />
    </div>
  );
}

export default App;