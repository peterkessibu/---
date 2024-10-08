"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function Component() {
  const [filter, setFilter] = useState("all");
  const [customers, setCustomers] = useState([]); 

  useEffect(() => {
    const dummyCustomers = [
      { id: 1, name: "Alice", purchases: [] },
      { id: 2, name: "Bob", purchases: [{ item: "Book", timestamp: Date.now() }] },
    ];
    setCustomers(dummyCustomers);
  }, []);

  const filteredCustomers =
    filter === "all"
      ? customers
      : filter === "purchased"
        ? customers.filter((c) => c.purchases.length > 0)
        : customers;

  const formatUTCToGMT = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-GB", {
      timeZone: "GMT",
      hour12: false,
    });
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Customer Management
        </h1>

        <div className="mb-6">
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full sm:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Customers</option>
            <option value="purchased">Customers with Purchases</option>
          </select>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purchases
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {customer.purchases.length > 0 ? (
                          customer.purchases.map((purchase, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-1 mb-1"
                            >
                              <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span className="truncate">
                                {purchase.item} -{" "}
                                {formatUTCToGMT(purchase.timestamp)}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span>No purchases</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
