import React, { useState } from 'react';
import AddNote from './NoteFunc/note_add_new.js';
import MindMap from './NoteFunc/note_map.js';
import {ImportCSV, ExportCSV} from './NoteFunc/csv_handle.js';

function App() {
  const [notes, setNotes] = useState([]);

  const get_all_notes = async () => {
    try {
      const response = await fetch('http://localhost:5000/return_all_notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // if you need to include cookies
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };


  return (
    <div>
      <h1>Notes</h1>
      <button onClick={get_all_notes}>Get All Notes</button>
      
      {/* <AddNote onNoteAdded={get_all_notes} /> */}

      <MindMap />

      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.FILE_NAME} - type: {note.TYPE} - last update time : {note.UPDATE_TIME}</li>
        ))}
      </ul>
      
      <ExportCSV/>
      
      <ImportCSV get_all_notes={get_all_notes}/>
    
    </div>
  );
}

export default App;