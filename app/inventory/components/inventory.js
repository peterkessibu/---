// pages/admin/inventory.js
"use client";
import React, { useState } from "react";

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

  const handleEdit = () => {
    // Implement edit functionality
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <div className="mb-4">
        <p>Total Items: {inventory.length}</p>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Quantity</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Date/Time Added</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.category}</td>
              <td className="py-2 px-4">${item.price.toFixed(2)}</td>
              <td className="py-2 px-4">{item.quantity}</td>
              <td className="py-2 px-4">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="Inventory">Inventory</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
              </td>
              <td className="py-2 px-4">
                {new Date(item.dateAdded).toLocaleString()}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
