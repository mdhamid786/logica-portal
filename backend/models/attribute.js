const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  values: [{ type: String, required: true }],
});

module.exports = mongoose.model("Attribute", AttributeSchema);
