"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { postApiData } from "@/helper/common";

const LogInForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  // Input states
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // Error and loading states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordType = () => {
    setPasswordType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  const handlerLogin = async (event) => {
    event.preventDefault();
    toast.dismiss();

    // Validate inputs
    const newErrors = {};
    if (!mobile) newErrors.mobile = "Mobile number is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    // If errors exist, return early
    if (Object.keys(newErrors).length > 0) return;

    const apiData = { mobile, password };

    try {
      setLoading(true);

      const data = await postApiData("auth/login", apiData);

      if (data.success) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });

        // Save token and user info
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        document.cookie = `token=${data.token}`;
        location.href = "/admin/dashboard";
      } else {
        toast.error(data.error || "Login failed", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (errorData) {
      toast.error(errorData.message || "An unexpected error occurred", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="2xl:mt-2 mt-6 mb-2 2xl:text-3xl text-2xl font-bold text-default-900 text-center">
        WELCOME TO LOGICA PORTAL
      </div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6 text-center">
        Welcome to the Logica Portal! We are excited to have you join our community.
      </div>
      <form onSubmit={handlerLogin} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="mobile" className="mb-2 font-medium text-default-600">
            Enter Mobile Number{" "}
          </Label>
          <Input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="text"
            id="mobile"
            placeholder="Enter Mobile Number"
            className={cn("", {
              "border-destructive": errors.mobile,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            Password{" "}
          </Label>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordType}
              id="password"
              className="peer"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder="Enter Password"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "text" ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-5 h-5 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-5 h-5 text-default-400"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 mb-8 flex justify-end flex-wrap gap-2">
          <Link href="/admin/forgot" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
      
         <Button
          className="w-full"
          disabled={loading}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LogInForm;
