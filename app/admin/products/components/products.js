"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

const Button = ({ type, children, onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    {children}
  </button>
);

const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={readOnly}
    className="w-full p-2 border border-gray-300 rounded"
  />
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-gray-700 font-medium mb-2">
    {children}
  </label>
);

const Textarea = ({ id, value, onChange, placeholder, rows }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-2 border border-gray-300 rounded"
  />
);

const Select = ({ value, onValueChange, children }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded"
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const Card = ({ children }) => (
  <div className="border rounded-lg p-4 bg-white shadow">{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

export default function Component({ saveToInventory = () => {} }) {
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
  const [imageUrl, setImageUrl] = useState(
    "/placeholder.svg?height=200&width=200",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: productName,
      description,
      category,
      unitPrice,
      quantity,
      cost,
      profitPerUnit,
      overallProfit,
      totalRevenue,
      status,
      image: imageUrl,
      dateInput: new Date().toISOString().split("T")[0],
    };
    saveToInventory(newProduct);

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
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Please upload a valid image (JPEG, PNG, GIF).");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveProduct();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:order-2">
          <Card>
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
        <form onSubmit={handleSubmit} className="md:order-1">
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
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
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
                  <div>
                    <Label htmlFor="cost">Cost per item</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={cost}
                      onChange={(e) => {
                        setCost(e.target.value);
                        handlePriceChange();
                      }}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profit">Profit per Unit</Label>
                    <Input
                      id="profit"
                      type="number"
                      value={profitPerUnit}
                      readOnly
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="overallProfit">Overall Profit</Label>
                    <Input
                      id="overallProfit"
                      type="number"
                      value={overallProfit}
                      readOnly
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalRevenue">Total Revenue</Label>
                    <Input
                      id="totalRevenue"
                      type="number"
                      value={totalRevenue}
                      readOnly
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="inventory"
                    id="inventory"
                    checked={status === "inventory"}
                    onChange={() => setStatus("inventory")}
                    className="mr-2"
                  />
                  <Label htmlFor="inventory">Inventory</Label>
                  <input
                    type="radio"
                    value="on-page"
                    id="on-page"
                    checked={status === "on-page"}
                    onChange={() => setStatus("on-page")}
                    className="mr-2"
                  />
                  <Label htmlFor="on-page">On Page</Label>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8">
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
