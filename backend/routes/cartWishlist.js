const express = require('express');
const router = express.Router();
const cartWishlistController = require('../controllers/cartWishlistController');
const { authenticate } = require('../middleware/Authenticate');


router.post('/add-item', cartWishlistController.addItem);
router.post('/add-wish', cartWishlistController.addWish);
router.put('/update-quantity', cartWishlistController.updateQuantity);
router.put('/change-status', cartWishlistController.changeStatus);
router.delete('/remove-item', cartWishlistController.removeItem);
router.delete('/remove-product', cartWishlistController.removeProductItem);
router.get('/:userId', cartWishlistController.getCartWishlist);
router.delete('/clear', cartWishlistController.clearCart);
router.post('/checkout', cartWishlistController.checkout);
router.get('/', authenticate, cartWishlistController.getCartWithUserId);

module.exports = router;
