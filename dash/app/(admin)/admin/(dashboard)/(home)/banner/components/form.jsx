"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";
import { postApiFormData } from "@/helper/common";
 
const AnnouncementAdd = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    images: "",
  });

  const handleImageChange = (image) => {
    setImages(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({
      title: "",
      description: "",
      images: "",
    });

    if (!title || !description || !images) {
      setErrors({
        title: !title ? "Title is required" : "",
        description: !description ? "Description is required" : "",
        images: !images ? "Please upload an image" : "",
      });
      return;
    }

    const apiData = new FormData();
    apiData.append("title", title);
    apiData.append("description", description);
    apiData.append("images", images);

    try {
      const data = await postApiFormData("announcement", apiData);
      if (data.success === true) {
        toast.success("Announcement added successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        setTitle("");
        setDescription("");
        setImages(null);
      } 
    } catch (errorData) {
      toast.error(errorData.message, {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };


  const resetForm =() =>{
    setTitle("");
        setDescription("");
        setImages(null);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">
              Title<span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">
              Description<span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            {errors.description && (
              <span style={{ color: "red" }}>{errors.description}</span>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <Label>
              Upload Images<span style={{ color: "tomato" }}>*</span>
            </Label>
            <FileUploader
              handleChange={handleImageChange}
              name="images"
              types={fileTypes}
            />
            {errors.images && (
              <span style={{ color: "red" }}>{errors.images}</span>
            )}
            {images && (
              <img
                src={URL.createObjectURL(images)}
                width="100px"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ccc",
                }}
              />
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
    </>
  );
};

export default AnnouncementAdd;
