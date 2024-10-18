// actions.js
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_TO_INVENTORY = "ADD_TO_INVENTORY";
export const ADD_TO_ECOMMERCE_PREVIEW = "ADD_TO_ECOMMERCE_PREVIEW";

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const addToInventory = (product) => ({
  type: ADD_TO_INVENTORY,
  payload: product,
});

export const addToEcommercePreview = (items) => ({
  type: ADD_TO_ECOMMERCE_PREVIEW,
  payload: items,
});
