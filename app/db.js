import mongoose from 'mongoose';

const mongoURI = "mongodb://localhost:27017/instagram"; // or use process.env.URI for a production environment

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
    });
    console.log('Connection Successful');
  } catch (err) {
    throw new Error(err.message);
  }
};

export default connectDB;
