"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import Button from "./button";
import Input from "./input";
import Label from "./label";
import Textarea from "./textarea";
import Select from "./select";
import SelectItem from "./selectItem";
import { Card, CardContent } from "./card";
import { useDispatch } from "react-redux";
import { addToInventory } from "../../../context/actions/actions";

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [profitPerUnit, setProfitPerUnit] = useState("");
  const [overallProfit, setOverallProfit] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [status, setStatus] = useState("inventory");
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=200&width=200");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSaveProduct = (event) => {
    event.preventDefault();

    const product = {
      id: Date.now(), // Generate a unique ID for the product
      productName,
      description,
      category,
      unitPrice,
      quantity,
      cost,
      profitPerUnit,
      overallProfit,
      totalRevenue,
      status,
      imageUrl,
      dateAdded: new Date().toISOString(), // Add date/time added
    };

    // Dispatch the action to add the product to the inventory
    dispatch(addToInventory(product));

    // Reset form fields
    setProductName("");
    setDescription("");
    setCategory("");
    setUnitPrice("");
    setQuantity("");
    setCost("");
    setProfitPerUnit("");
    setOverallProfit("");
    setTotalRevenue("");
    setStatus("inventory");
    setImageUrl("/placeholder.svg?height=200&width=200");
    setErrorMessage("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Please upload a valid image (JPEG, PNG, JPG).");
        return;
      }
      setErrorMessage("");
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = () => {
    const price = parseFloat(unitPrice) || 0;
    const qty = parseInt(quantity) || 0;
    const costValue = parseFloat(cost) || 0;

    const profit = price - costValue;
    const revenue = price * qty;
    const overallProfitValue = profit * qty;

    setProfitPerUnit(profit.toFixed(2));
    setTotalRevenue(revenue.toFixed(2));
    setOverallProfit(overallProfitValue.toFixed(2));
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-6">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:order-2">
          <Card className="mb-6">
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="mb-4 w-full">
                  <Label>Image Preview</Label>
                  <div
                    className="relative w-full h-48 sm:w-48 sm:h-48 mx-auto border border-dashed border-gray-400 flex justify-center items-center cursor-pointer"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Product Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    ) : (
                      <ImageIcon className="text-gray-400 w-12 h-12" />
                    )}
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-center mt-2">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/gif"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <form onSubmit={handleSaveProduct} className="md:order-1">
          <Card>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description"
                  rows={5}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectItem value="">Select a category</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="dresses">Dresses</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                </Select>
              </div>
              <div className="mb-4">
                <Label>Pricing</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="unitPrice">Unit Price</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      value={unitPrice}
                      onChange={(e) => {
                        setUnitPrice(e.target.value);
                        handlePriceChange();
                      }}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        handlePriceChange();
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Label>Profit and Revenue</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="profitPerUnit">Profit Per Unit</Label>
                    <Input
                      id="profitPerUnit"
                      type="number"
                      value={profitPerUnit}
                      placeholder="0.00"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="overallProfit">Overall Profit</Label>
                    <Input
                      id="overallProfit"
                      type="number"
                      value={overallProfit}
                      placeholder="0.00"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalRevenue">Total Revenue</Label>
                    <Input
                      id="totalRevenue"
                      type="number"
                      value={totalRevenue}
                      placeholder="0.00"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 w-1/2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Product</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}