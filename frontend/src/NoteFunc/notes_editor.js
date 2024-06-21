import React, { useState, useEffect } from 'react';

const NoteEditor = ({ note }) => {
    const [fileContent, setFileContent] = useState('');
    const fileName = `${note.FILE_NAME}.${note.TYPE}`;

    useEffect(() => {
        const fetchNoteContent = async () => {
            try {
                const response = await fetch(`/editNote?note=${JSON.stringify(note)}`);
                const data = await response.json();
                setFileContent(data.content);
            } catch (error) {
                console.error('Error fetching note content:', error);
            }
        };

        fetchNoteContent();
        console.log(fileContent);
    }, [note]);

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
        TYPE: "txt",
        UPDATE_TIME: "2024-05-28T13:28:11.595Z",
        _id: "6655dbeb975efe3ad8c78855"
    };

    return (
        <div>
            <h1>Notes Window</h1>
            <button onClick={() => setSelectedNote(note)}>Edit Note</button>
            {selectedNote && <NoteEditor note={selectedNote} />}
        </div>
    );
};

export default NoteEditorApp;