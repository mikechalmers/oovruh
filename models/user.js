import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  avatar: {
    type: String,
    required: false,
    unique: false,
  },
  // artworks: {

  // },
  // collections: {

  // },
  // series: {

  // },
  subscriber: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true, });

const user = mongoose.model("User", userModel);
module.exports = user;