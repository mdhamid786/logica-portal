const mongoose = require("mongoose");
const { Schema } = mongoose;

const VariantSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    attributes: { type: Map, of: String }, // e.g., { "Color": "Red", "Size": "M" }
    sku: { type: String, unique: true, required: true },

   
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: false,
      trim: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      min: 0, 
      max: 5,
    },
    title: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    qty: {
      type: Number,
      required: false,
    },

    status: {
      type: String,
      enum: ["in stock", "out of stock"],
      required: false,
    },

    brandId: {
      type: String,
      ref: "Brand",
      required: false,
    },
    categoryId: {
      type: String,
      ref: 'Category', 
      required: false,
    },

   
    stock: {
      type: Number,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Variant", VariantSchema);
