const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'staff', 'user', 'retailer'],
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: (props) => `${props.value} is not a valid 10-digit mobile number!`,
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetTokenExpiresAt: {
      type: Date,
      default: null,
    },
  },
  
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('User', userSchema);
