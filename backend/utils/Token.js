const jwt = require("jsonwebtoken");

// generate jwt token

exports.generateJWT = (user_id) => {
  const token = jwt.sign(
    {
      userId: user_id,
    },
    process.env.SECRET_KEY,

    {
      expiresIn: "2d",
    }
  );
  console.log(token);
  
  return token;
};