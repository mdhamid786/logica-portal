const Orders = require("../models/orders")
const OrderDetails = require("../models/order_details")
const Products = require("../models/product")
const coupon = require("../models/coupon")
const User = require("../models/users")
const { error500Message } = require("../helper/commonHelper")
const { successLogger, errorLogger } = require("../utils/logger");




exports.calculateUserBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Orders.find({
      where: { userId },
      attributes: ['balance'], 
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

const totalBalance = orders.reduce((total, order) => {
      return total + order.balance;
    }, 0);

    const updatedUser = await User.findByPk(userId);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await updatedUser.update({ credit: totalBalance });
    successLogger.info('User balance calculated successfully', { userId, totalBalance });
    res.status(200).json({
      success: true,
      totalBalance,
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        credit: updatedUser.credit,
      },
    });
  } catch (error) {
    errorLogger.error('Error calculating user balance', { userId, error: error.message });
    return error500Message(res, error.message, '4');
  }
};


exports.createOrder = async (req, res) => {
  const {
    order_date,
    status,
    order_no,
    payment_status,
    coupon_code,
    overall_distributor_price,
    shipping_method,
    payment_method,
    customer_note,
    currency,
    discount_amount,
    tax_amount,
    userId,
    shipping_address,
    billing_address,
    order_type,
    delivery_date,
    tracking_number,
    order_source,
    products,
    paid_amount,
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'Products array cannot be empty' });
  }

  try {
    let totalProductPrice = 0;
    let totalDiscountAmount = 0;

    for (const product of products) {
      const { product_id, qty } = product;
      const productExists = await Products.findById(product_id);

      if (!productExists) {
        return res.status(404).json({ message: `Product with id ${product_id} not found` });
      }

      const productTotalPrice = parseFloat(productExists.price) * qty;
      const productDiscount =
        (parseFloat(productExists.discount || 0) * productTotalPrice) / 100;

      totalProductPrice += productTotalPrice;
      totalDiscountAmount += productDiscount;
    }

    if (coupon_code) {
      const validCoupon = await coupon.findOne({
        code: coupon_code,
        active: { $lte: new Date() },
        expired: { $gte: new Date() },
      });

      if (validCoupon) {
        totalDiscountAmount += parseFloat(validCoupon.amount);
      } else {
        return res.status(400).json({ message: 'Invalid or expired coupon code.' });
      }
    }

    const finalAmount = totalProductPrice - totalDiscountAmount;
    const balance = finalAmount - (paid_amount || 0);

    const newOrder = new Orders({
      order_date,
      amount: finalAmount,
      status,
      order_no,
      payment_status,
      coupon_code,
      overall_distributor_price,
      shipping_method,
      payment_method,
      customer_note,
      userId,
      currency,
      discount: totalDiscountAmount,
      discount_amount,
      tax_amount,
      shipping_address,
      billing_address,
      order_type,
      delivery_date,
      tracking_number,
      order_source,
      paid_amount,
      balance,
    });

    await newOrder.save();

    for (const product of products) {
      const { product_id, qty } = product;
      const orderDetail = new OrderDetails({
        order_id: newOrder._id,
        product_id,
        qty,
      });
      await orderDetail.save();
    }

    const userOrders = await Orders.find({ userId }).select('balance');
    const totalBalance = userOrders.reduce(
      (total, order) => total + parseFloat(order.balance || 0),
      0
    );

    const updatedUser = await User.findById(userId);
    if (updatedUser) {
      updatedUser.credit = totalBalance;
      await updatedUser.save();
    }
    successLogger.info('Order created successfully', { userId, order_no, totalAmount: finalAmount });
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        ...newOrder.toJSON(),
        paid_amount,
        balance,
      },
      products,
    });
  } catch (error) {
    errorLogger.error('Error creating order', { userId, error: error.message });
    return error500Message(res, error.message, '4');
  }
};

exports.getOrderWithDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Orders.findById(id)
    .populate('orderDetails')  

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    return error500Message(res, error.message, '4');
  }
};

// Get All Orders with Details
exports.getAllOrdersWithDetails = async (req, res) => {
  try {
    // Destructure filter criteria from query parameters
    const {
      status,
      payment_status,
      userId,
      order_date,
      tracking_number,
      amount_min,
      amount_max,
      delivery_date,
    } = req.query;

    const filter = {};

    // Apply filters based on query parameters
    if (status) {
      filter.status = status;
    }

    if (payment_status) {
      filter.payment_status = payment_status;
    }

    if (userId) {
      filter.userId = userId;
    }

    if (order_date) {
      // Convert order_date to a Date object if it's provided
      filter.order_date = new Date(order_date);
    }

    if (tracking_number) {
      // Use a case-insensitive regex to search tracking number
      filter.tracking_number = { $regex: tracking_number, $options: 'i' };
    }

    if (amount_min || amount_max) {
      filter.amount = {};
      if (amount_min) {
        filter.amount.$gte = parseFloat(amount_min); // Greater than or equal
      }
      if (amount_max) {
        filter.amount.$lte = parseFloat(amount_max); // Less than or equal
      }
    }

    if (delivery_date) {
      filter.delivery_date = new Date(delivery_date); // Filter by delivery date
    }

    // Fetch orders with the constructed filter
    const orders = await Orders.find(filter)
      .populate({
        path: 'orderDetails',
        populate: {
          path: 'product',
          select: 'title price identityNumber',
        },
      });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    return error500Message(res, error.message, '4');
  }
};



exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    order_date,
    status,
    order_no,
    payment_status,
    coupon_code,
    overall_distributor_price,
    shipping_method,
    payment_method,
    customer_note,
    currency,
    discount_amount,
    tax_amount,
    userId,
    shipping_address,
    billing_address,
    order_type,
    delivery_date,
    tracking_number,
    order_source,
    products,
    paid_amount,
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'Products array cannot be empty' });
  }

  try {
    const order = await Orders.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    let totalProductPrice = 0;
    let totalDiscountAmount = 0;

    // Loop through the products to calculate total prices and discounts
    for (const product of products) {
      const { product_id, qty } = product;
      const productExists = await Products.findById(product_id);

      if (!productExists) {
        return res.status(404).json({ message: `Product with id ${product_id} not found` });
      }

      const productTotalPrice = parseFloat(productExists.price) * qty;
      const productDiscount = (parseFloat(productExists.discount || 0) * productTotalPrice) / 100;

      totalProductPrice += productTotalPrice;
      totalDiscountAmount += productDiscount;
    }

    // Validate coupon if provided
    if (coupon_code) {
      const validCoupon = await coupon.findOne({
        code: coupon_code,
        active: { $lte: new Date() },
        expired: { $gte: new Date() },
      });

      if (validCoupon) {
        totalDiscountAmount += parseFloat(validCoupon.amount);
      } else {
        return res.status(400).json({ message: 'Invalid or expired coupon code.' });
      }
    }

    const finalAmount = totalProductPrice - totalDiscountAmount;
    const balance = finalAmount - (paid_amount || 0);

    // Update the order with new data
    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      {
        order_date,
        amount: finalAmount,
        status,
        order_no,
        payment_status,
        coupon_code,
        overall_distributor_price,
        shipping_method,
        payment_method,
        customer_note,
        userId,
        currency,
        coupon_code_amount: totalDiscountAmount,
        discount_amount,
        tax_amount,
        shipping_address,
        billing_address,
        order_type,
        delivery_date,
        tracking_number,
        order_source,
        paid_amount,
        balance,
      },
      { new: true } // Ensure the updated document is returned
    );

    // Remove old order details and add new ones
    await OrderDetails.deleteMany({ order_id: updatedOrder._id });

    for (const product of products) {
      const { product_id, qty } = product;
      const orderDetail = new OrderDetails({
        order_id: updatedOrder._id,
        product_id,
        qty,
      });
      await orderDetail.save();
    }

    const userOrders = await Orders.find({ userId }).select('balance');
    const totalBalance = userOrders.reduce(
      (total, order) => total + parseFloat(order.balance || 0),
      0
    );

    const updatedUser = await User.findById(userId);
    if (updatedUser) {
      updatedUser.credit = totalBalance;
      await updatedUser.save();
    }
    successLogger.info('Order updated successfully', { orderId: id, userId, totalAmount: finalAmount });
    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order: {
        ...updatedOrder.toJSON(),
        paid_amount,
        balance,
      },
      products,
    });
  } catch (error) {
    errorLogger.error('Error updating order', { orderId: id, error: error.message });
    return error500Message(res, error.message, '4');
  }
};


// Soft delete an order
exports.softDeleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the order
    const order = await Orders.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    return error500Message(res, error.message, '4');
  }
};





exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'Order ID and status are required.' });
    }

    // Verify if the order exists
    const verifyOrder = await Orders.findById(orderId);

    if (!verifyOrder) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }


    const updateOrder = await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updateOrder) {
      return res.status(500).json({ success: false, message: 'Failed to update order status.' });
    }

    res.status(200).json({ success: true, message: `Order ${updateOrder?.status} successfully.`,updateOrder });
  } catch (error) {
    errorLogger.error('Error updating order', { error: error.message });
    return error500Message(res, error.message, '4');
  }
};
