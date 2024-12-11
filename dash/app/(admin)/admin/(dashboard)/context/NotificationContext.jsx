"use client";

import { getWithToken } from "@/helper/common";
import React, { createContext, useContext, useState, useEffect } from "react";


const NotificationContext = createContext();

export const NotificationProvider = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotificationList = async () => {
    try {
      const apiResData = await getWithToken(`notification`);
      if (apiResData.success) {
        setNotifications(apiResData.notifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotificationList();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotificationList }}>
  
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
