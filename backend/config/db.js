const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDatabase';

    try {
        console.log(`Trying to connect to ${mongoURI}`);
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected at ${mongoURI}`);
    } catch (err) {
        console.error(`Failed to connect to MongoDB at ${mongoURI}`);
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
