"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { updateApiData } from "@/helper/common";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        currentPassword: !currentPassword ? "Current password is required" : "",
        newPassword: !newPassword ? "New password is required" : "",
        confirmPassword: !confirmPassword ? "Confirm password is required" : "",
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }
    
    const apiData = {
      currentPassword,
      newPassword,
      confirmPassword
    };

    
    try {
      const data = await updateApiData(`auth/change-password`, apiData);
      if (data.success) {
        toast.success("Password updated successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast.error(data.error || "Failed to update Password", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }


    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 relative">
            <Label htmlFor="currentPassword">
              Current Password <span style={{ color: "tomato" }}> *</span>
            </Label>
            <Input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              required
              size="lg"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
            <span
              className="absolute top-9 right-2 cursor-pointer"
              onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
            >
              {showCurrentPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    fillRule="evenodd"
                    d="m18.922 16.8l3.17 3.17l-1.06 1.061L4.06 4.061L5.12 3l2.74 2.738A11.9 11.9 0 0 1 12 5c4.808 0 8.972 2.848 11 7a12.66 12.66 0 0 1-4.078 4.8m-8.098-8.097l4.473 4.473a3.5 3.5 0 0 0-4.474-4.474zm5.317 9.56A11.9 11.9 0 0 1 12 19c-4.808 0-8.972-2.848-11-7a12.66 12.66 0 0 1 4.078-4.8l3.625 3.624a3.5 3.5 0 0 0 4.474 4.474l2.964 2.964z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    fillRule="evenodd"
                    d="M1 12c2.028-4.152 6.192-7 11-7s8.972 2.848 11 7c-2.028 4.152-6.192 7-11 7s-8.972-2.848-11-7m11 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"
                  />
                </svg>
              )}
            </span>
            {errors.currentPassword && (
              <span style={{ color: "red" }}>{errors.currentPassword}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <Label htmlFor="newPassword">
              New Password <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              required
              size="lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <span
              className="absolute top-9 right-2 cursor-pointer"
              onClick={() => togglePasswordVisibility(setShowNewPassword)}
            >
              {showNewPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    fillRule="evenodd"
                    d="m18.922 16.8l3.17 3.17l-1.06 1.061L4.06 4.061L5.12 3l2.74 2.738A11.9 11.9 0 0 1 12 5c4.808 0 8.972 2.848 11 7a12.66 12.66 0 0 1-4.078 4.8m-8.098-8.097l4.473 4.473a3.5 3.5 0 0 0-4.474-4.474zm5.317 9.56A11.9 11.9 0 0 1 12 19c-4.808 0-8.972-2.848-11-7a12.66 12.66 0 0 1 4.078-4.8l3.625 3.624a3.5 3.5 0 0 0 4.474 4.474l2.964 2.964z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    fillRule="evenodd"
                    d="M1 12c2.028-4.152 6.192-7 11-7s8.972 2.848 11 7c-2.028 4.152-6.192 7-11 7s-8.972-2.848-11-7m11 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"
                  />
                </svg>
              )}
            </span>
            {errors.newPassword && (
              <span style={{ color: "red" }}>{errors.newPassword}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-3 relative">
            <Label htmlFor="confirmPassword">
              Confirm New Password <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              required
              size="lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <span
              className="absolute top-9 right-2 cursor-pointer"
              onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    fillRule="evenodd"
                    d="m18.922 16.8l3.17 3.17l-1.06 1.061L4.06 4.061L5.12 3l2.74 2.738A11.9 11.9 0 0 1 12 5c4.808 0 8.972 2.848 11 7a12.66 12.66 0 0 1-4.078 4.8m-8.098-8.097l4.473 4.473a3.5 3.5 0 0 0-4.474-4.474zm5.317 9.56A11.9 11.9 0 0 1 12 19c-4.808 0-8.972-2.848-11-7a12.66 12.66 0 0 1 4.078-4.8l3.625 3.624a3.5 3.5 0 0 0 4.474 4.474l2.964 2.964z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    fillRule="evenodd"
                    d="M1 12c2.028-4.152 6.192-7 11-7s8.972 2.848 11 7c-2.028 4.152-6.192 7-11 7s-8.972-2.848-11-7m11 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"
                  />
                </svg>
              )}
            </span>
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        {/* <div style={{margin:"auto"}}>
        <Button type="submit" className="bg-indigo-600 text-white mt-6">
         Reset
        </Button>

        <Button type="submit" className="bg-indigo-600 text-white mt-6">
          Change Password
        </Button>
        </div> */}
         <div
          style={{ margin: "auto", width: "300px", gap: "20px" }}
          className="mt-5 flex justify-center"
        >
          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
            {("Reset")}
          </Button>

          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
            {("Submit")}
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default PasswordChange;
