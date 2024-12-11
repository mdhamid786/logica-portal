"use client";
import { Bell } from "@/components/svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import shortImage from "@/public/images/all-img/short-image-2.png";
import { useEffect, useState } from "react";
import { getWithToken, updateApiData, updateApiFormData } from "@/helper/common";
import avatar1 from "@/public/images/avatar/avatar-7.jpg";

const NotificationMessage = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications
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

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const data = await updateApiFormData(`notification/${notificationId}/read`);
      if (data.success) {
        fetchNotificationList(); // Refresh notifications
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };


    // Mark notification as read
    const handleMarkAsReadAll = async () => {
      try {
        const data = await updateApiData(`notification/all-read`);
        if (data.success) {
          fetchNotificationList(); // Refresh notifications
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
          data-[state=open]:bg-default-100 dark:data-[state=open]:bg-default-200 
          hover:text-primary text-default-500 dark:text-default-800 rounded-full"
        >
          <Bell className="h-5 w-5" />
          <Badge className="w-4 h-4 p-0 text-xs font-medium items-center justify-center absolute left-[calc(100%-18px)] bottom-[calc(100%-16px)] ring-2 ring-primary-foreground">
            {notifications?.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[999] mx-4 lg:w-[412px] p-0">
        <DropdownMenuLabel
          style={{ backgroundImage: `url(${shortImage.src})` }}
          className="w-full h-full bg-cover bg-no-repeat p-4 flex items-center"
        >
          <span className="text-base font-semibold text-white flex-1">
            Notifications
          </span>
          {/* <span
            className="text-xs font-medium text-white flex-0 cursor-pointer hover:underline"
            onClick={handleMarkAsReadAll}
          >
            Mark all as read
          </span> */}
        </DropdownMenuLabel>
        <div className="h-[300px] xl:h-[350px]">
          <ScrollArea className="h-full">
            {notifications.map((item, index) => (
              <DropdownMenuItem
                key={`inbox-${index}`}
                onClick={() => handleMarkAsRead(item._id)}
                className="flex gap-9 py-2 px-4 cursor-pointer dark:hover:bg-background"
              >
                <div className="flex-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v.75h-.557A4.214 4.214 0 0 0 6.237 7.7l-.221 3.534a7.4 7.4 0 0 1-1.308 3.754a1.617 1.617 0 0 0 1.135 2.529l3.407.408V19a2.75 2.75 0 1 0 5.5 0v-1.075l3.407-.409a1.617 1.617 0 0 0 1.135-2.528a7.4 7.4 0 0 1-1.308-3.754l-.221-3.533a4.214 4.214 0 0 0-4.206-3.951H13zm-2.557 2.25a2.714 2.714 0 0 0-2.709 2.544l-.22 3.534a8.9 8.9 0 0 1-1.574 4.516a.117.117 0 0 0 .082.183l3.737.449c1.489.178 2.993.178 4.482 0l3.737-.449a.117.117 0 0 0 .082-.183a8.9 8.9 0 0 1-1.573-4.516l-.221-3.534a2.714 2.714 0 0 0-2.709-2.544zm1.557 15c-.69 0-1.25-.56-1.25-1.25v-.75h2.5V19c0 .69-.56 1.25-1.25 1.25" clip-rule="evenodd"/></svg>
                  <div>
                    <div className="text-sm font-medium text-default-900 mb-[2px] whitespace-nowrap">
                      {item.actionType}
                    </div>
                    <div className="text-xs text-default-900 truncate max-w-[100px] lg:max-w-[185px]">
                      {item.message}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium text-default-900 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
                <div
                  className={cn("w-2 h-2 rounded-full mr-2", {
                    " bg-green-700": !item.isRead,
                  })}
                ></div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </div>
        <DropdownMenuSeparator />
        <div className="m-4 mt-5">
          <Button asChild type="text" className="w-full">
            <Link href="/admin/dashboard">View All</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMessage;
