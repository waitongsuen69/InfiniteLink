const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// connect database
const connectDB = require('./config/db');
// note functions
const notesRoutes = require('./routes/noteRoutes');
const noteFuncs = require('./routes/noteRoutesFunc.js');
const Note = require('./models/Note.js');
const tagsRoutes = require('./routes/tagRoutes.js');

// Middleware
// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // if you need to include cookies in CORS requests
}));

// To handle preflight requests
app.options('*', cors());

app.use(express.json()); // replaces bodyParser.json()

// Connect to MongoDB
connectDB();

// Routes

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello World from the server!');
});

app.get('/import/csv', async (req, res) => {
  try {
      await noteFuncs.importNotesFromCSV();
      const items = await noteFuncs.getAllNotes();
      res.json(items);
  } catch (error) {
      // If an error occurs, send an appropriate error message
      res.status(500).json({ message: 'Error processing request: ' + error.message });
  }
});

// Apply note routes to the application
app.use(notesRoutes);
app.use(tagsRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));