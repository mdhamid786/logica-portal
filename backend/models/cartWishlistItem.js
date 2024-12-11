const mongoose = require('mongoose');

const cartWishlistItemSchema = new mongoose.Schema(
  {
   
    cartWishlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartWishlist', 
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['cart', 'wishlist', 'checked_out'],
      default: 'cart',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CartWishlistItem', cartWishlistItemSchema);
