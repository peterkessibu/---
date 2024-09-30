"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

// Inline components
const Button = ({ type, children }) => (
  <button
    type={type}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    {children}
  </button>
);

const Input = ({ id, type = "text", value, onChange, placeholder }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
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

const RadioGroup = ({ value, onValueChange, children }) => (
  <div onChange={(e) => onValueChange(e.target.value)}>{children}</div>
);

const RadioGroupItem = ({ value, id }) => (
  <input type="radio" value={value} id={id} name="status" className="mr-2" />
);

const Card = ({ children }) => (
  <div className="border rounded-lg p-4 bg-white shadow">{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

export default function ProductPage({ saveToInventory = () => {} }) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState("");
  const [margin, setMargin] = useState("");
  const [status, setStatus] = useState("on page");
  const [imageUrl, setImageUrl] = useState(
    "/placeholder.svg?height=200&width=200",
  );

  const handleSaveProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: productName,
      description,
      category,
      price,
      cost,
      profit,
      margin,
      status,
      image: imageUrl,
      dateInput: new Date().toISOString().split("T")[0],
      location: status === "inventory" ? "Inventory" : "On Page",
    };
    saveToInventory(newProduct);

    // Reset form after saving
    setProductName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setCost("");
    setProfit("");
    setMargin("");
    setStatus("on page");
    setImageUrl("/placeholder.svg?height=200&width=200");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveProduct();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit}>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost">Cost per item</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profit">Profit</Label>
                    <Input
                      id="profit"
                      type="number"
                      value={profit}
                      onChange={(e) => setProfit(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="margin">Margin</Label>
                    <Input
                      id="margin"
                      type="number"
                      value={margin}
                      onChange={(e) => setMargin(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Label>Status</Label>
                <RadioGroup value={status} onValueChange={setStatus}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="on page" id="on-page" />
                    <Label htmlFor="on-page">On Page</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inventory" id="inventory" />
                    <Label htmlFor="inventory">Inventory</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8">
            <Button type="submit">Save Product</Button>
          </div>
        </form>
        <div>
          <Card>
            <CardContent>
              <div className="mb-4">
                <Label>Product Image</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <ImageIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src={imageUrl}
                alt="Product"
                className="w-full h-auto rounded-lg"
                width={200}
                height={200}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
