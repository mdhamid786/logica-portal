
const express = require('express');
const { addcoupon, getAllcoupon, getSinglecoupon, addCoupon, getAllCoupons, getSingleCoupon, deleteCoupon, editCoupon } = require('../controllers/coupon');
const { authenticate } = require('../middleware/auth');
const router = express.Router();



router.post('/add', authenticate, addCoupon);
router.get('/list', getAllCoupons);
router.get('/:id', getSingleCoupon);
router.delete('/:id', deleteCoupon);
router.put('/:id', editCoupon);


module.exports = router;
