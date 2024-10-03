import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Product 1",
      category: "Electronics",
      price: 99.99,
      quantity: 10,
      status: "Inventory",
      dateAdded: "2024-09-30T11:00:00Z",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Apparel",
      price: 49.99,
      quantity: 20,
      status: "E-commerce",
      dateAdded: "2024-09-30T11:00:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({});

  const handleEdit = (item) => {
    setEditId(item.id);
    setUpdatedItem({ ...item });
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const handleSave = (id) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? (editId === id ? updatedItem : item) : item,
      ),
    );
    setEditId(null);
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Inventory</h2>
      <div className="mb-4 text-lg text-gray-700">
        <p>
          Total Items: <strong>{filteredInventory.length}</strong>
        </p>
      </div>
      <div className="mb-4 items-center justify-center mx-auto">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full md:w-[600px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className={`bg-white shadow-lg rounded-lg p-8 relative ${editId === item.id ? "h-auto" : "h-80"}`}
          >
            <div className="absolute top-4 right-4 flex space-x-2">
              {editId !== item.id && (
                <>
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit className="w-5 h-5 mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash className="w-5 h-5 mr-1" />
                  </button>
                </>
              )}
            </div>

            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={updatedItem.name}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, name: e.target.value })
                  }
                  className="border rounded p-1 mb-2 w-full"
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  value={updatedItem.category}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, category: e.target.value })
                  }
                  className="border rounded p-1 mb-2 w-full"
                  placeholder="Category"
                />
                <input
                  type="number"
                  value={updatedItem.price}
                  onChange={(e) =>
                    setUpdatedItem({
                      ...updatedItem,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="border rounded p-1 mb-2 w-full"
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={updatedItem.quantity}
                  onChange={(e) =>
                    setUpdatedItem({
                      ...updatedItem,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  className="border rounded p-1 mb-2 w-full"
                  placeholder="Quantity"
                />
                <select
                  value={updatedItem.status}
                  onChange={(e) =>
                    setUpdatedItem({ ...updatedItem, status: e.target.value })
                  }
                  className="border rounded p-1 mb-2 w-full"
                >
                  <option value="Inventory">Inventory</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
                <div className="mt-4">
                  <button
                    onClick={() => handleSave(item.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-1/4"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-700">
                  <strong>Category:</strong> {item.category}
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </p>
                <p className="text-gray-700">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
                    className="border rounded p-1 ml-1"
                  >
                    <option value="Inventory">Inventory</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </p>
                <p className="text-gray-700">
                  <strong>Date/Time Added:</strong>{" "}
                  {new Date(item.dateAdded).toLocaleString()}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => handleSave(item.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-1/4"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
