const jwt = require("jsonwebtoken")
const  User   = require('../models/users');
const asyncHnadler = require("express-async-handler")


// user authentication
exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Missing Token" });
  }

  try {
    const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    const decodedToken = jwt.verify(actualToken, process.env.SECRET_KEY);
    
    req.user = { userId: decodedToken.userId }; 
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({
      error: "Token is invalid for access, please provide a valid token :x:",
    });
  }
};


// user login 
exports.authMiddleware = asyncHnadler(async(req, res, next) => {
  let token;
  if(req?.headers?.authorization?.startsWith('Bearer')){

    token = req.headers.authorization.split(" ")[1];

    try {
      if(token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId)
        // console.log(user)
         req.user = user;
       
         next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired , Please login again!")
    }

  } else {
    throw new Error ('there is not token available')
  }
});


// admin check middleware

exports.isAdmin =  asyncHnadler(async(req, res, next) => {
 const {email} = req.user;
 const adminUser = await User.findOne({email});
 if(adminUser.role !== "admin") {
  throw new Error("You are not Admin")
 } else {
  next()
 }
})