"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionAdd = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [amount, setAmount] = useState("");
  const [transRef, setTransRef] = useState("");
  const [comment, setComment] = useState("");

  const [screenShotImg, setscreenShotImg] = useState(null);
  const [errors, setErrors] = useState({
    amount: "",
    transRef: "",
    comment: "",
    screenShotImg: "",
  });

 
  const handleImageChange = (setImage, image) => {
    setImage(image);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
      const apiData = new FormData();
      apiData.append("amount", amount);
      apiData.append("transRef", transRef);
      apiData.append("comment", comment);
      try {
        const data = await postApiFormDataToken("", apiData);
        if (data.error === false) {
          toast.success(data.message, {
            position: "bottom-center",
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
          });
          setComment(null);
          setAmount(null);
          setTransRef(null);
        } else {
          toast.error(data.message, {
            position: "bottom-center",
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
          });
        }
      } catch (errorData) {
        toast.error(errorData.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
             Select Dealer
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a dealer" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="mathmatics">Mathmatics</SelectItem>
        <SelectItem value="physics">Physics</SelectItem>
        <SelectItem value="chemistry">Chemistry</SelectItem>
        <SelectItem value="biology">Biology</SelectItem>
      </SelectContent>
    </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="transRef">
            Select Orders
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a Orders" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="mathmatics">Mathmatics</SelectItem>
        <SelectItem value="physics">Physics</SelectItem>
        <SelectItem value="chemistry">Chemistry</SelectItem>
        <SelectItem value="biology">Biology</SelectItem>
      </SelectContent>
    </Select>
          
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <Label htmlFor="transRef">
            Type
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">Credit</SelectItem>
       
        <SelectItem value="physics">Debit</SelectItem>
       
      </SelectContent>
    </Select>
          
          </div>

          <div className="flex flex-col gap-3">
            <Label>
           Amount
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
            size="lg"
              type="number"
              id="amount"
              required
              // value={amount}
              // onChange={(e) => setAmount(e.target.value)}
              placeholder={("Amount")}
            />
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <Label htmlFor="comment">
             Remark
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
                size="lg"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Comment")}
            />
            {errors.comment && (
              <span style={{ color: "red" }}>{errors.comment}</span>
            )}
          </div>
        </div>

        <div
          style={{ margin: "auto", width: "300px", gap: "20px" }}
          className="mt-5 flex justify-center"
        >
          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
          Reset
          </Button>

          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
            {("Submit")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TransactionAdd;