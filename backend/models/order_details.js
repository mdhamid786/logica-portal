const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderDetailsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    order_id: {
      type: String,
      ref: 'Orders',
      required: true,
    },
    product_id: {
      type: String,
      ref: 'Products',
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  
  }
);

const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);

module.exports = OrderDetails;
