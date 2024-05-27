// note_add_new.js
import React, { useState } from 'react';

const AddNote = ({ onNoteAdded }) => {
  const [newNote, setNewNote] = useState({ name: '', type: '', tags: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteData = { 
        name: newNote.name, 
        type: newNote.type || 'txt', // Default to 'txt' if type is empty
        tags: newNote.tags ? newNote.tags.split(',').map(tag => tag.trim()) : [] // Convert comma-separated string to array or default to empty array
      };
      // const new_task = { name: newNote.name, type: newNote.type, tags: newNote.tags };
      const response = await fetch('http://localhost:5000/add_note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData),
        credentials: 'include' // if you need to include cookies
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      onNoteAdded(); // Notify parent component to fetch all notes again
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={newNote.name} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Type:
        <input type="text" name="type" value={newNote.type} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Tags:
        <input type="text" name="tags" value={newNote.tags} onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;