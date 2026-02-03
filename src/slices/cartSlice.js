import { createSlice } from "@reduxjs/toolkit";
import {
  addItemShoppingCart,
  getShoppingCart,
  removeItemShoppingCart,
} from "../actions/cartAction";
import { confirmPayment } from "../actions/orderAction";

const initialState = {
  shoppingCartId: "",
  shoppingCartItems: [],
  total: 0,
  cantidad: 0,
  subTotal: 0,
  impuesto: 0,
  precioEnvio: 0,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers:{
  clearCart(state) {
      state.shoppingCartItems = [];
      state.total = 0;
      state.cantidad = 0;
      state.subTotal = 0;
      state.impuesto = 0;
      state.precioEnvio = 0;
      state.error = null;
    }
  },
  extraReducers: {
    /** getShoppingCart */
    [getShoppingCart.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getShoppingCart.fulfilled]: (state, { payload }) => {
      localStorage.setItem("shoppingCartId", payload.shoppingCartId);
      state.shoppingCartId = payload.shoppingCartId;
      state.shoppingCartItems = payload.shoppingCartItems;
      state.total = payload.total;
      state.cantidad = payload.cantidad;
      state.subTotal = payload.subTotal;
      state.impuesto = payload.impuesto;
      state.precioEnvio = payload.precioEnvio;
      state.loading = false;
      state.error = null;
    },
    [getShoppingCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    /** addItemShoppingCart */
    [addItemShoppingCart.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addItemShoppingCart.fulfilled]: (state, { payload }) => {
      state.shoppingCartId = payload.shoppingCartId;
      state.shoppingCartItems = payload.shoppingCartItems;
      state.total = payload.total;
      state.cantidad = payload.cantidad;
      state.subTotal = payload.subTotal;
      state.impuesto = payload.impuesto;
      state.precioEnvio = payload.precioEnvio;
      state.loading = false;
      state.error = null;
    },
    [addItemShoppingCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    /**removeItemShoppingCart */
    [removeItemShoppingCart.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [removeItemShoppingCart.fulfilled]: (state, { payload }) => {
      state.shoppingCartId = payload.shoppingCartId;
      state.shoppingCartItems = payload.shoppingCartItems;
      state.total = payload.total;
      state.cantidad = payload.cantidad;
      state.subTotal = payload.subTotal;
      state.impuesto = payload.impuesto;
      state.precioEnvio = payload.precioEnvio;
      state.loading = false;
      state.error = null;
    },
    [removeItemShoppingCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    /** Se comenta porque ya se completa el pago pormedio de webhook y se limpia el carrito por medio de clearCart */
    // [confirmPayment.pending]: (state, { payload }) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [confirmPayment.fulfilled]: (state, { payload }) => {
    //   state.shoppingCartItems = [];
    //   state.total = 0;
    //   state.cantidad = 0;
    //   state.subTotal = 0;
    //   state.impuesto = 0;
    //   state.precioEnvio = 0;
    //   state.loading = false;
    //   state.error = null;
    // },
    // [confirmPayment.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    
  },
});

export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
