// pages/admin/customers.js
"use client";
import React, { useState } from "react";

const CustomersPage = () => {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      purchases: [{ item: "Product 1", timestamp: "2024-09-30T10:00:00Z" }],
      views: [{ item: "Product 2", count: 3 }],
    },
    {
      id: 2,
      name: "Jane Smith",
      purchases: [],
      views: [
        { item: "Product 1", count: 5 },
        { item: "Product 3", count: 2 },
      ],
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredCustomers =
    filter === "all"
      ? customers
      : filter === "purchased"
        ? customers.filter((c) => c.purchases.length > 0)
        : customers.filter((c) => c.views.length > 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-1"
        >
          <option value="all">All Customers</option>
          <option value="purchased">Customers with Purchases</option>
          <option value="viewed">Customers with Views</option>
        </select>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Customer Name</th>
            <th className="py-2 px-4 text-left">Purchases</th>
            <th className="py-2 px-4 text-left">Views</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="py-2 px-4">{customer.name}</td>
              <td className="py-2 px-4">
                {customer.purchases.map((purchase, index) => (
                  <div key={index}>
                    {purchase.item} -{" "}
                    {new Date(purchase.timestamp).toLocaleString()}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4">
                {customer.views.map((view, index) => (
                  <div key={index}>
                    {view.item} - {view.count} views
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersPage;
