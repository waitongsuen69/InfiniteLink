import React, { useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);

  const get_all_notes = () => {
    fetch('http://localhost:5000/return_all_notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={get_all_notes}>Get All Notes</button>
      <ul>
        {notes.map(note => (
          <li key={note._id}>{note.FILE_NAME} - type: {note.TYPE} - last update time : {note.UPDATE_TIME}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;