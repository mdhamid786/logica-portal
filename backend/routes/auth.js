const express = require('express');
const { registerUser, loginUser, getCurrentUser, forgotPassword, resetPassword, changePassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth'); 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', authenticate, getCurrentUser); 
router.put('/change-password', authenticate, changePassword);

module.exports = router;
