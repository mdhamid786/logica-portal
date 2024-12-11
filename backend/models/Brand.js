const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand_image: {
    type: String,
    required: false,
  },
  importHash: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("Brand", BrandSchema);
