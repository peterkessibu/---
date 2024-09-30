// pages/admin/settings.js
"use client";
import React, { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    storeName: "My E-commerce Store",
    storeEmail: "contact@mystore.com",
    currency: "USD",
    timeZone: "UTC",
    paymentMethods: {
      creditCard: true,
      paypal: true,
      bankTransfer: false,
    },
    shippingMethods: {
      standard: true,
      express: true,
      overnight: false,
    },
    emailNotifications: {
      orderConfirmation: true,
      shipmentUpdates: true,
      promotions: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (category, name) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: !prev[category][name],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log("Updated settings:", settings);
    alert("Settings updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              General Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Basic settings for your e-commerce store.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="storeName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Store Name
                </label>
                <input
                  type="text"
                  name="storeName"
                  id="storeName"
                  value={settings.storeName}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="storeEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Store Email
                </label>
                <input
                  type="email"
                  name="storeEmail"
                  id="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="timeZone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time Zone
                </label>
                <select
                  id="timeZone"
                  name="timeZone"
                  value={settings.timeZone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Payment Methods
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Select the payment methods you want to offer.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="space-y-4">
              {Object.entries(settings.paymentMethods).map(
                ([method, isEnabled]) => (
                  <div key={method} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={method}
                        name={method}
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() =>
                          handleCheckboxChange("paymentMethods", method)
                        }
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor={method}
                        className="font-medium text-gray-700"
                      >
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </label>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Shipping Methods
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose the shipping options for your store.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="space-y-4">
              {Object.entries(settings.shippingMethods).map(
                ([method, isEnabled]) => (
                  <div key={method} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={method}
                        name={method}
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() =>
                          handleCheckboxChange("shippingMethods", method)
                        }
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor={method}
                        className="font-medium text-gray-700"
                      >
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </label>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Email Notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your email notification settings.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="space-y-4">
              {Object.entries(settings.emailNotifications).map(
                ([notification, isEnabled]) => (
                  <div key={notification} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={notification}
                        name={notification}
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() =>
                          handleCheckboxChange(
                            "emailNotifications",
                            notification,
                          )
                        }
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor={notification}
                        className="font-medium text-gray-700"
                      >
                        {notification.split(/(?=[A-Z])/).join(" ")}
                      </label>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default SettingsPage;
