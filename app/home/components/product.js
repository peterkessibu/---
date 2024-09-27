import { useState } from "react";
import { Package, Search, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

// Sample inventory data
const initialInventoryData = [
  {
    id: 1,
    name: "Wireless Earbuds",
    dateInput: "2023-06-15",
    status: "In Stock",
    location: "Inventory",
    image: "/placeholder.svg?height=80&width=80",
    description: "High-quality wireless earbuds with noise cancellation.",
  },
  {
    id: 2,
    name: "Smart Watch",
    dateInput: "2023-06-10",
    status: "Sold",
    location: "Online Store",
    image: "/placeholder.svg?height=80&width=80",
    description: "Fitness tracker and smartwatch with heart rate monitoring.",
  },
];

export default function ProductPage() {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [newItem, setNewItem] = useState({
    name: "",
    dateInput: "",
    status: "",
    location: "",
    image: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Handle adding new item to inventory
  const handleAddItem = () => {
    const updatedInventory = [
      ...inventoryData,
      { ...newItem, id: inventoryData.length + 1 },
    ];
    setInventoryData(updatedInventory);
    setNewItem({
      name: "",
      dateInput: "",
      status: "",
      location: "",
      image: "",
      description: "",
    });
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort items
  const sortedItems = [...inventoryData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  // Drag-and-drop image upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileURL = URL.createObjectURL(file);
    setNewItem({ ...newItem, image: fileURL });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Page</h1>

      {/* Add New Item Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Input
            </label>
            <input
              type="date"
              name="dateInput"
              value={newItem.dateInput}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              name="status"
              value={newItem.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={newItem.location}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                Drag & drop an image here, or click to select an image
              </p>
            </div>
            {newItem.image && (
              <Image
                src={newItem.image}
                alt="Uploaded Image"
                width={100}
                height={100}
                className="mt-2 rounded-md"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
