const express = require('express');
// const cors = require('cors');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const notesRoutes = require('./routes/noteRoutes');
// const itemFuncs = require('./routes/itemRoutesFunc.js');
const noteFuncs = require('./routes/noteRoutesFunc.js');
const Note = require('./models/Note.js');
const Item = require('./models/Item.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(express.json()); // replaces bodyParser.json()

// Connect to MongoDB
connectDB();

// Routes
// app.use('/api/items', itemRoutes);

// Define a simple route to test the server
app.get('/', (req, res) => {
  // itemFuncs.importItemsFromCSV();
  // const items = itemFuncs.getAllItems();
  // res.json(items);
  res.send('Hello World from the server!');
});

app.get('/import/csv', async (req, res) => {
  const notes = await noteFuncs.importNotesFromCSV();
  res.json(notes);
});

// Apply item routes to the application
app.use(itemRoutes); 
app.use(notesRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));