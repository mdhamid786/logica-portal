const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
// const log = require("./utils/logger.js");

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoutes = require('./routes/auth.js');
const users = require("./routes/users.js");
const category = require("./routes/category.js");
const product = require("./routes/product.js");
const brand = require("./routes/brand.js");
const coupon = require("./routes/coupon.js");
const CartWishlist = require("./routes/cartWishlist.js");
const address = require("./routes/address.js");
const order = require("./routes/orders.js");
const notification = require("./routes/notification.js");
const variant = require("./routes/variant.js");
const review = require("./routes/review.js");




// Middleware to parse JSON requests



// Root route
app.get('/', (req, res) => {
  res.send(`
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logica Ecommerce API - Routes</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #e60000; /* Red color */
            text-align: center;
            margin-bottom: 20px;
            font-size: 2em;
        }
        h2 {
            color: #333;
            margin-top: 30px;
            border-bottom: 2px solid #e60000; /* Red underline */
            padding-bottom: 10px;
            font-size: 1.5em;
        }
        ul {
            list-style: none;
            padding-left: 0;
        }
        li {
            font-size: 16px;
            margin: 10px 0;
            line-height: 1.6;
        }
        a {
            color: #e60000; /* Red color */
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .route-group {
            margin-top: 20px;
        }
        .route-title {
            font-weight: bold;
            font-size: 18px;
            color: #333;
        }
        .route-info {
            margin-left: 20px;
            font-size: 14px;
            color: #555;
        }
        .code-snippet {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            padding: 10px;
            font-size: 14px;
            margin-top: 10px;
            overflow-x: auto;
        }
        .route-group ul {
            padding-left: 20px;
            background-color: #f9f9f9;
            border-left: 4px solid #e60000; /* Red left border */
            padding: 10px 20px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .route-group ul li {
            font-size: 16px;
        }
        .route-group ul li a {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Logica Ecommerce System API Routes</h1>
        <p>The following are the available API routes for the Logica Ecommerce system:</p>

        <div class="route-group">
            <h2>Auth Routes</h2>
            <ul>
                <li><a href="http://localhost:5000/auth/login">Login</a> - POST - User login</li>
                <li><a href="http://localhost:5000/auth/register">Register</a> - POST - User registration</li>
                <li><a href="http://localhost:5000/auth/me">Profile</a> - GET - Get user profile</li>
                <li><a href="http://localhost:5000/auth/forgot">Forgot Password</a> - PUT - Reset password request</li>
            </ul>
        </div>

        <div class="route-group">
            <h2>User Routes</h2>
            <ul>
                <li><a href="http://localhost:5000/users">All Users</a> - GET - Get all users</li>
                <li><a href="http://localhost:5000/users/{userId}">User by ID</a> - GET - Get user by ID</li>
                <li><a href="http://localhost:5000/users">Add User</a> - POST - Create a new user</li>
                <li><a href="http://localhost:5000/users/{userId}">Update User</a> - PUT - Update user info</li>
                <li><a href="http://localhost:5000/users/{userId}">Delete User</a> - DELETE - Delete user</li>
            </ul>
        </div>

        <div class="route-group">
            <h2>Product Routes</h2>
            <ul>
                <li><a href="http://localhost:5000/product/list">All Products</a> - GET - List all products</li>
                <li><a href="http://localhost:5000/product/{productId}">Product by ID</a> - GET - Get product by ID</li>
                <li><a href="http://localhost:5000/product">Add Product</a> - POST - Add a new product</li>
                <li><a href="http://localhost:5000/product/{productId}">Update Product</a> - PUT - Update product details</li>
                <li><a href="http://localhost:5000/product/{productId}">Delete Product</a> - DELETE - Delete a product</li>
            </ul>
        </div>

        <div class="route-group">
            <h2>Coupon Routes</h2>
            <ul>
                <li><a href="http://localhost:5000/coupon/list">All Coupons</a> - GET - List all coupons</li>
                <li><a href="http://localhost:5000/coupon">Add Coupon</a> - POST - Add a new coupon</li>
                <li><a href="http://localhost:5000/coupon/{couponId}">Delete Coupon</a> - DELETE - Delete a coupon</li>
            </ul>
        </div>

        <div class="route-group">
            <h2>Order Routes</h2>
            <ul>
                <li><a href="http://localhost:5000/orders/create">Create Order</a> - POST - Place a new order</li>
                <li><a href="http://localhost:5000/orders/{orderId}">Order by ID</a> - GET - Get order details by ID</li>
                <li><a href="http://localhost:5000/orders/{orderId}">Update Order</a> - PUT - Update order status</li>
                <li><a href="http://localhost:5000/orders/{orderId}">Delete Order</a> - DELETE - Delete an order</li>
            </ul>
        </div>

        <div class="route-group">
            <h2>Cart & Wishlist Routes</h2>
            <ul>
                <li><a href="http://localhost:5000/CartWishlist/add-item">Add Item to Cart</a> - POST - Add item to cart</li>
                <li><a href="http://localhost:5000/CartWishlist/checkout">Checkout</a> - POST - Checkout cart</li>
                <li><a href="http://localhost:5000/CartWishlist/clear">Clear Cart</a> - DELETE - Clear the cart</li>
                <li><a href="http://localhost:5000/CartWishlist/remove-item">Remove Item from Cart</a> - DELETE - Remove item from cart</li>
            </ul>
        </div>

        <div class="route-group">
            <h2>Review Routes</h2>
            <ul>
                <li><a href="http://localhost:5000/review">Add Review</a> - POST - Submit a product review</li>
                <li><a href="http://localhost:5000/review/{productId}">All Reviews for Product</a> - GET - List all reviews for a product</li>
                <li><a href="http://localhost:5000/review/{reviewId}">Delete Review</a> - DELETE - Delete a review</li>
            </ul>
        </div>

    </div>
</body>
</html>


  `);
});


// Register routes
// app.use('/api/users', users);
app.use('/auth', authRoutes);
app.use("/users", users);
app.use("/categories", category);
app.use("/product", product);
app.use("/brand", brand);
app.use("/coupon", coupon);
app.use("/CartWishlist", CartWishlist);
app.use("/address", address);
app.use("/orders", order);
app.use("/notification", notification);
app.use("/variants", variant);
app.use("/review", review);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




