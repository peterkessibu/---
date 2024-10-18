"use client";
import { useState } from "react";
import ProductTab from "./productstable";
import InventoryPage from "./inventory";
import AddProductPage from "./addproduct";

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* ProductPage Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg transition duration-300 ease-in-out
                        ${
                          activeTab === "addproducts"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        }`}
          onClick={() => setActiveTab("addproducts")}
        >
          Add Product
        </button>
        <button
          className={`px-6 py-2 rounded-lg transition duration-300 ease-in-out
                        ${
                          activeTab === "products"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={`px-6 py-2 rounded-lg transition duration-300 ease-in-out
                        ${
                          activeTab === "inventory"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        }`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </button>
      </div>

      {/* Render active tab content */}
      <div className="mt-4">
        {activeTab === "addproducts" && <AddProductPage />}
        {activeTab === "products" && <ProductTab />}
        {activeTab === "inventory" && <InventoryPage />}
      </div>
    </div>
  );
};

export default ProductPage;
