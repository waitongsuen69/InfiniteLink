// note_add_new.js
import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'; // You might need to adjust the path

const AddNote = ({ onNoteAdded }) => {
  const [newNote, setNewNote] = useState({ name: '', type: '', tags: [] });
  const [tagInput, setTagInput] = useState('');

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setNewNote(prevState => ({
        ...prevState,
        tags: [...prevState.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (index) => {
    setNewNote(prevState => ({
      ...prevState,
      tags: prevState.tags.filter((tag, i) => i !== index)
    }));
  };

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
        tags: newNote.tags
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
        <input 
          type="text" 
          value={tagInput} 
          onChange={handleTagInputChange} 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleTagAdd();
            }
          }}
        />
        <button type="button" onClick={handleTagAdd}>Add Tag</button>
      </label>
      <br />
      <ul>
        {newNote.tags.map((tag, index) => (
          <li key={index}>
            {tag}
            <button type="button" onClick={() => handleTagRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <br />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;