const { error500Message, apiMessageCode, errorMessage } = require("../helper/commonHelper");
const Address = require("../models/address");
const asyncHandler = require('express-async-handler')
const { successLogger, errorLogger } = require("../utils/logger");

// @desc    Add a new address for a user
// @route   POST /address
// @access  Private

exports.addAddress = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      type,
      isDefault,
    } = req.body;

    const newAddress = new Address({
      userId,
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      type,
      isDefault,
    });

    await newAddress.save();
    successLogger.info(`Address added successfully: ${JSON.stringify(newAddress)}`);
    res.status(200).json({
      success: true,
      message: "Address added successfully",
      newAddress,
    });
  } catch (error) {
    errorLogger.error(`Error adding address: ${error.message}`, { stack: error.stack });
    return error500Message(res, error, '4');
  }
});

// @desc    Get all addresses for the current user
// @route   GET /address
// @access  Private

exports.getUserAddresses = async (req, res) => {
 
  try {
    const { userId } = req.user; 
    console.log(userId);
    
    const address = await Address.find( {userId} );
   

    if (!address) {
      return await errorMessage(res, await apiMessageCode(3), '3');
    }
    successLogger.info(`Addresses retrieved for user: ${userId}`);
    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    errorLogger.error(`Error fetching user addresses: ${error.message}`, { stack: error.stack });
    return error500Message(res, error.message, '4');
  }
};

// @desc    Get details of a single address by ID
// @route   GET /address/:id
// @access  Private

exports.getSingleAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOne({ _id: id });

    if (!address) {
      return await errorMessage(res, await apiMessageCode(3), '3');
    }
    successLogger.info(`Address retrieved: ${JSON.stringify(address)}`);
    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    return error500Message(res, error.message, '4');
  }
};

// @desc    Update an address by ID
// @route   PUT /address/:id
// @access  Private

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      type,
    } = req.body;

    const address = await Address.findOne({ _id: id });
    // const address = await Address.findOne({ _id: id, userId: req.user._id });

    if (!address) {
      return await errorMessage(res, await apiMessageCode(3), '3');
    }

    address.name = name;
    address.phone = phone;
    address.addressLine1 = addressLine1;
    address.addressLine2 = addressLine2;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;
    address.country = country;
    address.type = type || address.type;

    await address.save();
    successLogger.info(`Address updated successfully: ${JSON.stringify(address)}`);
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    errorLogger.error(`Error updating address: ${error.message}`, { stack: error.stack });
    return error500Message(res, error.message, '4');
  }
};

// @desc    Delete an address by ID
// @route   DELETE /api/address/:id
// @access  Private

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.userId;

    console.log(user);

    // const result = await Address.deleteOne({ _id: id});
    const result = await Address.deleteOne({
      _id: id,
      userId: req.user.userId,
    });

    if (result.deletedCount === 0) {
      return await errorMessage(res, await apiMessageCode(3), '3');
    }
    successLogger.info(`Address deleted successfully: ID ${id}`);
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    errorLogger.error(`Error deleting address: ${error.message}`, { stack: error.stack });
    return error500Message(res, error.message, '4');
  }
};

// @desc    Set a default address for the user
// @route   PUT /api/addresses/:id/default
// @access  Private

exports.setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOne({ _id: id, userId: req.user.userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Set all other addresses for the user as not default
    await Address.updateMany({ userId: req.user._id }, { isDefault: false });

    // Set the selected address as default
    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      message: "Address set as default",
      address,
    });
  } catch (error) {
    return error500Message(res, error.message, '4');
  }
};
