const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController'); 
const authMiddleware = require('../middleware/auth'); 
const { authenticate } = require('../middleware/Authenticate');

// Get all notifications for the logged-in user
router.get('/', authenticate, NotificationController.getUserNotifications);

// Mark a specific notification as read
router.put('/:notificationId/read', NotificationController.markAsRead);
router.put('/all-read',  authenticate,NotificationController.markAllAsRead);

module.exports = router;
