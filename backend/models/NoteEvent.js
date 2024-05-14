const mongoose = require('mongoose');

// Note_event 
// ID (uint16_t): Unique identifier for each Note_event.
// TYPE (string): Specifies the type of Note_event.
// UPDATE_TIME (DATETIME): Records the last time the Note_event was updated.
// TAGS (list<string>): Tags associated with the Note_event for categorization and search.
const noteEventSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    TYPE: {
        type: String,
        required: true
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

const NoteEvent = mongoose.model('NoteEvent', noteEventSchema);

module.exports = NoteEvent;