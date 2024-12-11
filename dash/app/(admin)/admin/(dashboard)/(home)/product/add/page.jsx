// "use client";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import DueForm from "../components/form";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Fragment, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import { Upload } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { postApiFormData } from "@/helper/common";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// const AddProduct = () => {
//   const [files, setFiles] = useState([]);

//   // Dropzone configuration
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) =>
//       setFiles(acceptedFiles.map((file) => Object.assign(file))),
//   });

//   const renderFilePreview = (file) =>
//     file.type.startsWith("image") ? (
//       <Image
//         width={48}
//         height={48}
//         alt={file.name}
//         src={URL.createObjectURL(file)}
//         className="rounded border p-0.5"
//       />
//     ) : (
//       <Icon icon="tabler:file-description" />
//     );

//   const handleRemoveFile = (file) => {
//     setFiles(files.filter((f) => f.name !== file.name));
//   };

//   const handleRemoveAllFiles = () => setFiles([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const apiResData = await getApiData(`categories`);
//         setCategories(apiResData.success ? apiResData.hierarchy : []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     const fetchBrands = async () => {
//       try {
//         const apiResData = await getApiData(`brand`);
//         setBrands(apiResData.success ? apiResData.brands : []);
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//       }
//     };

//     fetchCategories();
//     fetchBrands();
//   }, []);

//   const [variantData, setVariantData] = useState({
//     productId: "",
//     attributes: {},
//     price: "",
//     stock: "",
//     discount: "",
//     sku: "",
//   });
//   const [attributeKey, setAttributeKey] = useState("");
//   const [attributeValue, setAttributeValue] = useState("");
//   const [brandId, setBrandId] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [description, setDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");

//   const handleInputChange = (field, value) => {
//     setVariantData((prev) => ({ ...prev, [field]: value }));
//   };

//   const addAttribute = (e) => {
//     e.preventDefault()
//     if (attributeKey && attributeValue) {
//       setVariantData((prev) => ({
//         ...prev,
//         attributes: { ...prev.attributes, [attributeKey]: attributeValue },
//       }));
//       setAttributeKey("");
//       setAttributeValue("");
//     } else {
//       toast.error("Both key and value are required!");
//     }
//   };

//   const removeAttribute = (key) => {
//     setVariantData((prev) => {
//       const updatedAttributes = { ...prev.attributes };
//       delete updatedAttributes[key];
//       return { ...prev, attributes: updatedAttributes };
//     });
//   };

//   const handleVariantSubmit = async () => {
//     if (!variantData.productId || !variantData.price || !variantData.stock) {
//       toast.error("Product ID, Price, and Stock are required fields!");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       Object.entries(variantData).forEach(([key, value]) => {
//         if (key === "attributes") {
//           formData.append(key, JSON.stringify(value));
//         } else {
//           formData.append(key, value);
//         }
//       });

//       const response = await postApiFormData("variants", formData);

//       if (response.success) {
//         toast.success("Variant added successfully!");
//         setVariantData({
//           productId: "",
//           attributes: {},
//           price: "",
//           stock: "",
//           discount: "",
//           sku: "",
//         });
//       } else {
//         toast.error(response.message || "Failed to add variant.");
//       }
//     } catch (error) {
//       toast.error("An error occurred while adding the variant.");
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             Add Product
//             <div className="flex gap-5">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button color="info">Add Variant</Button>
//                 </DialogTrigger>
//                 <DialogContent size="2xl">
//                   <DialogHeader>
//                     <DialogTitle>Create Product Variant</DialogTitle>
//                   </DialogHeader>
//                   <div>
//                     <ScrollArea className="h-[490px]">
//                     <form onSubmit={handleVariantSubmit}>
//       <div className="grid grid-cols-2 gap-4">

//       <div className="flex flex-col gap-2">
//                           <Label htmlFor="productId">Product ID</Label>
//                           <Select>
//       <SelectTrigger>
//         <SelectValue placeholder="Select a subject" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="english">English</SelectItem>
//         <SelectItem value="mathmatics">Mathmatics</SelectItem>
//         <SelectItem value="physics">Physics</SelectItem>
//         <SelectItem value="chemistry">Chemistry</SelectItem>
//         <SelectItem value="biology">Biology</SelectItem>
//       </SelectContent>
//     </Select>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                           <Label htmlFor="attributes">Attributes</Label>
//                           <div className="flex gap-2">
//                             <Input
//                               type="text"
//                               placeholder="Key (e.g., Color)"
//                               value={attributeKey}
//                               onChange={(e) => setAttributeKey(e.target.value)}
//                             />
//                             <Input
//                               type="text"
//                               placeholder="Value (e.g., Pink)"
//                               value={attributeValue}
//                               onChange={(e) => setAttributeValue(e.target.value)}
//                             />
//                             <Button size="icon" onClick={addAttribute}>
//                               +
//                             </Button>
//                           </div>
//                           <ul>
//                             {Object.entries(variantData.attributes).map(
//                               ([key, value]) => (
//                                 <li
//                                   key={key}
//                                   className="flex justify-between items-center"
//                                 >
//                                   <span>
//                                     {key}: {value}
//                                   </span>
//                                   <Button
//                                     size="icon"
//                                     variant="ghost"
//                                     onClick={() => removeAttribute(key)}
//                                   >
//                                     ✕
//                                   </Button>
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                           <Label htmlFor="sku">SKU</Label>
//                           <Input
//                             id="sku"
//                             type="text"
//                             placeholder="Enter SKU"
//                             value={variantData.sku}
//                             onChange={(e) =>
//                               handleInputChange("sku", e.target.value)
//                             }
//                           />
//                         </div>

//         <div className="flex flex-col gap-2">
//                           <Label htmlFor="price">Price</Label>
//                           <Input
//                             id="price"
//                             type="number"
//                             placeholder="Enter price"
//                             value={variantData.price}
//                             onChange={(e) =>
//                               handleInputChange("price", e.target.value)
//                             }
//                           />
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           <Label htmlFor="stock">Stock</Label>
//                           <Input
//                             id="stock"
//                             type="number"
//                             placeholder="Enter stock quantity"
//                             value={variantData.stock}
//                             onChange={(e) =>
//                               handleInputChange("stock", e.target.value)
//                             }
//                           />
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           <Label htmlFor="discount">Discount</Label>
//                           <Input
//                             id="discount"
//                             type="number"
//                             placeholder="Enter discount (in %)"
//                             value={variantData.discount}
//                             onChange={(e) =>
//                               handleInputChange("discount", e.target.value)
//                             }
//                           />
//                         </div>

//                         <div className="flex flex-col gap-2">
//                           <Label htmlFor="discount">Discription</Label>
//                           <Textarea
//             // value={description}
//             // onChange={(e) => setDescription(e.target.value)}
//             placeholder="Type here..."
//             rows="3"
//           />
//                         </div>

//                         <div className="flex flex-col gap-2">
//                           <Label htmlFor="discount">Short Discription</Label>
//                           <Textarea
//             // value={description}
//             // onChange={(e) => setDescription(e.target.value)}
//             placeholder="Type here..."
//             rows="3"
//           />
//                         </div>

//       </div>

//       {/* File Upload Section */}
//       <div className="flex flex-col gap-3 mb-5 mt-10">
//         <Label>Upload Product Images</Label>
//         <Fragment>
//           <div {...getRootProps({ className: "dropzone" })}>
//             <input {...getInputProps()} />
//             <div className="w-full text-center border-dashed border rounded-md py-[52px] flex items-center flex-col">
//               <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
//                 <Upload className="h-6 w-6 text-default-500" />
//               </div>
//               <h4 className="text-2xl font-medium mb-1 text-card-foreground/80">
//                 Drop files here or click to upload.
//               </h4>
//             </div>
//           </div>
//           {files.length > 0 && (
//             <div>
//               {files.map((file) => (
//                 <div
//                   key={file.name}
//                   className="flex justify-between border px-3.5 py-3 my-6 rounded-md"
//                 >
//                   <div className="flex space-x-3 items-center">
//                     {renderFilePreview(file)}
//                     <div>
//                       <div className="text-sm text-card-foreground">
//                         {file.name}
//                       </div>
//                       <div className="text-xs font-light text-muted-foreground">
//                         {`${(file.size / 1024).toFixed(2)} KB`}
//                       </div>
//                     </div>
//                   </div>
//                   <Button
//                     size="icon"
//                     color="destructive"
//                     variant="outline"
//                     className="border-none rounded-full"
//                     onClick={() => handleRemoveFile(file)}
//                   >
//                     <Icon icon="tabler:x" className="h-5 w-5" />
//                   </Button>
//                 </div>
//               ))}
//               <div className="flex justify-end space-x-2">
//                 <Button color="destructive" onClick={handleRemoveAllFiles}>
//                   Remove All
//                 </Button>
//               </div>
//             </div>
//           )}
//         </Fragment>
//       </div>

// <div>

// </div>

//        <div className="mt-5 flex justify-center gap-5">
//           <Button type="button" >
//             Reset
//           </Button>
//           <Button type="submit">Submit</Button>
//         </div>
//     </form>
//                     </ScrollArea>

//                     <div className="flex justify-center gap-3 mt-4">
//                       <DialogClose asChild>
//                         <Button variant="outline">Cancel</Button>
//                       </DialogClose>
//                       <Button onClick={handleVariantSubmit}>Create Variant</Button>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//               <Button color="primary">
//                 <Link href="/admin/product/list" prefetch>
//                   Products List
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <DueForm />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default AddProduct;
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react";

import DueForm from "../components/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-hot-toast";
import { getApiData, postApiFormData } from "@/helper/common";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SiteLogo } from "@/components/svg";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

const AddProductVariant = () => {
  const [files, setFiles] = useState([]);

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFiles(acceptedFiles.map((file) => Object.assign(file))),
  });

  const renderFilePreview = (file) =>
    file.type.startsWith("image") ? (
      <Image
        width={48}
        height={48}
        alt={file.name}
        src={URL.createObjectURL(file)}
        className="rounded border p-0.5"
      />
    ) : (
      <Icon icon="tabler:file-description" />
    );

  const handleRemoveFile = (file) => {
    setFiles(files.filter((f) => f.name !== file.name));
  };

  const handleRemoveAllFiles = () => setFiles([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiResData = await getApiData(`categories`);
        setCategories(apiResData.success ? apiResData.hierarchy : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const apiResData = await getApiData(`brand`);
        setBrands(apiResData.success ? apiResData.brands : []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const [variantData, setVariantData] = useState({
    productId: "",
    attributes: {},
    price: "",
    stock: "",
    discount: "",
    sku: "",
  });
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const handleInputChange = (field, value) => {
    setVariantData((prev) => ({ ...prev, [field]: value }));
  };

  const addAttribute = (e) => {
    e.preventDefault();
    if (attributeKey && attributeValue) {
      setVariantData((prev) => ({
        ...prev,
        attributes: { ...prev.attributes, [attributeKey]: attributeValue },
      }));
      setAttributeKey("");
      setAttributeValue("");
    } else {
      toast.error("Both key and value are required!");
    }
  };

  const removeAttribute = (key) => {
    setVariantData((prev) => {
      const updatedAttributes = { ...prev.attributes };
      delete updatedAttributes[key];
      return { ...prev, attributes: updatedAttributes };
    });
  };

  const handleVariantSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      Object.entries(variantData).forEach(([key, value]) => {
        if (key === "attributes") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      files.forEach((file) => {
        formData.append("images", file); // Ensure backend accepts `images` as the field name
      });

      const response = await postApiFormData("variants", formData);

      if (response.success) {
        toast.success("Variant added successfully!");
        setVariantData({
          productId: "",
          attributes: {}, 
          price: "",
          stock: "",
          discount: "",
          sku: "",
          setFiles:""
        });
        
      } else {
        toast.error(response.message || "Failed to add variant.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [data, setData] = useState([]);
  const FetchproductList = async () => {
    try {
      const apiResData = await getApiData(`product/list`);
      if (apiResData.success === true) {
        setData(apiResData?.products);
      } else {
        setData([]);
      }
      console.log(view);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    FetchproductList();
  }, []);

  return (
   <>
    <Card>
      <CardHeader>
        <CardTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Add Product
            <div className="flex gap-5">
              <Sheet>
                <SheetTrigger asChild>
                  <Button color="info">
                    <span className="text-xl mr-1">
                      <Icon icon="icon-park-outline:plus" />
                    </span>
                    Add Variant
                  </Button>
                </SheetTrigger>
                <SheetContent className="max-w-[1036px] p-2">
                  <SheetHeader className="py-3 pl-4">
                    <SheetTitle>Create Product Variant</SheetTitle>
                  </SheetHeader>
                  <hr />
                  <div className="px-5 py-6 h-[calc(100vh-120px)]">
                    <ScrollArea className="h-[500px]">
                      <form onSubmit={handleVariantSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="productId">Product ID</Label>

                            <select
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white hover:bg-gray-50 transition ease-in-out"
                              value={variantData.productId}
                              onChange={(e) =>
                                handleInputChange("productId", e.target.value)
                              }
                            >
                              {data.map((item) => (
                                <option key={item._id} value={item._id}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col gap-2 mx-5">
                            <Label htmlFor="attributes">Attributes</Label>
                            <div className="flex gap-2">
                              <Input
                                type="text"
                                placeholder="Key (e.g., Color)"
                                value={attributeKey}
                                onChange={(e) =>
                                  setAttributeKey(e.target.value)
                                }
                              />
                              <Input
                                type="text"
                                placeholder="Value (e.g., Pink)"
                                value={attributeValue}
                                onChange={(e) =>
                                  setAttributeValue(e.target.value)
                                }
                              />
                              <Button size="icon" onClick={addAttribute}>
                                +
                              </Button>
                            </div>
                            <ul>
                              {Object.entries(variantData.attributes).map(
                                ([key, value]) => (
                                  <li
                                    key={key}
                                    className="flex justify-between items-center"
                                  >
                                    <span>
                                      {key}: {value}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => removeAttribute(key)}
                                    >
                                      ✕
                                    </Button>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label htmlFor="sku">SKU</Label>
                            <Input
                              id="sku"
                              type="text"
                              placeholder="Enter SKU"
                              value={variantData.sku}
                              onChange={(e) =>
                                handleInputChange("sku", e.target.value)
                              }
                            />
                          </div>

                          <div className="flex flex-col gap-2  mx-5">
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id="price"
                              type="number"
                              placeholder="Enter price"
                              value={variantData.price}
                              onChange={(e) =>
                                handleInputChange("price", e.target.value)
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                              id="stock"
                              type="number"
                              placeholder="Enter stock quantity"
                              value={variantData.stock}
                              onChange={(e) =>
                                handleInputChange("stock", e.target.value)
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2  mx-5">
                            <Label htmlFor="discount">Discount</Label>
                            <Input
                              id="discount"
                              type="number"
                              placeholder="Enter discount (in %)"
                              value={variantData.discount}
                              onChange={(e) =>
                                handleInputChange("discount", e.target.value)
                              }
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label htmlFor="discount">Discription</Label>
                            <Textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Type here..."
                              rows="3"
                            />
                          </div>

                          <div className="flex flex-col gap-2  mx-5">
                            <Label htmlFor="discount">Short Discription</Label>
                            <Textarea
                              value={shortDescription}
                              onChange={(e) => setShortDescription(e.target.value)}
                              placeholder="Type here..."
                              rows="3"
                            />
                          </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="flex flex-col gap-3 mb-5 mt-10">
                          <Label>Upload Product Images</Label>
                          <Fragment>
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input {...getInputProps()} />
                              <div className="w-full text-center border-dashed border rounded-md py-[52px] flex items-center flex-col">
                                <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
                                  <Upload className="h-6 w-6 text-default-500" />
                                </div>
                                <h4 className="text-2xl font-medium mb-1 text-card-foreground/80">
                                  Drop files here or click to upload.
                                </h4>
                              </div>
                            </div>
                            {files.length > 0 && (
                              <div>
                                {files.map((file) => (
                                  <div
                                    key={file.name}
                                    className="flex justify-between border px-3.5 py-3 my-6 rounded-md"
                                  >
                                    <div className="flex space-x-3 items-center">
                                      {renderFilePreview(file)}
                                      <div>
                                        <div className="text-sm text-card-foreground">
                                          {file.name}
                                        </div>
                                        <div className="text-xs font-light text-muted-foreground">
                                          {`${(file.size / 1024).toFixed(
                                            2
                                          )} KB`}
                                        </div>
                                      </div>
                                    </div>
                                    <Button
                                      size="icon"
                                      color="destructive"
                                      variant="outline"
                                      className="border-none rounded-full"
                                      onClick={() => handleRemoveFile(file)}
                                    >
                                      <Icon
                                        icon="tabler:x"
                                        className="h-5 w-5"
                                      />
                                    </Button>
                                  </div>
                                ))}
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    color="destructive"
                                    onClick={handleRemoveAllFiles}
                                  >
                                    Remove All
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Fragment>
                        </div>

                        <div></div>

                        <div className="mt-5 flex justify-center gap-5 mb-5">
                          <Button type="button">Reset</Button>
                          <Button type="submit">Submit</Button>
                        </div>
                      </form>
                    </ScrollArea>
                  </div>

                </SheetContent>
              </Sheet>
              <Button variant="primary">
                <Link href="/admin/product/list">Products List</Link>
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DueForm />
        </div>
      </CardContent>
    </Card>
   </>
    
  );
};
// Reusable FormField Component
const FormField = ({ children, label, required }) => (
  <div>
    <Label>
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
  </div>
);
export default AddProductVariant;
