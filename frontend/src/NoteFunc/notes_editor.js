import React, { useState } from 'react';

const NoteEditor = ({ note }) => {
    const fileName = `${note.FILE_NAME}.${note.TYPE}`;

    // Check if the note exists in localStorage
    let fileContent = localStorage.getItem(fileName);
    
    if (fileContent === null) {
        // Create the note with initial content if it does not exist
        fileContent = '';
        localStorage.setItem(fileName, fileContent);
    }

    // Return a div containing the file content
    return (
        <div>
            <h2>{note.FILE_NAME}</h2>
            <p>Type: {note.TYPE}</p>
            <p>Last Update: {note.UPDATE_TIME}</p>
            <pre>{fileContent}</pre>
        </div>
    );
};

const NoteEditorApp = () => {
    const [selectedNote, setSelectedNote] = useState(null);

    // Example note object
    const note = {
        FILE_NAME: "waiton",
        TAGS: ['not useful', 'stupid shit'],
        TYPE: "md",
        UPDATE_TIME: "2024-05-28T13:28:11.595Z",
        _id: "6655dbeb975efe3ad8c78855"
    };

    return (
        <div>
            <h1>notes window</h1>
            <button onClick={() => setSelectedNote(note)}>Edit Note</button>
            {selectedNote && <NoteEditor note={selectedNote} />}
        </div>
    );
};

export default NoteEditorApp;
