"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiData, postApiData } from "@/helper/common";

const Form = () => {
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [contactNumber, setContactNumber] = useState("");

  const [product, setProduct] = useState([null]);
  const [quantity, setQuantity] = useState([1]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [status, setStatus] = useState("");
  const [payment_status, setpayment_status] = useState("");
  const [order_date, setOrder_date] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchProductList = async () => {
    try {
      const apiResData = await getApiData(`product/list`);
      if (apiResData.success) {
        setData(apiResData?.products);
      } else {
        setData([]);
        setError(apiResData.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Error fetching data");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProduct([...product, null]);
    setQuantity([...quantity, 1]);
  };

  const handleRemoveProduct = (index) => {
    setProduct(product.filter((_, i) => i !== index));
    setQuantity(quantity.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, value) => {
    const updatedProduct = [...product];
    updatedProduct[index] = value;
    setProduct(updatedProduct);
  };

  const handleQuantityChange = (index, value) => {
    const updatedQuantity = [...quantity];
    updatedQuantity[index] = Math.max(1, value);
    setQuantity(updatedQuantity);
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    try {
      toast.dismiss();

      const apiData = {
        retailerId: selectedRetailer,
        contactNumber,
        order_date,
        status,

        payment_status,
        products: product.map((id, index) => ({
          product_id: id,
          qty: quantity[index],
        })),
      };

      const response = await postApiData("orders/create", apiData);

      // Handle the API response
      if (response.success) {
        toast.success("Order placed successfully!", {
          position: "bottom-center",
        });
        resetBtn(); // Reset form after successful submission
      } else {
        toast.error(response.message || "Failed to place order.", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while placing the order.", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const resetBtn = () => {
    setQuantity([1]);
    setSelectedRetailer(null);
    setContactNumber("");
  };

  const FetchUserList = async () => {
    try {
      const apiResData = await getApiData(`users`);
      if (apiResData.success) {
        setRetailers(apiResData?.users);
      } else {
        setRetailers([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const handleRetailerChange = (value) => {
    setSelectedRetailer(value);
    const retailer = retailers.find((r) => r._id === value);

    if (retailer) {
      // const selectedBusinessInfo = retailer.businessInfo?.length > 0 ? retailer.businessInfo[0] : null;

      setContactNumber(retailer.mobile || "");
    } else {
      setContactNumber("");
    }
  };

  useEffect(() => {
    FetchUserList();
    fetchProductList();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-11 mb-10">
        {/* Left side */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="w-full">
            <form onSubmit={handleOrderSubmit} className="max-w-lg mx-auto">
              <div className="space-y-4">
                <div className="md:w-1/3 w-full">
                  <Label
                    htmlFor="order-date"
                    className="text-default-600 mb-3 xl:text-lg text-xl"
                  >
                    {"Order Date:"}
                  </Label>
                  <Input
                    placeholder={""}
                    size="lg"
                    id="order-date"
                    type="date"
                    value={order_date}
                    onChange={(e) => setOrder_date(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className=" w-full">
                    <Label htmlFor="Status" className="">
                      Status
                    </Label>
                    <Select
                      value={status}
                      onValueChange={(value) => setStatus(value)}
                    >
                      <SelectTrigger>
                        
                        <SelectValue>{status || "Select a Status"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inprocess">In process</SelectItem>
                        <SelectItem value="dispatched">Dispatched</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className=" w-full">
                    <Label htmlFor="payment_status" className="">
                      Payment Status
                    </Label>
                    <Select
                      value={payment_status}
                      onValueChange={(value) => setpayment_status(value)}
                    >
                      <SelectTrigger>
                        {/* <SelectValue placeholder="Select a subject" /> */}
                        <SelectValue>{payment_status || "Select a Payment"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {product.map((selectedProduct, index) => (
                <div key={index} className="flex">
                  <div className="w-full">
                    <Label className="mt-5" htmlFor={`product-${index}`}>
                      Select Product{" "}
                    </Label>
                    <div className="flex items-start mt-1">
                      <Select
                        value={selectedProduct || ""}
                        onValueChange={(value) =>
                          handleProductChange(index, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {selectedProduct
                              ? data.find((item) => item.id === selectedProduct)
                                  ?.title
                              : "Select a product"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-start ml-4">
                        <div className="flex items-center border-gray-100 mt-1 md:mx-5">
                          <span
                            onClick={() =>
                              handleQuantityChange(index, quantity[index] - 1)
                            }
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-50"
                          >
                            -{" "}
                          </span>
                          <input
                            className="h-7 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={quantity[index]}
                            onChange={(e) =>
                              handleQuantityChange(
                                index,
                                parseInt(e.target.value)
                              )
                            }
                          />
                          <span
                            onClick={() =>
                              handleQuantityChange(index, quantity[index] + 1)
                            }
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-50"
                          >
                            +{" "}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveProduct(index)}
                        type="button"
                        className="ml-2 text-red-500 mt-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="red"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="parent-container mt-5 mr-24 mb-5 mx-10 flex justify-center sm:block">
                <div className="flex justify-center">
                  <Button
                    onClick={handleAddProduct}
                    className="bg-black"
                    size="sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                      />
                    </svg>
                    Add Product
                  </Button>
                </div>
              </div>

              <div className="flex mt-20 gap-2">
                <button
                  type="submit"
                  className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-black"
                >
                  Submit
                </button>

                <button
                  type="reset"
                  onClick={resetBtn}
                  className="text-black bg-gray-200  focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-black"
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="text-black bg-gray-200  focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* right side  */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* right side */}
          <div className="items-center w-full">
            <form>
              <Label
                htmlFor="name"
                className="text-default-600 mb-3 xl:text-lg text-xl"
              >
                {"Retailer:"}
              </Label>
              <Select
                value={selectedRetailer || ""}
                onValueChange={handleRetailerChange}
              >
                <SelectTrigger>
                  <SelectValue>
                    {selectedRetailer
                      ? retailers.find(
                          (retailer) => retailer._id === selectedRetailer
                        )?.name + " "
                      : "Choose Retailer"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {retailers.length > 0 ? (
                    retailers.map((item) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No Retailers Available</SelectItem>
                  )}
                </SelectContent>
              </Select>

              <div className="flex flex-col mt-4 gap-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  type="text"
                  size="lg"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Contact Number"
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Form;
