const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

// Create a model from the schema
const Item = mongoose.model('Item', itemSchema);

// Export the model
module.exports = Item;
