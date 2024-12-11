// "use client";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { Input } from "@/components/ui/input";
// import { getApiData, postApiFormData, updateApiFormData } from "@/helper/common";
// import { useDropzone } from "react-dropzone";
// import { Upload } from "lucide-react";
// import { Icon } from "@iconify/react";
// import { useParams } from "next/navigation";

// const BrandForm = () => {
//   const [title, setTitle] = useState("");
//   const [name, setName] = useState("");
//   const [files, setFiles] = useState([]);

//   const { getRootProps, getInputProps } = useDropzone({
//     multiple: false,
//     accept: {
//       "image/*": [".png", ".jpg", ".jpeg", ".gif"],
//     },
//     onDrop: (acceptedFiles) => {
//       setFiles(acceptedFiles.map((file) => Object.assign(file)));
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (files.length === 0) {
//       toast.error("Please upload a brand image", {
//         position: "bottom-center",
//         style: { borderRadius: "10px", background: "#333", color: "#fff" },
//       });
//       return;
//     }

//     const apiData = new FormData();
//     apiData.append("title", title);
//     apiData.append("name", name);
//     apiData.append("brand_image", files[0]);

//     try {
//       const data = await updateApiFormData(`brand/${params?.id}`, apiData, "multipart/form-data");
//       if (data.success) {
//         toast.success("Brand update successfully", {
//           position: "bottom-center",
//           style: { borderRadius: "10px", background: "#333", color: "#fff" },
//         });
       
//       } else {
//         toast.error(data.error || "Error adding brand", {
//           position: "bottom-center",
//           style: { borderRadius: "10px", background: "#333", color: "#fff" },
//         });
//       }
//     } catch (error) {
//       toast.error("Error submitting the form", {
//         position: "bottom-center",
//         style: { borderRadius: "10px", background: "#333", color: "#fff" },
//       });
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setName("");
//     setFiles([]);
//   };



//   const [view, setView] = useState("");
// const params = useParams()
//   // Handle the View button click and open the Sheet
//   const getCouponById = async (_id) => {
//    try {
//      const apiResData = await getApiData(`brand/${params?.id}`);
//      if (apiResData) {
//        setView(apiResData?.brand);
//         setTitle(apiResData?.brand?.title)
//         setName(apiResData?.brand?.name)
//      }
//    } catch (error) {
//      console.error("Error fetching:", error);
//    }
//  };

//  useEffect(()=>{
//   getCouponById()
//  },[])

 

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="title">Title</Label>
//             <Input
//               type="text"
//               id="title"
//               size="lg"
//               required
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter Title"
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               type="text"
//               id="name"
//               size="lg"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter Name"
//             />
//           </div>
          
//         </div>


//         <div className="flex flex-col gap-2 mt-5">
//             <Label htmlFor="brand_image">Brand Image</Label>
//             <div className={files.length ? "h-[300px] w-full" : ""}>
//               {files.length > 0 ? (
//                 <div className="w-full h-full relative">
//                   <Button
//                     type="button"
//                     className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
//                     onClick={() => setFiles([])}
//                   >
//                     <span className="text-xl">
//                       <Icon icon="fa6-solid:xmark" />
//                     </span>
//                   </Button>
//                   <img
//                     key={files[0].name}
//                     alt={files[0].name}
//                     className="w-full h-full object-cover rounded-md"
//                     src={URL.createObjectURL(files[0])}
//                   />
//                 </div>
//               ) : (
//                 <div {...getRootProps({ className: "dropzone" })}>
//                   <input {...getInputProps()} />
//                   <div className="w-full text-center border-dashed border rounded-md py-[52px] flex items-center flex-col">
//                     <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
//                       <Upload className="text-default-500" />
//                     </div>
//                     <h4 className="text-2xl font-medium mb-1 text-card-foreground/80">
//                       Drop files here or click to upload.
//                     </h4>
//                     <div className="text-xs text-muted-foreground">
//                       (This is just a demo drop zone. Selected files are not
//                       actually uploaded.)
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         <div className="mt-5 flex justify-center gap-5">
//           <Button type="button" onClick={resetForm}>
//             Reset
//           </Button>
//           <Button type="submit">Submit</Button>
//         </div>
//       </form>
//       <Toaster />
//     </>
//   );
// };

// export default BrandForm;
"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { getApiData, postApiData, updateApiFormData } from "@/helper/common";
import { useParams } from "next/navigation";

const CouponForm = () => {
  const [code, setCode] = useState(""); // State for code
  const [amount, setAmount] = useState(""); // State for amount
  const [active, setActive] = useState(""); // State for active date
  const [expired, setExpired] = useState(""); // State for expired date


  const [view, setView] = useState("");
const params = useParams()
  // Handle the View button click and open the Sheet
  const getCouponById = async () => {
    try {
      const apiResData = await getApiData(`coupon/${params?.id}`);
      if (apiResData) {
        setCode(apiResData?.coupon?.code);
        setAmount(apiResData?.coupon?.amount);
        setActive(apiResData?.coupon?.active.split("T")[0]);
        setExpired(apiResData?.coupon?.expired.split("T")[0]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  
  

 useEffect(()=>{
  getCouponById()
 },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = {
      code,
      amount,
      active,
      expired,
    };

    try {
      const data = await updateApiFormData(`coupon/${params?.id}`, apiData);
      if (data.success) {
        toast.success("Coupon update successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
       
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
