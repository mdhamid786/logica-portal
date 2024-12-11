// routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const { addReview, getProductReview, calculateAverageRating } = require('../controllers/reviewController'); 


router.post('/', addReview);

router.get('/:productId', getProductReview);



module.exports = router;
