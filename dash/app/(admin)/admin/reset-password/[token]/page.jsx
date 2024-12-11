"use client";
import Image from "next/image";
import background from "@/public/images/new/reser001.png";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postApiData } from "@/helper/common";
import { Loader2 } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
const Page = () => {
 
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

   const params = useParams()
  
   
 



  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const token = params.token
    const apiData = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    setLoading(true);
    try {
      const data = await postApiData(
        `auth/reset-password/${token}`,
        apiData,
        "application/json"
      );
      if (data.success === true) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        location.href="/"
        setIsOtpSent(true);

        setOtp(otpArray);
      } else {
        toast.error(data.error, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      console.log("error");
      
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-background flex items-center overflow-hidden w-full">
        <div className="min-h-screen basis-full flex flex-wrap w-full justify-center overflow-y-auto">
          <div className="basis-1/2 bg-primary w-full relative hidden xl:flex justify-center items-center bg-gradient-to-br from-primary-600 via-primary-400 to-primary-600">
            <Image
            style={{background:"white"}}
              src={background}
              alt="image"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>

          <div className="min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
            <div className="lg:w-[480px]">
              <div className="2xl:mt-8 mt-6 text-2xl font-bold text-default-900 text-center">
                {isOtpSent ? "Reset Password" : "Reset Password"}
              </div>

             
             
           
                <form onSubmit={handleForgotSubmit} className="mt-5">
                  <div>
                    <Label
                      htmlFor="email"
                      className="mb-2 font-medium text-default-600"
                    >
                      New Password
                    </Label>
                    <Input
                      type="password"
                      id="newPassword"
                      placeholder="Enter New Password"
                      size="lg"
                      value={newPassword}
                      onChange={(e) => setnewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="mb-2 font-medium text-default-600 mt-5"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Enter Confirm Password"
                      size="lg"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                      marginTop: "20px",
                    }}
                  >
                 
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
                    "Submit"
                  )}
                </Button>
                  </div>
                
                </form>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
