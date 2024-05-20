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
      console.error('Failed to connect to MongoDB using mongodb://mongodb:27017/myDatabase');
      try {
        // Fallback to the secondary URI if the primary connection fails
        await mongoose.connect('mongodb://localhost:27017/yourDatabase', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`MongoDB connected at mongodb://localhost:27017/yourDatabase`);
      } catch (err) {
        console.error(`Failed to connect to secondary MongoDB URI: mongodb://localhost:27017/yourDatabase`);
        // console.error(err.message);
        process.exit(1); // Exit the process with failure
      }
    }

};
  
module.exports = connectDB;