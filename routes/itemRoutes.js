const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Assuming your model file is named Item.js

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

// Additional routes (PUT, DELETE) can be added here

module.exports = router;