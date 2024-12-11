// routes/ratingRoutes.js
const express = require('express');
const Rating = require('../models/review');
const Product = require('../models/product');
const calculateAverageRating = require('../helper/reviewHelper');
const { error500Message } = require('../helper/commonHelper');
const { successLogger, errorLogger } = require("../utils/logger");


// Add a new rating
exports.addReview = async (req, res) => {
    try {
        const { rating, description, images, userId, productId } = req.body;
    
        const newRating = new Rating({
          rating,
          description,
          images,
          userId,
          productId,
        });
    
        await newRating.save();
    
        await calculateAverageRating(productId);

        successLogger.info('Rating added successfully', { rating: newRating });

        res.status(201).json({
          message: 'Rating added successfully!',
          rating: newRating,
        });
      } catch (error) {
        errorLogger.error('Error adding rating', { error: error.message });
        return error500Message(res, error.message, '4');
      }
};

// Get all ratings for a product
exports.getProductReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const ratings = await Rating.find({ productId });
    
        successLogger.info('Product ratings fetched successfully', { productId, ratings: ratings.length });

        res.status(200).json(ratings);
      } catch (err) {
        errorLogger.error('Error fetching ratings', { error: err.message });

        return error500Message(res, err.message, '4');
      }
};
