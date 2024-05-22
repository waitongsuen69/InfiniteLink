const { parse } = require('json2csv');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Note = require('../models/Note.js');

async function getAllNotes() {
  return await Note.find({});
}

async function addNote({ type = 'txt', name, tags = [] } = {}) {
  /**
   * Adds a new note event.
   * @param {Object} params - The parameters for the note event.
   * @param {string} [params.type='txt'] - The type of the note.
   * @param {string} [params.name] - The filename of the note.
   * @param {string[]} [params.tags=[]] - The tags associated with the note.
   */
  const filename = name || "New Note";
  const newNote = new Note({ TYPE: type, FILE_NAME: filename, TAGS: tags });
  await newNote.save();
  return newNote;
}

async function deleteAllNotes() {
  return await Note.deleteMany({});
}

async function exportNotesToCSV() {
  try {
    const notes = await getAllNotes();
    const fields = ['_id', 'TYPE', 'FILE_NAME', 'UPDATE_TIME', 'TAGS'];
    const csvData = parse(notes, { fields });
    const filePath = path.join(__dirname, '../exports', 'notes.csv');

    await new Promise((resolve, reject) => {
      fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
        if (err) return reject('Failed to create directory: ' + err.message);

        fs.writeFile(filePath, csvData, (err) => {
          if (err) return reject('Failed to write file: ' + err.message);
          resolve();
        });
      });
    });
    return filePath;
  } catch (error) {
    // Catch and throw any errors encountered during the entire process
    throw new Error('Error exporting data: ' + error.message);
  }
}

async function importNotesFromCSV() {
  const filePath = path.join(__dirname, '../exports', 'notes.csv');
  let notes = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => notes.push(data))
      .on('end', async () => {
        try {
          await deleteAllNotes();
          await Note.insertMany(notes);
          resolve(notes);
        } catch (error) {
          reject('Error importing data: ' + error.message);
        }
      });
  });

  return notes;
}

module.exports = {
  getAllNotes,
  addNote,
  deleteAllNotes,
  exportNotesToCSV,
  importNotesFromCSV,
};