"use client";
import Image from "next/image";
import background from "@/public/images/new/reser001.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { postApiData } from "@/helper/common";
import toast from "react-hot-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const handleForgotSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email field cannot be empty.", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      return;
    }

    const apiData = { email };

    try {
      setLoading(true);

      const data = await postApiData("auth/forgot", apiData, "application/json");

      if (data.success) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        setEmail("");
      } else {
        toast.error(data.message || "Failed to send reset email", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      console.error("Error in API call:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  const redirectHome = () =>{
    location.href="/"
  }

  return (
    <div className="min-h-screen bg-background flex items-center overflow-hidden w-full">
      <div className="min-h-screen basis-full flex flex-wrap w-full justify-center overflow-y-auto">
        <div className="basis-1/2 w-full relative hidden xl:flex justify-center items-center bg-gradient-to-br from-primary-600 via-primary-400 to-primary-600">
          <Image
            style={{ background: "white" }}
            src={background}
            alt="Forgot Password Background"
            className="absolute left-0 w-full h-full"
          />
        </div>

        <div className="min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
          <div className="lg:w-[480px]">
            <div className="2xl:mt-8 mt-6 text-2xl font-bold text-default-900 text-center">
              Forgot Password
            </div>
            <p className="mb-6 mt-5 text-center text-gray-600 font-semibold">
              Enter your registered email address, and we will send you instructions to reset your password.
            </p>

            <form onSubmit={handleForgotSubmit} className="mt-5">
              <div>
                <Label
                  htmlFor="email"
                  className="mb-2 font-medium text-default-600"
                >
                  Enter User Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter Email Id"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>

              <div className="mt-5 text-center text-base text-default-600">
                Already Registered?{" "}
                <button onClick={redirectHome} className="text-primary">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
