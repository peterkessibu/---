// store.js
import { configureStore } from "@reduxjs/toolkit"; // Import configureStore
import rootReducer from "./actions/reducers"; // Adjust the import path as needed

const store = configureStore({
  // Use configureStore instead of createStore
  reducer: rootReducer,
});

export default store;
