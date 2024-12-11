const { error500Message } = require("../helper/commonHelper");
const Category = require("../models/category");
const slugify = require("slugify");
const { successLogger, errorLogger } = require("../utils/logger");


// Utility Function to Build Category Hierarchy
const buildHierarchy = (categories, parentId = null) => {
  return categories
    .filter((category) => String(category.parent_id) === String(parentId))
    .map((category) => ({
      ...category,
      children: buildHierarchy(categories, category._id),
    }));
};

// @desc    Add a new category
// @route   POST /categories
// @access  Admin
exports.createCategory = async (req, res) => {
  try {
    const { name, top_category, parent_id } = req.body;
    const slug = slugify(name, { lower: true });
    const cat_image = req.file ? `uploads/${req.file.filename}` : null; 

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Category with this name already exists" });
    }

    // Create a new category
    const category = await Category.create({
      name,
      slug,
      top_category: top_category || false,
      parent_id: parent_id || null, // Set null if no parent is provided
      cat_image,
    });
    successLogger.info(`Category created successfully: ${category._id}`);
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    errorLogger.error(`Error creating category: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};

// @desc    Get all categories as a hierarchy
// @route   GET /categories
// @access  Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const hierarchy = buildHierarchy(categories);
    successLogger.info(`Fetched all categories successfully`);
    return res.status(200).json({
      success: true,
      hierarchy,
    });
  } catch (error) {
    errorLogger.error(`Error fetching categories: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};

// @desc    Get a single category by ID
// @route   GET /categories/:id
// @access  Public
// @desc    Get a single category by ID along with its children
// @route   GET /categories/:id
// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const categories = await Category.find().lean();

    const findCategoryWithChildren = (categories, categoryId) => {
      return categories
        .filter((category) => String(category._id) === String(categoryId))
        .map((category) => ({
          ...category,
          children: categories
            .filter((child) => String(child.parent_id) === String(categoryId))
            .map((child) => findCategoryWithChildren(categories, child._id)),
        }))[0];
    };

    const categoryWithChildren = findCategoryWithChildren(categories, id);

    if (!categoryWithChildren) {
      return res.status(404).json({ error: "Category not found" });
    }
    successLogger.info(`Fetched category with ID: ${id}`);
    return res.status(200).json({
      success: true,
      category: categoryWithChildren,
    });
  } catch (error) {
    errorLogger.error(`Error fetching category by ID: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};

// @desc    Update a category
// @route   PUT /categories/:id
// @access  Admin
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, top_category, parent_id } = req.body;

    // Prepare update data
    const updateData = { name, top_category };

    // Validate and handle parent_id if provided
   
    // Handle file upload
    if (req.file) {
      updateData.cat_image = `uploads/${req.file.filename}`;
    }

    // Generate slug from name
    if (name) {
      updateData.slug = slugify(name, { lower: true });
    }

    // Perform the update operation
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    successLogger.info(`Category updated successfully: ${updatedCategory._id}`);
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    errorLogger.error(`Error updating category: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};

// @desc    Delete a category
// @route   DELETE /categories/:id
// @access  Admin
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const hasChildren = await Category.findOne({ parent_id: id });
    if (hasChildren) {
      return res.status(400).json({
        error: "Cannot delete a category that has child categories",
      });
    }

    // Delete the category
    await Category.findByIdAndDelete(id);
    successLogger.info(`Category deleted successfully: ${id}`);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    errorLogger.error(`Error deleting category: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};
