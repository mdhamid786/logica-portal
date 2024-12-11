const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;


const ordersSchema = new mongoose.Schema(
  {
   
    order_date: {
      type: Date,
    },
    amount: {
      type: mongoose.Schema.Types.Number,
      default: null,
    },
    
    status: {
      type: String,
      enum: [
        'inprocess',
        'dispatched',
        'intransit',
        'delivered',
        'pending',
        'completed',
        'cancelled',
        'rejected',
      ],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'partially paid'],
      default: 'pending',
    },
    coupon_code: {
      type: String,
    },
    overall_distributor_price: {
      type: mongoose.Schema.Types.Number,
      default: null,
    },
    shipping_method: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    customer_note: {
      type: String,
    },
    currency: {
      type: String,
    },
    discount_amount: {
      type: mongoose.Schema.Types.Number,
      default: null,
    },
    coupon_code_amount: {
      type: mongoose.Schema.Types.Number,
      default: null,
    },
    tax_amount: {
      type: mongoose.Schema.Types.Number,
    },
  
    order_type: {
      type: String,
    },
    delivery_date: {
      type: Date,
    },
    tracking_number: {
      type: String,
    },
    order_source: {
      type: String,
    },
    balance: {
      type: mongoose.Schema.Types.Number,
    },
    paid_amount: {
      type: mongoose.Schema.Types.Number,
    },
    userId: {
      type: String,
      ref: 'User',
    },
    address_id: {
      type: String,
      ref: 'Address',
    },
    createdById: {
      type: String,
      ref: 'User',
    },
    updatedById: {
      type: String,
      ref: 'User',
    },
    deletedAt: {
      type: Date,
    },
    orderDetails: { type: Schema.Types.ObjectId, ref: 'OrderDetails' }, 
    
    
  },
  { strict: false },
  
  {
    timestamps: true,
    collection: 'orders',
  }
);

// ordersSchema.virtual('orderDetails', {
//   ref: 'OrderDetails',
//   localField: '_id',
//   foreignField: 'order_id',
// });

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
