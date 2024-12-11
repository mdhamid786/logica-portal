"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { postApiFormData } from "@/helper/common";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Icon } from "@iconify/react";

const BrandForm = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please upload a brand image", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      return;
    }

    const apiData = new FormData();
    apiData.append("title", title);
    apiData.append("name", name);
    apiData.append("brand_image", files[0]);

    try {
      const data = await postApiFormData("brand", apiData, "multipart/form-data");
      if (data.success) {
        toast.success("Brand added successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        resetForm();
      } else {
        toast.error(data.error || "Error adding brand", {
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
    setTitle("");
    setName("");
    setFiles([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              size="lg"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              size="lg"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          
        </div>


        <div className="flex flex-col gap-2 mt-5">
            <Label htmlFor="brand_image">Brand Image</Label>
            <div className={files.length ? "h-[300px] w-full" : ""}>
              {files.length > 0 ? (
                <div className="w-full h-full relative">
                  <Button
                    type="button"
                    className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
                    onClick={() => setFiles([])}
                  >
                    <span className="text-xl">
                      <Icon icon="fa6-solid:xmark" />
                    </span>
                  </Button>
                  <img
                    key={files[0].name}
                    alt={files[0].name}
                    className="w-full h-full object-cover rounded-md"
                    src={URL.createObjectURL(files[0])}
                  />
                </div>
              ) : (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <div className="w-full text-center border-dashed border rounded-md py-[52px] flex items-center flex-col">
                    <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
                      <Upload className="text-default-500" />
                    </div>
                    <h4 className="text-2xl font-medium mb-1 text-card-foreground/80">
                      Drop files here or click to upload.
                    </h4>
                    <div className="text-xs text-muted-foreground">
                      (This is just a demo drop zone. Selected files are not
                      actually uploaded.)
                    </div>
                  </div>
                </div>
              )}
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

export default BrandForm;
