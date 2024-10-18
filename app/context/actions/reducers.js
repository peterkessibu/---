// reducers.js
import {
  ADD_PRODUCT,
  ADD_TO_INVENTORY,
  ADD_TO_ECOMMERCE_PREVIEW,
} from "./actions";

const initialState = {
  products: [],
  inventory: [],
  ecommercePreview: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ADD_TO_INVENTORY:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };
    case ADD_TO_ECOMMERCE_PREVIEW:
      return {
        ...state,
        ecommercePreview: [...state.ecommercePreview, ...action.payload],
      };
    default:
      return state;
  }
};

export default productReducer;
