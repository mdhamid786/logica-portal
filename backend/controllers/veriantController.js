const Variant = require("../models/variant");
const Attribute = require("../models/attribute");
const Product = require("../models/product");
const { error500Message } = require("../helper/commonHelper");
const { successLogger, errorLogger } = require("../utils/logger");


// @desc    Add a new products variant
// @route   POST /variant
// @access  admin

exports.createVariant = async (req, res) => {
  try {
    const { productId, attributes, price, stock, discount, sku, description,shortDescription , type,brandId,categoryId} = req.body;

    // Parse attributes only if it's a JSON string
    const parsedAttributes =
      typeof attributes === "string" ? JSON.parse(attributes) : attributes;

    const imagePaths = Array.isArray(req.files)
      ? req.files.map((file) => `uploads/${file.filename}`)
      : req.files
      ? [`uploads/${req.files.filename}`]
      : [];

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    

    const variant = new Variant({
      productId,
      attributes: parsedAttributes,
      price,
      stock,
      discount,
      images: imagePaths,
      sku,
      brandId: brandId || product.brandId, 
      categoryId: categoryId || product.categoryId, 
      description,
      type: type || product.type, 
      shortDescription,
    });

    await variant.save();

    // Optionally, you can save attributes if they're new and not yet in the database
    for (const key in parsedAttributes) {
      let attribute = await Attribute.findOne({ name: key });

      if (!attribute) {
        attribute = new Attribute({
          name: key,
          values: [parsedAttributes[key]],
        });
        await attribute.save();
      } else {
        // If attribute already exists, add new value to the attribute if it doesn't exist
        if (!attribute.values.includes(parsedAttributes[key])) {
          attribute.values.push(parsedAttributes[key]);
          await attribute.save();
        }
      }
    }

    successLogger.info(
      `Variant created successfully for product ${productId} with SKU: ${sku}`
    );

    res.status(201).json({
      success: true,
      variant,
    });
  } catch (error) {
    errorLogger.error(error.message);
    return error500Message(res, error.message, "4");
  }
};


// @desc     products variant
// @route   GET /variant
// @access  public

exports.getVariantsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const variants = await Variant.find({ productId });

    if (!variants.length) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No variants found for this product",
        });
    }

    successLogger.info(`Fetched variants for product ${productId}`);

    res.status(200).json({
      success: true,
      variants,
    });
  } catch (error) {
    errorLogger.error(error.message);
    return error500Message(res, error.message, '4');
  }
};

// @desc     products variant by id
// @route   GET /variant
// @access  public

exports.getVariantDetails = async (req, res) => {
  try {
    const { variantId } = req.params;

    // Fetch the variant by ID
    const variant = await Variant.findById(variantId);

    if (!variant) {
      return res
        .status(404)
        .json({ success: false, message: "Variant not found" });
    }

    successLogger.info(`Fetched details for variant ${variantId}`);

    res.status(200).json({
      success: true,
      variant,
    });
  } catch (error) {
    errorLogger.error(error.message);
    return error500Message(res, error.message, '4');
  }
};

// @desc    Add a new products variant by id
// @route   GET /variant
// @access  public

exports.updateVariant = async (req, res) => {
  try {
    const { variantId } = req.params;
    const { attributes, price, stock, discount, image, sku } = req.body;
    const imagePaths = Array.isArray(req.files)
      ? req.files.map((file) => `uploads/${file.filename}`)
      : req.files
      ? [`uploads/${req.files.filename}`]
      : [];
    const variant = await Variant.findByIdAndUpdate(
      variantId,
      { attributes, price, stock, discount, images: imagePaths, sku },
      { new: true }
    );

    if (!variant) {
      return res
        .status(404)
        .json({ success: false, message: "Variant not found" });
    }

    successLogger.info(`Variant updated successfully for variantId: ${variantId}`);

    res.status(200).json({
      success: true,
      variant,
    });
  } catch (error) {
    errorLogger.error(error.message);
    return error500Message(res, error.message, '4');
  }
};

// @desc    delete products variant by id
// @route   DELETE /variant/:variantId
// @access  public

exports.deleteVariant = async (req, res) => {
  try {
    const { variantId } = req.params;

    const variant = await Variant.findByIdAndDelete(variantId);

    if (!variant) {
      return res
        .status(404)
        .json({ success: false, message: "Variant not found" });
    }

    successLogger.info(`Variant with ID ${variantId} deleted successfully`);

    res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
    });
  } catch (error) {
    errorLogger.error(error.message);
    return error500Message(res, error.message, '4');
  }
};
