import mongoose from 'mongoose'
const MONGO_URI = 'mongodb://localhost:27017/mealmanager'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected Successfully.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;