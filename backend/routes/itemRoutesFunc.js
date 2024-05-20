const Item = require('../models/Item');
const { parse } = require('json2csv');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

async function getAllItems() {
  return await Item.find({});
}

async function addItem(data) {
  const newItem = new Item(data);
  await newItem.save();
  return newItem;
}

async function deleteAllItems() {
  return await Item.deleteMany({});
}

async function exportItemsToCSV() {
  const items = await getAllItems();
  const fields = ['_id', 'name', 'quantity'];
  const csvData = parse(items, { fields });
  const filePath = path.join(__dirname, '../exports', 'items.csv');

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
}

async function importItemsFromCSV() {
  const filePath = path.join(__dirname, '../exports', 'items.csv');
  let items = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => items.push(data))
      .on('end', async () => {
        try {
          await deleteAllItems();
          await Item.insertMany(items);
          resolve(items);
        } catch (error) {
          reject('Error importing data: ' + error.message);
        }
      });
  });

  return items;
}

module.exports = {
  getAllItems,
  addItem,
  deleteAllItems,
  exportItemsToCSV,
  importItemsFromCSV,
};