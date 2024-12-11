const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
   
    title: {
      type: String,
      required: true,
      trim: true,
    },
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
    unit: {
      type: String,
      required: false,
    },
    unitValue: {
      type: Number,
      required: false,
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
    colors: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: ['in stock', 'out of stock'],
      required: true,
    },
    identityNumber: {
      type: String, 
      required: false,
    },
    brandId: {
      type: String,
      ref: 'Brand', 
      required: false,
    },
    categoryId: {
      type: String,
      ref: 'Category', 
      required: false,
    },
    createdById: {
      type: String,
      ref: 'User',
      required: false,
    },
    updatedById: {
      type: String,
      ref: 'User', 
      required: false,
    },
    distributor_price: {
      type: Number,
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
    averageRating: { type: Number, default: 0 }, // Average rating for the product
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
