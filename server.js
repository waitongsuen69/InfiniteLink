const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB

// deprecate 
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('MongoDB connection established'))
.catch(err => console.log('MongoDB connection error:', err));

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello World from the server!');
});


// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
