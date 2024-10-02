// pages/admin/discounts.js
"use client";
import React, { useState } from "react";

const DiscountsPage = () => {
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      product: "Product 1",
      discountType: "percentage",
      value: 10,
      active: true,
    },
    {
      id: 2,
      product: "Product 2",
      discountType: "value",
      value: 5,
      active: false,
    },
  ]);

  const [newDiscount, setNewDiscount] = useState({
    product: "",
    discountType: "percentage",
    value: "",
    active: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDiscount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDiscounts((prev) => [...prev, { ...newDiscount, id: Date.now() }]);
    setNewDiscount({
      product: "",
      discountType: "percentage",
      value: "",
      active: false,
    });
  };

  const toggleDiscountStatus = (id) => {
    setDiscounts((prev) =>
      prev.map((discount) =>
        discount.id === id
          ? { ...discount, active: !discount.active }
          : discount,
      ),
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Discounts</h2>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product"
          >
            Product
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product"
            type="text"
            name="product"
            value={newDiscount.product}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="discountType"
          >
            Discount Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="discountType"
            name="discountType"
            value={newDiscount.discountType}
            onChange={handleInputChange}
          >
            <option value="percentage">Percentage</option>
            <option value="value">Value</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="value"
          >
            Discount Value
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="value"
            type="number"
            name="value"
            value={newDiscount.value}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={newDiscount.active}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-gray-700 text-sm font-bold">Active</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Discount
          </button>
        </div>
      </form>

      <h3 className="text-xl font-bold mb-2">Active Discounts</h3>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Product</th>
            <th className="py-2 px-4 text-left">Discount Type</th>
            <th className="py-2 px-4 text-left">Value</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount) => (
            <tr key={discount.id} className="border-b">
              <td className="py-2 px-4">{discount.product}</td>
              <td className="py-2 px-4">{discount.discountType}</td>
              <td className="py-2 px-4">{discount.value}</td>
              <td className="py-2 px-4">
                {discount.active ? "Active" : "Inactive"}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => toggleDiscountStatus(discount.id)}
                  className={`${discount.active ? "bg-red-500" : "bg-green-500"} text-white font-bold py-1 px-2 rounded`}
                >
                  {discount.active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DiscountsPage;
