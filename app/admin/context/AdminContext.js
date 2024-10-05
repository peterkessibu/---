"use client";

import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();
console.log("AdminContext created:", AdminContext);

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [settings, setSettings] = useState({});
  const [analytics, setAnalytics] = useState({});

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    updateInventory(product);
    updateAnalytics("product_added");
  };

  const addDiscount = (discount) => {
    setDiscounts((prevDiscounts) => [...prevDiscounts, discount]);
    updateAnalytics("discount_added");
  };

  const updateInventory = (product) => {
    setInventory((prevInventory) => [
      ...prevInventory,
      { ...product, quantity: product.quantity || 0 },
    ]);
  };

  const updateCustomers = (customer) => {
    setCustomers((prevCustomers) => [...prevCustomers, customer]);
    updateAnalytics("customer_added");
  };

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    updateAnalytics("settings_updated");
  };

  const updateAnalytics = (action) => {
    setAnalytics((prevAnalytics) => ({
      ...prevAnalytics,
      [action]: (prevAnalytics[action] || 0) + 1,
      last_action: new Date().toISOString(),
    }));
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        addProduct,
        discounts,
        addDiscount,
        inventory,
        updateInventory,
        customers,
        updateCustomers,
        settings,
        updateSettings,
        analytics,
        updateAnalytics,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
