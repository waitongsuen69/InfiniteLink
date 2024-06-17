// Basic libraries
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// Items Schema
const Note = require('../models/Note.js');
const noteFuncs = require('./noteRoutesFunc.js');

// Libraries for syncing the data
const { parse } = require('json2csv');
const csv = require('csv-parser');

// GET all notes
router.get('/return_all_notes', async (req, res) => {
    try {
        const notes = await noteFuncs.getAllNotes();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notes:'});
    }
});

// POST a new Note
router.post('/add_note', async (req, res) => {
    const { name, type, tags } = req.body;
    try {
        const newNote = await noteFuncs.addNote({ type, name, tags });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE all notes
router.delete('/delete_all_notes', async (req, res) => {
    try {
        await noteFuncs.deleteAllNotes();  // This deletes all documents in the collection
        res.status(200).json({ message: 'All notes deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notes: ' + error.message });
    }
});

// Route to export data as CSV and save it locally
router.get('/save_notes/csv', async (req, res) => {
    try {
        const filePath = await noteFuncs.exportNotesToCSV();
        res.status(200).json({ message: 'Data exported successfully to ' + filePath });
    } catch (error) {
        res.status(500).json({ message: 'Failed to export: ' + error.message });
    }
});

// Route to clear the database and import data from CSV
router.post('/import_notes/csv', async (req, res) => {
    noteFuncs.importNotesFromCSV() 
    .then(successMessage => {
        res.status(200).json({ message: successMessage });
    })
    .catch(errorMessage => {
        res.status(500).json({ message: 'Failed to import: ' + errorMessage });
    });
});

router.get('/editNote', (req, res) => {
    const notesDirectory = path.join(__dirname, '../../Documents');
    const note = JSON.parse(req.query.note); // Expecting note to be passed as a query parameter in JSON format
    const fileName = `${note.FILE_NAME}.${note.TYPE}`;
    const filePath = path.join(notesDirectory, fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        // Create the file with initial content if it does not exist
        const initialContent = `# ${note.FILE_NAME}\n\nType: ${note.TYPE}\n\nLast Update: ${note.UPDATE_TIME}\n\nTags: ${note.TAGS.join(', ')}\n\nContent goes here...`;
        fs.writeFileSync(filePath, initialContent, 'utf-8');
        console.log(`File ${filePath} created.`);
    } else {
        console.log(`File ${filePath} already exists.`);
    }

    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Return the file content as the response
    res.json({
        fileName: note.FILE_NAME,
        type: note.TYPE,
        updateTime: note.UPDATE_TIME,
        content: fileContent
    });
});



module.exports = router;