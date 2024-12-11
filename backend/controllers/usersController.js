const bcrypt = require("bcrypt");
const User = require("../models/users");
const Address = require("../models/address.js");
const Token = require("../utils/Token.js");
const { sendEmail } = require("../utils/email");
const { createNotification } = require("./notificationController.js");
const CartWishlist = require("../models/cartWishlist");
const { error500Message } = require("../helper/commonHelper.js");
const { successLogger, errorLogger } = require("../utils/logger.js");


// @desc    // add a new user
// @route   POST /users
// @access  admin 
exports.createUser = async (req, res) => {
  try {
    const { name, mobile, email, gender, password, role } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const existingNumber = await User.findOne({ mobile });
    if (existingNumber) {
      return res.status(400).json({ error: "Mobile Number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      mobile,
      gender,
      role,
      password: hashedPassword,
    });

    const cartWishlist = await CartWishlist.create({
      userId: newUser._id,
    });

    const token = Token.generateJWT(newUser._id);

    // Create a notification for the new user
    await createNotification(
      newUser._id,
      "User Creation",
      `Welcome, ${name}! Your account has been successfully created.`
    );

    // Log success
    successLogger.info('New user created successfully', { userId: newUser._id, name: newUser.name });

    res.status(201).json({
      success: true,
      newUser,
      cartWishlist: cartWishlist,
      token,
    });
  } catch (error) {
    // Log error
    errorLogger.error('Error creating user', { error: error.message });

    return error500Message(res, error.message, '4');
  }
};

// @desc   // get all users
// @route   GET /users
// @access  admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      successLogger.info('Fetched all users successfully', { userCount: users.length });

      res.status(200).json({
        success: true,
        users,
      });

    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    errorLogger.error('Error fetching users');

    return error500Message(res, error.message, '4');
  }
};

// @desc   // get single user by Id
// @route   GET /users/id
// @access  admin
exports.getUserById = async (req, res) => {
  try {
    // const { userId } = req.user; 
    // console.log(userId);
    
    const id = req.params.id;
    const user = await User.findById(id);
    // const address = await Address.find({userId});

    if (user) {
      successLogger.info('User fetched successfully');

      res.status(200).json({
        success: true,
        user,
        // address
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    errorLogger.error('Error fetching user by ID', { error: error.message });

    return error500Message(res, error.message, '4');
  }
};

// @desc  // update user
// @route   UPDATE /users/id
// @access  admin
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobile, email, gender, password, role } = req.body;

    const updateData = { name, mobile, email, gender, role };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (updatedUser) {
      successLogger.info('User profile updated successfully', { userId: updatedUser._id });

      res.status(200).json({
        message: "Profile updated successfully",
        success: true,
        updatedUser,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    errorLogger.error('Error updating user profile', { error: error.message });

    return error500Message(res, error.message, '4');
  }
};

// @desc  // Soft delete a user by ID
// @route   UPDATE /users/id
// @access  admin
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    

    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      successLogger.info('User deleted successfully', { userId: deletedUser._id });

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    errorLogger.error('Error deleting user', { error: error.message });

    return error500Message(res, error.message, '4');
  }
};
