import 'dotenv/config'
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};

export { connectDB };