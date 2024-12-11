import React from "react";
import { NotificationProvider } from "./NotificationContext";
import CouponForm from "../(home)/coupon/components/form";

const FormsContainer = () => {
  return (
    <div>
      <NotificationProvider>
        <CouponForm />
      </NotificationProvider>
    </div>
  );
};

export default FormsContainer;
