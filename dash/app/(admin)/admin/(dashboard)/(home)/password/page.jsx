"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DueForm from "./components/Form";

const PasswordChange = () => {



  // const [currentPassword, setcurrentPassword] = useState("");
  // const [newPassword, setnewPassword] = useState("");
  // const [confirmPassword, setconfirmPassword] = useState("");


  
   
 



  // const handleChangeSubmit = async (e) => {
  //   e.preventDefault();
   
  //   const apiData = {
  //     currentPassword: currentPassword,
  //     newPassword: newPassword,
  //     confirmPassword: confirmPassword,
  //   };

  //   try {
  //     const data = await postApiData(
  //       `users/change-password`,
  //       apiData,
  //       "application/json"
  //     );
  //     if (data.success === true) {
  //       toast.success(data.message, {
  //         position: "bottom-center",
  //         style: { borderRadius: "10px", background: "#333", color: "#fff" },
  //       });
  //      setconfirmPassword("")
  //      setnewPassword("")
  //      setcurrentPassword("")
  //     } else {
  //       toast.error(data.error, {
  //         position: "bottom-center",
  //         style: { borderRadius: "10px", background: "#333", color: "#fff" },
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error");
      
  //   }
  // };




  return (

    <Card>
      <CardHeader>
        <CardTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          Change Password
         
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 space-y-4 gap-2 lg:space-y-0 lg:grid lg:grid-cols-1 gap-6 mx-auto ">

          <div className="col-span-2 mb-5">

            <DueForm />

          </div>
        </div>
      </CardContent>
    </Card >

  );
};

export default PasswordChange;