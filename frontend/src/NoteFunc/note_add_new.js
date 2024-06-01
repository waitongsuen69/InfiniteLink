// note_add_new.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Helper function to fetch all tags from the backend
const fetchAllTags = async () => {
  try {
    const response = await fetch('http://localhost:5000/get_all_tags');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Assuming the response is an array of tags
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

const AddNote = ({ onNoteAdded }) => {
  // new note container
  const [newNote, setNewNote] = useState({ name: '', type: '', tags: [] });
  // new tag container
  const [tagInput, setTagInput] = useState('');
  // suggest tag container 
  const [tagOptions, setTagOptions] = useState([]);

  // pre-load all suggesting tags
  useEffect(() => {
    const getTags = async () => {
      const tags = await fetchAllTags();
      // Assuming tags is an array of objects with { value, label }
      const formattedTags = tags.map(tag => ({ value: tag, label: tag }));
      setTagOptions(formattedTags);
    };
    getTags();
  }, []);


  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // helper add new tag to newNote[tags]
  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setNewNote(prevState => ({
        ...prevState,
        tags: [...prevState.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // helper delete tag from newNote[tags]
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

  const handleTagChange = (selectedOptions) => {
    setNewNote(prevState => ({
      ...prevState,
      tags: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  // helper add new note to notes  
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
      {/* new note name */}
      <label>
        Name:
        <input type="text" name="name" value={newNote.name} onChange={handleInputChange} required />
      </label>
      <br />
      {/* new note type */}
      <label>
        Type:
        <input type="text" name="type" value={newNote.type} onChange={handleInputChange} />
      </label>
      <br />
      {/* new note tags */}
      <label>
        Tags:
        <Select
          isMulti
          value={tagOptions.filter(option => newNote.tags.includes(option.value))}
          onChange={handleTagChange}
          options={tagOptions}
          placeholder="Add tags"
        />
        <button type="button" onClick={handleTagAdd}>Add Tag</button>
      </label>
      <br />
      {/* list added note tags */}
      <ul>
        {newNote.tags.map((tag, index) => (
          <li key={index}>
            {tag}
            {/* remove listed note tag*/}
            <button type="button" onClick={() => handleTagRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <br />
      {/* add tag submit button */}
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;