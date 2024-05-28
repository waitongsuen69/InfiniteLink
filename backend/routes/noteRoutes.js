// Basic libraries
const express = require('express');
const router = express.Router();
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


module.exports = router;