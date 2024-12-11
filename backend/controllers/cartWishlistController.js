// const {  Products, coupon, OrderDetails, Orders, User,address } = require('../models');
const CartWishlistItem = require("../models/cartWishlistItem");
const CartWishlist = require("../models/cartWishlist");
const Address = require("../models/address");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const Orders = require("../models/orders");
const OrderDetails = require("../models/order_details");
const User = require("../models/users");
const { error500Message, apiMessageCode } = require("../helper/commonHelper");
const { successLogger, errorLogger } = require("../utils/logger");
const cartWishlistController = {
  // Add an item to the cart

  addItem: async (req, res) => {
    const { userId, productId, qty } = req.body;

    try {
      const cartWishlist = await CartWishlist.findOne(userId);
      if (!cartWishlist) {
        return res.status(404).json({ message: "CartWishlist not found" });
      }
      const existingItem = await CartWishlistItem.findOne({
        productId,
        status: "cart",
      });
      console.log(existingItem, "true");

      if (existingItem && existingItem.status == "cart") {
        existingItem.qty += qty;

        await existingItem.save();
        
      } else {
        // Add new item to the cart
        await CartWishlistItem.create({
          cartWishlistId: cartWishlist._id,
          productId,
          qty,
          status: "cart",
        });
      }
      successLogger.info(
        `Added product ${productId} to cart for userId: ${userId}`
      );
      res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
      errorLogger.error(
        `Error adding item to cart for userId: ${userId} - ${error.message}`
      );
      return await error500Message(res, await apiMessageCode(4), '4');
    }
  },

  // Add an item to the wishlist

  addWish: async (req, res) => {
    const { userId, productId, qty } = req.body;

    try {
      const cartWishlist = await CartWishlist.findOne(userId);
      if (!cartWishlist) {
        return res.status(404).json({ message: "CartWishlist not found" });
      }
      const existingItem = await CartWishlistItem.findOne({
        cartWishlistId: cartWishlist._id,
        status: "wishlist",
      });

      if (existingItem) {
        await CartWishlistItem.deleteOne({ _id: existingItem._id });
        successLogger.info(
          `Removed product ${productId} from wishlist for userId: ${userId}`
        );
        return res.status(200).json({ message: "Item removed from wishlist" });
      } else {
        await CartWishlistItem.create({
          cartWishlistId: cartWishlist._id,
          productId,
          qty: 1,
          status: "wishlist",
        });
        successLogger.info(
          `Added product ${productId} to wishlist for userId: ${userId}`
        );
        return res
          .status(200)
          .json({ message: "Item added to wishlist successfully" });
      }
    } catch (error) {
      return await error500Message(res, await apiMessageCode(4), '4');
    }
  },

  // Update quantity of an item in the cart

  updateQuantity: async (req, res) => {
    const { productId, qty } = req.body;
    try {
      const item = await CartWishlistItem.findOne({
        productId,
      });

      if (item) {
        item.qty = qty;
        await item.save();
        successLogger.info(
          `Updated quantity of product ${productId} to ${qty}`
        );
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      errorLogger.error(
        `Error updating quantity for product ${productId} - ${error.message}`
      );
      return await error500Message(res, await apiMessageCode(4), '4');
    }
  },

  // Change the status of an item (e.g., from cart to checkout)

  changeStatus: async (req, res) => {
    const { productId, status } = req.body;
    try {
      const item = await CartWishlistItem.findOne({ productId });

      if (item) {
        item.status = status;
        await item.save();
        successLogger.info(
          `Changed status of product ${productId} to ${status}`
        );
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      errorLogger.error(
        `Error changing status for product ${productId} - ${error.message}`
      );
      return await error500Message(res, await apiMessageCode(4), '4');
    }
  },

  // Remove an item from the cart or wishlist

  removeItem: async (req, res) => {
    const { itemId } = req.body;
    try {
      const item = await CartWishlistItem.findByIdAndDelete(itemId);
      if (item) {
        successLogger.info(`Removed item ${itemId}`);
        res.status(200).json({ message: "Item removed successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      errorLogger.error(
        `Error removing item ${itemId} - ${error.message}`
      );
      return await error500Message(res, await apiMessageCode(4), '4');
    }
  },
  // Remove a product item from the cart or wishlist

  removeProductItem: async (req, res) => {
    const { productId } = req.body;
    try {
      const item = await CartWishlistItem.findOneAndDelete(productId);

      if (item) {
        successLogger.info(`Removed item ${item}`);
        res.status(200).json({ message: "Item removed successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      errorLogger.error(
        `Error removing item ${item} - ${error.message}`
      );
      return await error500Message(res, await apiMessageCode(4), '4');
    }
  },

  // Get the cart and wishlist for a specific user

  getCartWishlist: async (req, res) => {
    const { userId } = req.params;
    const { status, productId } = req.query;

    try {
      // Find the CartWishlist for the user
      const cartWishlist = await CartWishlist.findOne({ userId });

      if (!cartWishlist) {
        return res.status(404).json({ message: "CartWishlist not found" });
      }

      // Build filter for CartWishlistItems
      const itemFilter = { cartWishlistId: cartWishlist._id };
      if (status) {
        itemFilter.status = status;
      }
      if (productId) {
        itemFilter.productId = productId;
      }

      // Find items with product details
      const items = await CartWishlistItem.find(itemFilter).populate({
        path: "productId",
        select: "title images stock qty price discount",
      });
      successLogger.info(`Fetched cart and wishlist for userId: ${userId}`);
      res.status(200).json({ cartWishlist, items });
    } catch (error) {
      errorLogger.error(
        `Error fetching cart and wishlist for userId: ${userId} - ${error.message}`
      );
      return error500Message(res, error.message, '4');
    }
  },

  // Clear the cart

  clearCart: async (req, res) => {
    const { userId } = req.body;
    try {
      const cartWishlist = await CartWishlist.findOne(userId);
      if (cartWishlist) {
        await CartWishlistItem.findOneAndDelete({
          cartWishlistId: cartWishlist.id,
          status: "cart",
        });
        successLogger.info(`Cleared cart for userId: ${userId}`);
        res.status(200).json({ message: "Cart cleared successfully" });
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (error) {
      errorLogger.error(
        `Error clearing cart for userId: ${userId} - ${error.message}`
      );
      return error500Message(res, error.message, '4');
    }
  },


  checkout: async (req, res) => {
    const {
      userId,
      address_id,
      billing_address,
      payment_method,
      coupon_code,
      paid_amount,
    } = req.body;

    try {
      // Fetch the user's cart
      const cartWishlist = await CartWishlist.findOne({ userId });

      if (!cartWishlist) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Fetch items in the cart
      const items = await CartWishlistItem.find({
        cartWishlistId: cartWishlist.id,
        status: "cart",
      });

      if (items.length === 0) {
        return res
          .status(404)
          .json({ message: "No items in cart to checkout" });
      }

      // Fetch the address details
      const addressDetails = await Address.findById(address_id);
      if (!addressDetails) {
        return res.status(404).json({ message: "Address not found" });
      }

      // Collect product details
      let totalProductPrice = 0;
      let totalDiscountAmount = 0;
      const products = [];

      for (const item of items) {
        const product = await Product.findById(item.productId);

        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with id ${item.productId} not found` });
        }

        const productTotalPrice = product.price * item.qty;
        const productDiscount =
          ((product.discount || 0) * productTotalPrice) / 100;

        totalProductPrice += productTotalPrice;
        totalDiscountAmount += productDiscount;

        products.push({ product_id: product.id, qty: item.qty });
      }

      // Apply coupon discount if available
      if (coupon_code) {
        const validCoupon = await Coupon.findOne({
          code: coupon_code,
          active: { $lte: new Date() },
          expired: { $gte: new Date() },
        });

        if (validCoupon) {
          totalDiscountAmount += parseFloat(validCoupon.amount);
        } else {
          return res
            .status(400)
            .json({ message: "Invalid or expired coupon code." });
        }
      }

      // Calculate final amount
      const finalAmount = totalProductPrice - totalDiscountAmount;
      const balance = finalAmount - (paid_amount || 0);

      // Create the order
      const newOrder = await Orders.create({
        order_date: new Date(),
        amount: finalAmount,
        status: "pending",
        order_no: `ORD-${Date.now()}`,
        payment_status: paid_amount >= finalAmount ? "paid" : "pending",
        coupon_code,
        overall_distributor_price: totalProductPrice,
        shipping_method: "standard",
        payment_method,
        userId,
        discount_amount: totalDiscountAmount,
        coupon_code_amount: totalDiscountAmount,
        tax_amount: 0,
        address_id,
        billing_address,
        order_type: "online",
        delivery_date: null,
        tracking_number: null,
        order_source: "website",
        paid_amount,
        balance,
      });

      // Save order details
      for (const product of products) {
        await OrderDetails.create({
          order_id: newOrder.id,
          product_id: product.product_id,
          qty: product.qty,
        });
      }

      // Update user credit based on the balance
      const userOrders = await Orders.find({
        where: { userId },
        attributes: ["balance"],
      });
      const totalBalance = userOrders.reduce(
        (total, order) => total + order.balance,
        0
      );

      const updatedUser = await User.findById(userId);
      if (updatedUser) {
        updatedUser.credit = totalBalance;
        await updatedUser.save();
      }

      // Update cart items status to checked_out
      for (const item of items) {
        item.status = "checked_out";
        await item.save();
      }
      successLogger.info(`Checkout successful for userId: ${userId}`);
      // Return response with address details included
      res.status(200).json({
        success: true,
        message: "Checkout and order creation successful",
        order: {
          ...newOrder.toJSON(),
          paid_amount,
          balance,
          addressDetails: {
            addressLine1: addressDetails.addressLine1,
            addressLine2: addressDetails.addressLine2,
            city: addressDetails.city,
            state: addressDetails.state,
            postalCode: addressDetails.postalCode,
            country: addressDetails.country,
          },
        },
        products,
      });
    } catch (error) {
      errorLogger.error(`Checkout failed for userId: ${userId}, Error: ${error.message}`);
      return error500Message(res, error.message, '4');
    }
  },

  getCartWithUserId: async (req, res) => {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    try {
      const cartwishlist = await CartWishlist.findOne({
        where: { userId },
      });
      logger.info(`Fetched cart for userId: ${userId}`);
      res.status(200).json({
        success: true,
        cartwishlist,
      });
    } catch (error) {
      logger.error(`Failed to fetch cart for userId: ${userId}, Error: ${error.message}`);
      return error500Message(res, error.message, '4');
    }
  },
};

module.exports = cartWishlistController;
