"use client";

import { useState } from "react";

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    timezone: "UTC",
    storeName: "",
    currency: "",
    paymentMethods: [],
    deliveryServices: [],
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: "momo", label: "Mobile Money" },
    { id: "telecel", label: "Telecel Cash" },
    { id: "at", label: "AT Cash" },
  ];

  const deliveryServices = [
    { id: "speedaf", label: "Speedaf" },
    { id: "other", label: "Other" },
  ];

  const validateForm = () => {
    let newErrors = {};
    if (formData.storeName.length < 2) {
      newErrors.storeName = "Store name must be at least 2 characters";
    }
    if (formData.paymentMethods.length === 0) {
      newErrors.paymentMethods = "Select at least one payment method";
    }
    if (formData.deliveryServices.length === 0) {
      newErrors.deliveryServices = "Select at least one delivery service";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [name]: [...formData[name], value] });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      console.log(formData);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div>
        <label
          htmlFor="timezone"
          className="block text-sm font-medium text-gray-700"
        >
          Timezone
        </label>
        <select
          id="timezone"
          name="timezone"
          value={formData.timezone}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="UTC">UTC (GMT)</option>
          <option value="EST">EST (Eastern Standard Time)</option>
          <option value="PST">PST (Pacific Standard Time)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="storeName"
          className="block text-sm font-medium text-gray-700"
        >
          Store Name
        </label>
        <input
          type="text"
          id="storeName"
          name="storeName"
          value={formData.storeName}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.storeName && (
          <p className="text-red-600 text-sm mt-1">{errors.storeName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-gray-700"
        >
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700">
          Payment Methods
        </span>
        <p className="text-gray-500 text-sm mb-2">
          Select the payment methods you want to offer.
        </p>
        {paymentMethods.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 mt-2">
            <input
              type="checkbox"
              id={`payment-${item.id}`}
              name="paymentMethods"
              value={item.id}
              checked={formData.paymentMethods.includes(item.id)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={`payment-${item.id}`}
              className="text-sm font-normal text-gray-700"
            >
              {item.label}
            </label>
          </div>
        ))}
        {errors.paymentMethods && (
          <p className="text-red-600 text-sm mt-1">{errors.paymentMethods}</p>
        )}
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700">
          Delivery Services
        </span>
        <p className="text-gray-500 text-sm mb-2">
          Select the delivery services you want to offer.
        </p>
        {deliveryServices.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 mt-2">
            <input
              type="checkbox"
              id={`delivery-${item.id}`}
              name="deliveryServices"
              value={item.id}
              checked={formData.deliveryServices.includes(item.id)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={`delivery-${item.id}`}
              className="text-sm font-normal text-gray-700"
            >
              {item.label}
            </label>
          </div>
        ))}
        {errors.deliveryServices && (
          <p className="text-red-600 text-sm mt-1">{errors.deliveryServices}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Saving..." : "Save Store Settings"}
      </button>
    </form>
  );
}
