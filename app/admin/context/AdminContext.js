"use client";

import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();
console.log('AdminContext created:', AdminContext);

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [inventory, setInventory] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const addDiscount = (discount) => {
    setDiscounts([...discounts, discount]);
  };

  const updateInventory = (newInventory) => {
    setInventory(newInventory);
  };

  return (
    <AdminContext.Provider value={{ 
      products, 
      addProduct, 
      discounts, 
      addDiscount, 
      inventory, 
      updateInventory 
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  console.log('useAdmin called, context:', context);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
