const Rating = require("../models/review");
const Product = require("../models/product");

const calculateAverageRating = async (productId) => {
  try {
    const ratings = await Rating.find({ productId });
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;
    await Product.findByIdAndUpdate(productId, { averageRating });
  } catch (err) {
    console.error("Error calculating average rating:", err);
  }
};

module.exports = calculateAverageRating;
