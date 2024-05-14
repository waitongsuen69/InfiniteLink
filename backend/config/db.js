const mongoose = require('mongoose');
// Connect to MongoDB

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://mongodb:27017/myDatabase', {
        // deprecate
        // useNewUrlParser: true,
        // useUnifiedTopology: true
      });
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      // Exit process with failure code
      process.exit(1);
    }

};
  
module.exports = connectDB;