const apiMessageCode = async (code) => {
  const messages = {
    1:"Address added successfully",
    2: 'data get successfully',
    3: 'Address data not found',
    4: 'Oops, something went wrong. Please try again',
  };

  return messages[code] || "Unknown error code";
};

const errorMessage = async (res, message, code) => {
  return res.status(400).json({
    success: false,
    message: message,
  });
};

const successMessage = async (res, message, code) => {
  return res.status(200).json({
   
    message: message,
    success: true,
    
  });
};

// const successMessageWithData = async (res, message, code) => {
//   return res.status(200).json({
   
//     message: message,
//     error: false,
//     data:data
//   });
// };

const error500Message = async (res, message, code) => {
  return res
    .status(500)
    .json({  message: message, success: false });
};

module.exports = {
  apiMessageCode,
  errorMessage,
  successMessage,
  // successMessageWithData,
  error500Message,
};
