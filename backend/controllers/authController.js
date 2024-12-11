const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const CartWishlist = require("../models/cartWishlist");
const { successLogger, errorLogger } = require("../utils/logger");
const { error500Message } = require("../helper/commonHelper");
const { sendEmail } = require('../utils/email');

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, mobile, gender } = req.body;


  try {
    const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    mobile,
    gender,
  });

  const cartWishlist = await CartWishlist.create({
    userId: newUser._id,
  });
  successLogger.info("User registered successfully", { userId: newUser.id });

  // Return success response
  return res.status(201).json({
    message: "User registered successfully",
    user: newUser,
    cartWishlist: cartWishlist,
  });
  } catch (error) {
    errorLogger.error("Error registering user", { error: error.message });
    return error500Message(res, error, '4');
  }
  
});

// @desc    Login a user
// @route   POST /auth/login
// @access  Public

exports.loginUser = asyncHandler(async (req, res) => {
  const { mobile, password } = req.body;

  try {
    if (!mobile || !password) {
      return res.status(400).json({ error: "Mobile and password are required" });
    }
  
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    successLogger.info("User logged in successfully", { userId: user.id });
    // Return success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    errorLogger.error("Error logging in user", { error: error.message });
    return error500Message(res, error, '4');
  }

});

// @desc    Get the current logged-in user
// @route   GET /auth/current
// @access  Private

exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
 try {
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  successLogger.info("Fetched current user data", { userId: user.id });
  res.status(200).json(user);
 } catch (error) {
  errorLogger.error("Error fetching current user data", { error: error.message });
  return error500Message(res, error, '4');
 }
});




// @desc  // Soft delete a user by ID
// @route   UPDATE /users/id
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.user; 
    console.log(req.user);

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    
    await user.save();
    successLogger.info("Password changed successfully", { userId: user.id });
    // const token = Token.generateJWT(user.id);
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      token, 
    });
  } catch (error) {
    errorLogger.error("Error changing password", { error: error });
    return error500Message(res, error, '4');
  }
};


// @desc  //Forgot password
// @route   UPDATE /forgot/id
// @access  Private


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email || !/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No account found with this email" });
    }

    // Generate reset token and expiration
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10); // Hash token for security
    const resetTokenExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    // Update user with hashed token and expiration
    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiresAt = resetTokenExpires;

    await user.save();

    const resetURL = `${process.env.RESET_PASSWORD_URL || 'http://localhost:3000'}/admin/reset-password/${resetToken}`;

    // Email HTML content
    const emailContent = `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #dddddd;">
      <h1 style="color: #333; font-size: 24px; text-align: center;">Reset Your Password</h1>
      <p style="font-size: 16px; color: #555;">Hi <strong>${user.name || 'there'}</strong>,</p>
      <p style="font-size: 16px; color: #555;">
        Let's reset your password. Click the button below or copy and paste the URL into your browser. This link is valid for <strong>10 minutes</strong>.
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetURL}" style="background-color: #FF5A1F; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Reset Your Password
        </a>
      </div>
      <p style="font-size: 14px; color: #555;">
        If the above button does not work, copy and paste this URL into your browser:
      </p>
      <p style="font-size: 14px; color: #0073aa; word-wrap: break-word;">
        <a href="${resetURL}" style="color: #0073aa; text-decoration: none;">${resetURL}</a>
      </p>
      <p style="font-size: 14px; color: #555; margin-top: 20px;">
        If you didn't request to reset your password, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #999; text-align: center; margin-top: 20px;">
        &copy; ${new Date().getFullYear()} Your Company
      </p>
    </div>
  `;
  


    // Send email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: emailContent,
    });

    res.status(200).json({ success: true, message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// @desc  //resetPassword password
// @route   UPDATE /forgot/id
// @access  Private

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({
      passwordResetTokenExpiresAt: { $gt: Date.now() }, // Token should still be valid
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired password reset token' });
    }

    const isTokenValid = await bcrypt.compare(token, user.passwordResetToken);
    if (!isTokenValid) {
      return res.status(400).json({ error: 'Invalid or expired password reset token' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    // Clear the reset token fields
    user.passwordResetToken = null;
    user.passwordResetTokenExpiresAt = null;

    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error in resetPassword:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
