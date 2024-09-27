import { useState } from "react";
import {
  Package,
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from "lucide-react";
import Image from "next/image";

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
  {
    id: 3,
    name: "Portable Charger",
    dateInput: "2023-06-20",
    status: "In Stock",
    location: "Inventory",
    image: "/placeholder.svg?height=80&width=80",
    description: "10000mAh portable battery pack for mobile devices.",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    dateInput: "2023-06-05",
    status: "Sold",
    location: "Physical Store",
    image: "/placeholder.svg?height=80&width=80",
    description: "Waterproof Bluetooth speaker with 360-degree sound.",
  },
  {
    id: 5,
    name: "Laptop Stand",
    dateInput: "2023-06-25",
    status: "In Stock",
    location: "Inventory",
    image: "/placeholder.svg?height=80&width=80",
    description: "Adjustable aluminum laptop stand for improved ergonomics.",
  },
];

export default function InventoryTrackingPage() {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [editingItem, setEditingItem] = useState(null);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle delete item
  const handleDelete = (id) => {
    const updatedInventory = inventoryData.filter((item) => item.id !== id);
    setInventoryData(updatedInventory);
  };

  // Handle edit item
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  // Save edited item
  const handleSave = () => {
    const updatedInventory = inventoryData.map((item) =>
      item.id === editingItem.id ? editingItem : item,
    );
    setInventoryData(updatedInventory);
    setEditingItem(null);
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

  const filteredItems = sortedItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Inventory Tracking</h1>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {editingItem && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Edit Item</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={editingItem.name}
                onChange={handleEditChange}
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
                value={editingItem.dateInput}
                onChange={handleEditChange}
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
                value={editingItem.status}
                onChange={handleEditChange}
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
                value={editingItem.location}
                onChange={handleEditChange}
                className="mt-1 block w-full border rounded-md py-2 px-3"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">
                <button
                  className="font-bold flex items-center"
                  onClick={() => handleSort("name")}
                >
                  Item Name
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-2 text-left">
                <button
                  className="font-bold flex items-center"
                  onClick={() => handleSort("dateInput")}
                >
                  Date of Input
                  {sortConfig.key === "dateInput" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </button>
              </th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.dateInput}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === "In Stock"
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-4">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-500">
            No items found. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  );
}
