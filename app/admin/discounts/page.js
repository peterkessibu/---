"use client";

import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

export default function Component() {
  const [newDiscount, setNewDiscount] = useState({
    product: "",
    discountType: "percentage",
    value: "",
    active: false,
  });
  
  // Add this line to create a state for discounts
  const [discounts, setDiscounts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDiscount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update this line to use setDiscounts
    setDiscounts(prevDiscounts => [...prevDiscounts, { ...newDiscount, id: Date.now() }]);
    setNewDiscount({
      product: "",
      discountType: "percentage",
      value: "",
      active: false,
    });
  };

  const toggleDiscountStatus = (id) => {
    // Update this function to use setDiscounts
    setDiscounts(prevDiscounts =>
      prevDiscounts.map((discount) =>
        discount.id === id
          ? { ...discount, active: !discount.active }
          : discount
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Discounts Management</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Discount
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="product"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product
            </label>
            <input
              id="product"
              type="text"
              name="product"
              value={newDiscount.product}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="discountType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Discount Type
            </label>
            <select
              id="discountType"
              name="discountType"
              value={newDiscount.discountType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="percentage">Percentage</option>
              <option value="value">Value</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Discount Value
            </label>
            <input
              id="value"
              type="number"
              name="value"
              value={newDiscount.value}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input
              id="active"
              type="checkbox"
              name="active"
              checked={newDiscount.active}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="active"
              className="ml-2 block text-sm text-gray-900"
            >
              Active
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Discount
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">
          Active Discounts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {discount.product}
                </h3>
                <p className="text-sm text-gray-500">
                  {discount.discountType === "percentage"
                    ? `${discount.value}%`
                    : `$${discount.value}`}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${discount.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {discount.active ? "Active" : "Inactive"}
                </span>
                <button
                  onClick={() => toggleDiscountStatus(discount.id)}
                  className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white ${
                    discount.active
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  {discount.active ? (
                    <>
                      <MinusIcon className="h-3 w-3 mr-1" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Activate
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}