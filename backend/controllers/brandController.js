const Joi = require("joi");
const Brand = require("../models/Brand");
const { error500Message } = require("../helper/commonHelper");
const { successLogger, errorLogger } = require("../utils/logger");

// @desc    Add a new brand
// @route   POST /brands
exports.addNewBrand = async (req, res) => {
  const input = req.body;

  const rules = {
    title: Joi.string().required().messages({
      "string.empty": "Brand title is required",
    }),
    name: Joi.string().required().messages({
      "string.empty": "Brand name is required",
    }),
    importHash: Joi.string().optional(),
  };

  const { error } = Joi.object(rules).validate(input, { abortEarly: false });
 
  if (error) {
    errorLogger.warn(`Validation failed for adding new brand: ${JSON.stringify(error.details)}`);
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: error.details.map((detail) => detail.message),
    });
  }

  try {
    const brand_image = req.file ? `uploads/${req.file.filename}` : null;
    const brandData = {
      title: input.title,
      name: input.name,
      brand_image:brand_image,
      importHash: input.importHash || null,
    };

    const brand = await Brand.create(brandData);

    successLogger.info(`Brand created successfully: ${JSON.stringify(brand)}`);
    res.status(200).json({
      success: true,
      message: "Brand created successfully",
      brand,
    });
  } catch (error) {
    errorLogger.error(`Error occurred while adding new brand: ${error.message}`, { stack: error.stack });
    return error500Message(res, error.message, "4");
  }
};

// @desc    Get all brands
// @route   GET /brands
exports.brandList = async (req, res) => {
  try {
    const brands = await Brand.find();

    if (brands.length > 0) {
      successLogger.info(`Fetched ${brands.length} brands successfully`);
      res.status(200).json({
        success: true,
        brands,
      });
    } else {
      errorLogger.warn(`No brands found`);
      res.status(404).json({
        success: false,
        message: "No brands found",
      });
    }
  } catch (error) {
    errorLogger.error(`Error fetching brands: ${error.message}`, { stack: error.stack });
    return error500Message(res, error.message, "4");
  }
};

// @desc    Get a single brand
// @route   GET /brands/:id
exports.singleBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (brand) {
      successLogger.info(`Fetched brand with ID: ${id}`);
      res.status(200).json({
        success: true,
        brand,
      });
    } else {
      errorLogger.warn(`Brand not found with ID: ${id}`);
      res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }
  } catch (error) {
    errorLogger.error(`Error fetching brand with ID ${req.params.id}: ${error.message}`, { stack: error.stack });
    return error500Message(res, error.message, "4");
  }
};

// @desc    Delete a brand
// @route   DELETE /brands/:id
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);

    if (brand) {
      successLogger.info(`Deleted brand with ID: ${id}`);
      res.status(200).json({
        success: true,
        message: "Brand deleted successfully",
      });
    } else {
      errorLogger.warn(`Attempted to delete non-existent brand with ID: ${id}`);
      res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }
  } catch (error) {
    errorLogger.error(`Error deleting brand with ID ${req.params.id}: ${error.message}`, { stack: error.stack });
    return error500Message(res, error.message, "4");
  }
};

// @desc    Update a brand
// @route   PUT /brands/:id

exports.updateBrand = async (req, res) => {


  try {
    const id = req.params.id;
    const { name, title} = req.body;
    const brand_image = req.file ? `uploads/${req.file.filename}` : null;

    const updateData = { name, title,brand_image };
   

    const brands = await Brand.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (brands) {
      successLogger.info('Brand updated successfully');

      res.status(200).json({
        message: "Brand updated successfully",
        success: true,
        brands,
      });
    } else {
      res.status(404).json({ message: "brands not found" });
    }
  } catch (error) {
    errorLogger.error('Error updating  brands', { error: error.message });

    return error500Message(res, error.message, '4');
  }
};
