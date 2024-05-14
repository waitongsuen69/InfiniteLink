// Basic libraries
const express = require('express');
const router = express.Router();
// Items Schema
const Item = require('../models/Item'); 
// Libraries for syncing the data
const { parse } = require('json2csv');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// GET all items
router.get('/return_all_items', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items: ' + error.message });
  }
});

// POST a new item
router.post('/add_item', async (req, res) => {
    const { name, quantity } = req.body;
    try {
      const newItem = new Item({ name, quantity });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// DELETE all items
router.delete('/delete_all_items', async (req, res) => {
    try {
      await Item.deleteMany({});  // This deletes all documents in the collection
      res.status(200).json({ message: 'All items deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting items: ' + error.message });
    }
});

// Route to export data as CSV and save it locally
router.get('/save/csv', async (req, res) => {
  try {
    const items = await Item.find({});
    const fields = ['_id', 'name', 'quantity'];  // Adjust fields based on your Item schema
    const csv = parse(items, { fields });
    const filePath = path.join(__dirname, '../exports', 'items.csv'); // Define the path where you want to save the CSV

    // Check if the directory exists, if not, create it
    fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create directory: ' + err.message });
      }

      // Write the CSV file
      fs.writeFile(filePath, csv, (err) => {
        if (err) {
          res.status(500).json({ message: 'Failed to write file: ' + err.message });
        } else {
          res.status(200).json({ message: 'Data exported successfully to ' + filePath });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to export: ' + error.message });
  }
});

// Route to clear the database and import data from CSV
router.post('/import/csv', async (req, res) => {
  try {
    // Clear the database
    await Item.deleteMany({});

    // Path to the CSV file
    const filePath = path.join(__dirname, '../exports', 'items.csv');
    
    // Array to hold the data
    let items = [];

    // Read the CSV file and parse the data
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => items.push(data))
      .on('end', async () => {
        // Insert new data into the database
        try {
          await Item.insertMany(items);
          res.status(200).json({ message: 'Database cleared and data imported successfully', data: items });
        } catch (error) {
          res.status(500).json({ message: 'Error importing data: ' + error.message });
        }
      });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear the database: ' + error.message });
  }
});


module.exports = router;