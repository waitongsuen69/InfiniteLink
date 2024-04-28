const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

const Item = mongoose.model('Item', itemSchema);

export default Item;