const mongoose = require('mongoose');

const cartWishlistSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartWishlistItem',
    },
  ],
}, {
  timestamps: true, 
});

module.exports = mongoose.model('CartWishlist', cartWishlistSchema);
