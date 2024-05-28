const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');

// Function to get all unique tags from the Note collection
router.get('/get_all_tags', async (req, res) => {
    try {
        const notes = await Note.find({}, 'TAGS'); // Get only the TAGS field from all Note documents

        // Extract all tags into a single array
        const allTags = notes.flatMap(note => note.TAGS);

        // Remove duplicates and sort alphabetically
        const uniqueTags = [...new Set(allTags)].sort();

        res.json(uniqueTags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;