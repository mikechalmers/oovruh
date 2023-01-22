const mongoose = require("mongoose");

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
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    required: false,
  },
});

module.exports = mongoose.models.Artwork || mongoose.model("Artwork", artworkSchema);