import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const storedCart = typeof window !== 'undefined' && localStorage.getItem('cartItem');
const parsedCart = storedCart ? JSON.parse(storedCart) : [];

const initialSlice = {
  cart: parsedCart,
  totalPrice: parsedCart.reduce((total, item) => total + item.quantity * Number(item.Price), 0),
  totalQuantity: parsedCart.reduce((total, item) => total + item.quantity, 0),
};

// export const fetchData = createAsyncThunk("userData",async() => {
//   const res = await axios.get("http://localhost:4000/posts")
//   return res.data;
// })

const slice = createSlice({
  name: 'cart',
  initialState: initialSlice,
  reducers: {
    addProduct(state, action) {
      const existingProduct = state.cart.find((item) => item.Product_var_id === action.payload.Product_var_id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const newItem = {
          id: nanoid(), 
          ...action.payload,
          quantity: 1,
        };
        state.cart.push(newItem);
      }

      state.totalQuantity += 1;
      state.totalPrice += Number(action.payload.Price);
    },

    deleteProduct(state, action) {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        state.totalQuantity -= product.quantity;
        state.totalPrice -= product.quantity * Number(product.Price);
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = state.cart.find(item => item.id === id);
      if (product && quantity > 0) {
        const quantityDiff = quantity - product.quantity;
        product.quantity = quantity;
    
        state.totalQuantity += quantityDiff;
        state.totalPrice += quantityDiff * Number(product.Price);
      }
    },

    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addProduct, deleteProduct, updateQuantity, clearCart } = slice.actions;
export default slice.reducer;
