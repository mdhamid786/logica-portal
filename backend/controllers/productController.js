
const slugify = require("slugify");
const Products = require('../models/product')
const Variant = require('../models/variant')
const Brand = require('../models/Brand')
const User = require('../models/users')
const Category = require('../models/category');
const { error500Message } = require("../helper/commonHelper");
const { successLogger, errorLogger } = require("../utils/logger");


// @desc    Add a new products for a user
// @route   POST /product
// @access  admin
exports.createProduct = async (req, res) => {
  try {
    const { title, price, discount, description,shortDescription, rating, identityNumber, categoryId,
       status, brandId, createdById, distributor_price, stock, unit,type , qty } = req.body;

    const slug = slugify(title, { lower: true });
    const imagePaths = Array.isArray(req.files)
    ? req.files.map(file => `uploads/${file.filename}`) 
    : req.files
    ? [`uploads/${req.files.filename}`] 
    : [];

    const product = await Products.create({
      title,
      price,
      discount,
      description,
      shortDescription,
      rating,
      status,
      brandId,
      createdById,
      distributor_price,
      categoryId,
      identityNumber,
      stock,
      slug,
      unit,
      type,
      qty,
      images: imagePaths 
    });
    successLogger.info('Product created successfully', { productId: product.id, productTitle: product.title });
    return res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    errorLogger.error('Error creating product', { error: error.message });
    return error500Message(res, error.message, '4');

  }
};
 
// @desc   // get all products
// @route   GET /products
// @access  Public

exports.getAllProducts = async (req, res) => {
  try {
 
    const products = await Products.find();

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found',
      });
    }
    successLogger.info('Fetched all products', { productCount: products.length });
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    errorLogger.error('Error fetching products', { error: error.message });
    return error500Message(res, error.message, '4');

  }
};

// @desc   //  get product by id
// @route   GET /products
// @access  Public

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    const variant = await Variant.find({productId});

    console.log(variant);
    


    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found',
      });
    }
    

    if (!product) {
      return res.status(404).json({success:false, message: 'Product not found' });
    }
    successLogger.info('Fetched product by ID', { productId });
    res.status(200).json({success:true,product,variant});
  } catch (error) {
    errorLogger.error('Error fetching product by ID', { productId: req.params.id, error: error.message });
    return error500Message(res, error.message, '4');

  }
};

// @desc  // get product by slug
// @route   GET /products/slug
// @access  Public

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ success: false, message: 'Slug is required' });
    }
    const product = await Products.findOne({ slug });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    successLogger.info('Fetched product by slug', { slug });

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    errorLogger.error('Error fetching product by slug', { slug: req.params.slug, error: error.message });
    return error500Message(res, error.message, '4');

  }
};

// @desc  // update product
// @route   UPDATE /products/id
// @access  Public

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, discount, description, rating, identityNumber, categoryId, status, brandId, createdById, distributor_price, stock, qty } = req.body;
    const imagePaths = Array.isArray(req.files)
    ? req.files.map(file => `uploads/${file.filename}`) 
    : req.files
    ? [`uploads/${req.files.filename}`] 
    : [];


    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    product.title = title || product.title;
    product.price = price || product.price;
    product.discount = discount || product.discount;
    product.description = description || product.description;
    product.rating = rating || product.rating;
    product.status = status || product.status;
    product.brandId = brandId || product.brandId;
    product.createdById = createdById || product.createdById;
    product.distributor_price = distributor_price || product.distributor_price;
    product.categoryId = categoryId || product.categoryId;
    product.identityNumber = identityNumber || product.identityNumber;
    product.stock = stock || product.stock;
    product.qty = qty || product.qty; 
    product.images = imagePaths.length ? imagePaths : product.images;

    const updatedProduct = await product.save();
    successLogger.info('Product updated successfully', { productId: updatedProduct.id });
    return res.status(200).json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    errorLogger.error('Error updating product', { productId: req.params.id, error: error.message });
    return error500Message(res, error.message, '4');

  }
};

// @desc  // delete product
// @route   DELETE /products/id
// @access  Public

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID and delete it
    const product = await Products.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    successLogger.info('Product deleted successfully', { productId });
    // Return a success message after deletion
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    errorLogger.error('Error deleting product', { productId: req.params.id, error: error.message });
    return error500Message(res, error.message, '4');

  }
};

