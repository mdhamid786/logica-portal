const Notification = require("../models/notification");
const { successLogger, errorLogger } = require("../utils/logger");
const { error500Message } = require("../helper/commonHelper");

// Create a new notification
exports.createNotification = async (userId, actionType, message) => {
  try {
    const notification = new Notification({ userId, actionType, message });
    await notification.save();

    successLogger.info(`Notification created for user ${userId}: ${notification._id}`);
    return notification;
  } catch (error) {
    errorLogger.error(`Error creating notification for user ${userId}: ${error.message}`);
    throw error;
  }
};

// Get notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId, "7878");

    const notifications = await Notification.find({ userId, isRead:false });
    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    successLogger.info(`Fetched notifications for user ${userId}: ${notifications.length} notifications`);
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    errorLogger.error(`Error fetching notifications for user ${req.user.userId}: ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    successLogger.info(`Notification with ID ${notificationId} marked as read`);
    res.status(200).json({success:true,notification});
  } catch (error) {
    errorLogger.error(`Error marking notification as read (ID: ${req.params.notificationId}): ${error.message}`);
    return error500Message(res, error.message, '4');
  }
};





exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;

    const updatedNotifications = await Notification.updateMany(
      { userId: userId, isRead: false }, 
      { isRead: true }  
    );

    if (updatedNotifications.modifiedCount === 0) {
      return res.status(404).json({ error: "No unread notifications found" });
    }

    successLogger.info(`All notifications for user ${userId} marked as read`);
    res.status(200).json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    errorLogger.error(`Error marking all notifications as read for user ${req.user.userId}: ${error.message}`);
    return error500Message(res, error.message, "4");
  }
};
