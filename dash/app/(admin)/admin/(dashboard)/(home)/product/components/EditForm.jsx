"use client";

import { Fragment, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { getApiData, postApiFormData, updateApiData, updateApiFormData } from "@/helper/common";
import { useParams } from "next/navigation";
import VariantList from "../components/variantList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditProduct = () => {
  const baseUrl = process.env.NEXT_PUBLIC_APIBASEURL || '';
  
  const [view, setView] = useState("");
const params = useParams();
  // Handle the View button click and open the Sheet
  const ViewProduct = async () => {
   try {
     const apiResData = await getApiData(`product/${params?.id}`);
       console.log(apiResData?.product?.brandId);
     if (apiResData) {
      setView(apiResData?.product);
      setTitle(apiResData?.product?.title);
      setPrice(apiResData?.product?.price);
      setDescription(apiResData?.product?.description);
      setShortDescription(apiResData?.product?.shortDescription);
      setStatus(apiResData?.product?.stock);
      setBrandId(apiResData?.product?.brandId || "defaultBrandId");
      setFiles([]);
      setPreviewImages(
        apiResData?.product?.images?.map(
          (image) => `${baseUrl}/${image}`
        ) || []
      );
      setCategoryId(apiResData?.product?.categoryId);
      setDiscount(apiResData?.product?.discount);
      setStock(apiResData?.product?.stock);
       
     }
   } catch (error) {
     console.log("Error fetching:", error);
   }
 };

 useEffect(()=>{
  ViewProduct()
 },[])


  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [parent_id, setParentId] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  // Fetch categories and brands
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiResData = await getApiData(`categories`);
        setParentCategories(apiResData.success ? apiResData.hierarchy : []);
        if (!apiResData.success) toast.error(apiResData.message || "Failed to fetch categories");
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
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

    // Render categories recursively
    const renderCategories = (categories, level = 0) =>
      categories.map((category) => (
        <div key={category._id}>
          <SelectItem value={category._id}>
            {"=>".repeat(level) + " " + category.name}
          </SelectItem>
          {category.children?.length > 0 &&
            renderCategories(category.children, level + 1)}
        </div>
      ));


  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = new FormData();
    apiData.append("title", title);
    apiData.append("price", price);
    apiData.append("discount", discount);
    apiData.append("description", description);
    apiData.append("shortDescription", shortDescription);
    apiData.append("brandId", brandId);
    apiData.append("categoryId", categoryId);
    apiData.append("stock", stock);
    apiData.append("status", "in stock");

   
    files.forEach((file) => {
      apiData.append("images", file); 
    });

    try {
      const data = await updateApiFormData(`product/${params.id}`, apiData);
      if (data.success) {
        toast.success("Product update successfully!", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
     
      }
    } catch (error) {
      toast.error(error.message || "Failed to add product", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDiscount("");
    setDescription("");
    setShortDescription("");
    setBrandId("");
    setCategoryId("");
    setStock("");
    setFiles([]);
  };

  const FilePreview = ({ file }) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
    const [error, setError] = useState("");
  
    if (!allowedTypes.includes(file.type)) {
      setError("Only .jpeg, .jpg, .png, .pdf, and .webp files are allowed!");
      return <div className="text-red-500">{error}</div>;
    }
  }

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setPreviewImages(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
  });

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };
  const handleRemoveAllFiles = () => setFiles([]);

 
  return (
   <>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Title" required>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" />
        </FormField>

        <FormField label="Price" required>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price" />
        </FormField>

        <FormField label="Stock">
          <Input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Product Stock" />
        </FormField>

        <FormField label="Discount">
          <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Product Discount" />
        </FormField>

        <FormField label="Brand">
          <Select value={brandId} onValueChange={(value) => setBrandId(value)}>
            <SelectTrigger>
              <SelectValue>{brandId || "Select a Brand"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {brands.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Category">
          <Select value={parent_id} onValueChange={(value) => setParentId(value)}>
            <SelectTrigger>
              <SelectValue>
                {parent_id ? parentCategories.find((cat) => cat.id === +parent_id)?.name : "Select Parent Category"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>{renderCategories(parentCategories)}</SelectContent>
          </Select>
        </FormField>

        <FormField label="Description">
          <ReactQuill value={description} onChange={setDescription} theme="snow" />
        </FormField>

        <FormField label="Short Description">
          <ReactQuill value={shortDescription} onChange={setShortDescription} theme="snow" />
        </FormField>
      </div>

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
          <div className="flex flex-wrap gap-4 mt-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  <Icon icon="material-symbols:close" />
                </button>
              </div>
            ))}
          </div>
          {files.length > 0 && (
            <div>
              {files.map((file) => (
                <div key={file.name} className="flex justify-between border px-3.5 py-3 my-6 rounded-md">
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10">
      {file.type.startsWith("image") ? (
        <Image
          width={48}
          height={48}
          alt={file.name}
          src={URL.createObjectURL(file)}
          className="rounded border p-0.5"
        />
      ) : (
        <Icon icon="tabler:file-description" />
      )}
    </div>
                    <div className="text-sm">{file.name}</div>
                  </div>
                  <div className="cursor-pointer flex items-center justify-center w-6 h-6 bg-muted rounded-full" onClick={() => handleRemoveFile(file)}>
                    <Icon icon="material-symbols:delete" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Fragment>
      </div>

      <div className="text-center">
        <Button type="submit">Add Product</Button>
      </div>
    </form>

    {/* <Card>
      <CardHeader>
        <CardTitle> */}
          <div style={{ display: "flex", justifyContent: "space-between" , fontWeight:"bold"}}>
            Variant Of Product
            <div className=" w-100 flex justify-between gap-5">

              {/* <div>
                <Button color="primary" >
                <Link href="/admin/product/list" prefetch={true}>{("Products List")}</Link>
                </Button>
              </div> */}
            </div>
          </div>
        {/* </CardTitle> */}
      {/* </CardHeader> */}
      {/* <CardContent className="p-0"> */}
        <div className="px-4 space-y-4 gap-2 lg:space-y-0 lg:grid lg:grid-cols-1 gap-6 mx-auto ">

          <div className="col-span-2 mb-5">

            <VariantList id={params?.id} />

          </div>
        </div>
      {/* </CardContent> */}
    {/* </Card > */}

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

export default EditProduct;
