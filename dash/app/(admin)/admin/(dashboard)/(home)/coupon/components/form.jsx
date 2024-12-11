"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { postApiData, postWithToken } from "@/helper/common";
// import { useNotification } from "../../../context/NotificationContext";
const CouponForm = () => {
  const [code, setCode] = useState(""); // State for code
  const [amount, setAmount] = useState(""); // State for amount
  const [active, setActive] = useState(""); // State for active date
  const [expired, setExpired] = useState(""); // State for expired date

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = {
      code,
      amount,
      active,
      expired,
    };

    try {
      // Assuming a POST request function (e.g., postApi) for coupon creation
      const data = await postWithToken("coupon/add", apiData);
      if (data.success) {
        toast.success("Coupon added successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        resetForm();
        fetchNotificationList()
      } else {
        toast.error(data.error || "Error adding coupon", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error("Error submitting the form", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  const resetForm = () => {
    setCode("");
    setAmount("");
    setActive("");
    setExpired("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
        

          {/* Inputs for Amount and Active Date in the same row */}
          <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="code">Coupon Code</Label>
            <Input
              type="text"
              id="code"
              size="lg"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter Coupon Code"
            />
          </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                size="lg"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="active">Active Date</Label>
              <Input
                type="date"
                id="active"
                size="lg"
                required
                value={active}
                onChange={(e) => setActive(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="expired">Expired Date</Label>
            <Input
              type="date"
              id="expired"
              size="lg"
              required
              value={expired}
              onChange={(e) => setExpired(e.target.value)}
            />
          </div>
          </div>

         
        </div>

        <div className="mt-5 flex justify-center gap-5">
          <Button type="button" onClick={resetForm}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default CouponForm;
