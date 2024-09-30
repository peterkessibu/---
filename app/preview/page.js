// pages/admin/preview.js
"use client";
import React, { useState } from "react";

const StorePreview = () => {
  const [viewMode, setViewMode] = useState("desktop");

  const previewContent = (
    <div className="bg-white p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Your Online Store</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">Product 1</h2>
          <p className="text-gray-600">$19.99</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">Product 2</h2>
          <p className="text-gray-600">$24.99</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">Product 3</h2>
          <p className="text-gray-600">$14.99</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Online Store Preview</h2>
      <div className="mb-4">
        <label className="mr-2">View Mode:</label>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="border rounded p-1"
        >
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
      <div
        className={`
        border-4 border-gray-300 rounded-lg overflow-hidden
        ${viewMode === "desktop" ? "w-full" : viewMode === "tablet" ? "w-2/3 mx-auto" : "w-1/3 mx-auto"}
      `}
      >
        <div className="bg-gray-200 p-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="bg-white rounded px-2 py-1 text-sm">
            {viewMode === "desktop" ? "www.yourstore.com" : "yourstore.com"}
          </div>
        </div>
        <div className={`bg-gray-100 ${viewMode === "mobile" ? "p-2" : "p-4"}`}>
          {previewContent}
        </div>
      </div>
    </div>
  );
};

export default StorePreview;
