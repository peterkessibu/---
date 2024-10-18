"use client";
import React, { createContext, useContext, useState } from "react";

const ProductInventoryContext = createContext();

export const ProductInventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
    setInventory((prev) => [...prev, { ...product, quantity: 0 }]); // Initialize inventory with quantity 0
  };

  const updateInventory = (productId, quantity) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  return (
    <ProductInventoryContext.Provider
      value={{ products, inventory, addProduct, updateInventory }}
    >
      {children}
    </ProductInventoryContext.Provider>
  );
};

export const useProductInventory = () => {
  return useContext(ProductInventoryContext);
};
