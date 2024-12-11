"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiData, postApiFormData } from "@/helper/common";
import { FileUploader } from "react-drag-drop-files";

const CategoriesAdd = () => {
  const [name, setName] = useState("");
  const [top_category, setTopCategory] = useState("");
  const [parent_id, setParentId] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [images, setImages] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    top_category: "",
    parent_id: "",
    images: "",
  });

  // const fileTypes = ["JPG", "PNG", "GIF"];

  const FetchCategoryList = async () => {
    try {
      const apiResData = await getApiData(`categories`);
      if (apiResData.success) {
        setParentCategories(apiResData.hierarchy); // Assuming API returns hierarchical data
      } else {
        setParentCategories([]);
        toast.error(apiResData.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    FetchCategoryList();
  }, []);

  const handleImageChange = (image) => {
    setImages(image);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = { name: "", top_category: "", parent_id: "", images: "" };

    if (!name.trim()) {
      errorMessages.name = "Category name is required.";
      isValid = false;
    }

    if (!top_category) {
      errorMessages.top_category = "Top category selection is required.";
      isValid = false;
    }

    if (!images) {
      errorMessages.images = "Image upload is required.";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const apiData = new FormData();
    apiData.append("name", name);
    apiData.append("top_category", top_category);
    apiData.append("parent_id", parent_id);
    apiData.append("cat_image", images);

    try {
      const data = await postApiFormData("categories", apiData);
      if (data.success === true) {
        toast.success("Category added successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        FetchCategoryList()
        resetForm();
      } else {
        toast.error(data.error || "Something went wrong!", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (errorData) {
      toast.error("Error while submitting the form", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };  

  const resetForm = () => {
    setName("");
    setTopCategory("");
    setParentId("");
    setImages(null);
    setErrors({ name: "", top_category: "", parent_id: "", images: "" });
  };

  const renderCategories = (categories, level = 0) => {
    return categories.map((category) => (
      <div key={category._id}>
        <SelectItem value={category._id}>
          {"=>".repeat(level) + " " + category.name}
        </SelectItem>
        {category.children && category.children.length > 0 &&
          renderCategories(category.children, level + 1)}
      </div>
    ));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="top_category">Top Category</Label>
            <Select
              value={top_category}
              onValueChange={(value) => setTopCategory(value)}
            >
              <SelectTrigger>
                <SelectValue>
                  {top_category ? top_category : "Select Top Category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            {errors.top_category && (
              <span style={{ color: "red" }}>{errors.top_category}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="parent_id">Parent Category</Label>
            <Select
              value={parent_id}
              onValueChange={(value) => setParentId(value)}
            >
              <SelectTrigger>
                <SelectValue>
                {parent_id ? parentCategories.find((cat) => cat.id === +parent_id)?.name : "Select Parent Category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {renderCategories(parentCategories)}
              </SelectContent>
            </Select>
            {errors.parent_id && (
              <span style={{ color: "red" }}>{errors.parent_id}</span>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <Label>
              Upload Image <span style={{ color: "tomato" }}>*</span>
            </Label>
            <FileUploader
              handleChange={handleImageChange}
              name="images"
              accept="image/*"
            />
            {images && (
              <img
                src={URL.createObjectURL(images)}
                alt="Preview"
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
      <Toaster />
    </>
  );
};

export default CategoriesAdd;
