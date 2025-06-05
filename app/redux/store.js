import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice"; 
import apiSlice from "./apiSlice"
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: (previousMiddlewares => previousMiddlewares().concat(apiSlice.middleware))
});

setupListeners(store.dispatch);
