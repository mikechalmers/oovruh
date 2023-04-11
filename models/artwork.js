const mongoose = require("mongoose");
const { Schema } = mongoose;

const artworkSchema = new mongoose.Schema({
	title: {
		type: String,
		required: false,
    unique: false,
    default: "Untitled"
	},
	year: {
		type: String,
		required: false,
		unique: false,
  },
  images: {
    type: Object,
    required: false,
    unique: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: {
    type: String,
    required: false,
    unique: false,
  }
});

module.exports = mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema);