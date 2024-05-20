const mongoose = require('mongoose');
// Connect to MongoDB

const connectDB = async () => {
    try {
      console.log('Trying to connect mongodb://localhost:27017/yourDatabase')
      // Fallback to the secondary URI if the primary connection fails
      await mongoose.connect('mongodb://localhost:27017/yourDatabase', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      console.log(`MongoDB connected at mongodb://localhost:27017/yourDatabase`);
    } catch (err) {
      console.error(`Failed to connect to secondary MongoDB URI: mongodb://localhost:27017/yourDatabase\nTrying to connect mongodb://mongodb:27017/yourDatabase`);
      // console.error(err.message);
      try {
        await mongoose.connect('mongodb://mongodb:27017/myDatabase', {
          // deprecate
          // useNewUrlParser: true,
          // useUnifiedTopology: true
        });
        console.log('MongoDB Connected at mongodb://mongodb:27017/yourDatabase');
      } catch (err) {
        console.error(`Failed to connect to secondary MongoDB URI: mongodb://mongodb:27017/yourDatabase`);
        // console.error(err.message);
        process.exit(1); // Exit the process with failure
      }
      process.exit(1); // Exit the process with failure
    }
};
  
module.exports = connectDB;