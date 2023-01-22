// lib/mongoose.js

import mongoose from 'mongoose';

let MONGO_URI = process.env.ATLAS_URI;

if (!MONGO_URI) {
  throw new Error(
    'Please define the ATLAS_URI environment variable'
  )
}

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  });
  return handler(req, res);
};

export default connectDB;