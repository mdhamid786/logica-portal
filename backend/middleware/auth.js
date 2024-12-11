const jwt = require("jsonwebtoken")
const { User, BusinessInfo  } = require('../models/users');
const asyncHandler = require('express-async-handler');




exports.authenticate = async (req, res, next) => {
  console.log("Auth middleware started");
  const token = req.header("Authorization");
  // console.log("Token received:", token);

  if (!token) {
      console.log("Missing Token");
      return res.status(401).json({ error: "Missing Token" });
  }

  try {
      const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
      const decodedToken = jwt.verify(actualToken, process.env.SECRET_KEY);
   
      // req.user = { userId: decodedToken.userId }; 

      req.user = { userId: decodedToken.userId};
      // console.log("this is user", req.user);
      next();
  } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({
          error: "Token is invalid for access, please provide a valid token :x:",
      });
  }
};




// role base  check middleware

exports.isUseRole = (roles) => {
  return asyncHnadler(async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email });
    console.log("User Role from req.user:", req.user.role); 

    if (!user) {
      throw new Error("User not found");
    }

    if (!roles.includes(user.role)) {
      throw new Error(`You do not have access. Required role(s): ${roles.join(", ")}`);
    } else {
      next(); 
    }
  });
};


