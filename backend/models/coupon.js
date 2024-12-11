const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
   
    code: {
      type: String,
      unique: true,
      required: [true, "Coupon code is required"],
    },
    amount: {
      type: Number,
      required: [true, "Coupon amount is required"],
    },
    active: {
      type: Date,
      required: [true, "Active date is required"],
    },
    expired: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false, 
  }
);

module.exports = mongoose.model("Coupon", CouponSchema);
