const mongoose = require('mongoose');

// Note_event 
// ID (uint16_t): Unique identifier for each Note_event.
// TYPE (string): Specifies the type of Note_event.
// UPDATE_TIME (DATETIME): Records the last time the Note_event was updated.
// TAGS (list<string>): Tags associated with the Note_event for categorization and search.
const NoteSchema = new mongoose.Schema({
    TYPE: {
        type: String,
        required: true
    },
    FILE_NAME: {
        type: String
    },
    UPDATE_TIME: {
        type: Date,
        default: Date.now
    },
    TAGS: {
        type: [String],
        default: []
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;