"use client";

import { useState } from "react";
import { Button } from "./components/home/homebutton";
import { Input } from "./components/home/homeinput";
import { Label } from "./components/home/homelabel";
import { Textarea } from "./components/home/hometextarea";
import { Select, SelectItem } from "./components/home/homeselect";
import { RadioGroup, RadioGroupItem } from "./components/home/homeradiogroup";
import { Card, CardContent } from "./components/home/homecard";
import { Bold, Italic, Underline, Image as ImageIcon } from "lucide-react";

export default function ProductPage() {
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const formatText = (format) => {
    const textarea = document.getElementById("description");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    const beforeText = description.substring(0, start);
    const afterText = description.substring(end);

    switch (format) {
      case "bold":
        setDescription(`${beforeText}**${selectedText}**${afterText}`);
        break;
      case "italic":
        setDescription(`${beforeText}*${selectedText}*${afterText}`);
        break;
      case "underline":
        setDescription(`${beforeText}_${selectedText}_${afterText}`);
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
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
                <div className="flex gap-2 mb-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => formatText("bold")}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => formatText("italic")}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => formatText("underline")}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>
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
        </div>
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
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Product"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <Button>Save Product</Button>
      </div>
    </div>
  );
}
