const { error500Message } = require("../helper/commonHelper");
const Coupon = require("../models/coupon");
const { successLogger, errorLogger } = require("../utils/logger");
const { createNotification } = require("./notificationController");

// @desc    add coupon
// @route   POST /coupon
// @access  Admin

exports.addCoupon = async (req, res, next) => {
  try {
    const { code, amount, active, expired } = req.body;

    const formattedActive = new Date(active).toISOString();
    const formattedExpired = new Date(expired).toISOString();

    const coupon = await Coupon.create({
      code,
      amount,
      active: formattedActive,
      expired: formattedExpired,
    });


    // Create a notification for the new user
    const userId = req.user?.userId;

    console.log(userId,"kk");
    

    if (userId) {
      // Create a notification for the user who added the coupon
      await createNotification(
        userId,
        "Coupon Created",
        `You have successfully created a new coupon: ${code}.`
      );
    } else {
      errorLogger.warn(`User ID missing while adding coupon: ${code}`);
    }

    successLogger.info(`Coupon added successfully: ${coupon._id}`);
    res.status(200).json({
      message: "Coupon added successfully",
      success: true,
      coupon,
    });
  } catch (error) {
    errorLogger.error(`Error adding coupon: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};


// GET /api/coupons?activeFrom=2024-11-01&activeTo=2024-11-15&expiredFrom=2024-11-16&expiredTo=2024-12-31
// @desc    get all coupon
// @route   PUT /coupon

exports.getAllCoupons = async (req, res) => {
  try {
    const {
      code,
      minAmount,
      maxAmount,
      activeFrom,
      activeTo,
      expiredFrom,
      expiredTo,
    } = req.query;

    const filterOptions = {};

    // Filter by code (case-insensitive)
    if (code) {
      filterOptions.code = { $regex: code, $options: "i" }; // i for case-insensitive
    }

    // Filter by amount range
    if (minAmount && maxAmount) {
      filterOptions.amount = {
        $gte: parseInt(minAmount),
        $lte: parseInt(maxAmount),
      };
    } else if (minAmount) {
      filterOptions.amount = { $gte: parseInt(minAmount) };
    } else if (maxAmount) {
      filterOptions.amount = { $lte: parseInt(maxAmount) };
    }

    // Filter by active date range
    if (activeFrom && activeTo) {
      filterOptions.active = {
        $gte: new Date(activeFrom),
        $lte: new Date(activeTo),
      };
    } else if (activeFrom) {
      filterOptions.active = { $gte: new Date(activeFrom) };
    } else if (activeTo) {
      filterOptions.active = { $lte: new Date(activeTo) };
    }

    // Filter by expired date range
    if (expiredFrom && expiredTo) {
      filterOptions.expired = {
        $gte: new Date(expiredFrom),
        $lte: new Date(expiredTo),
      };
    } else if (expiredFrom) {
      filterOptions.expired = { $gte: new Date(expiredFrom) };
    } else if (expiredTo) {
      filterOptions.expired = { $lte: new Date(expiredTo) };
    }

    // Fetch filtered coupons
    const coupons = await Coupon.find(filterOptions);
    successLogger.info(`Fetched ${coupons.length} coupons successfully`);
    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    errorLogger.error(`Error fetching coupons: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};

// @desc    Get a single coupon by ID
// @route   GET /coupon/:id

exports.getSingleCoupon = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    successLogger.info(`Fetched coupon with ID: ${id}`);
    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    errorLogger.error(`Error fetching coupon: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};

// @desc    Delete a single coupon by ID
// @route   DELETE /coupon/:id

exports.deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Coupon.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    successLogger.info(`Coupon with ID: ${id} deleted successfully`);
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    errorLogger.error(`Error deleting coupon: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};




exports.editCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Get the data from the request body to update

    // Find and update the coupon by ID
    const result = await Coupon.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    successLogger.info(`Coupon with ID: ${id} updated successfully`);
    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: result, // Return the updated coupon data
    });
  } catch (error) {
    errorLogger.error(`Error updating coupon: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};
