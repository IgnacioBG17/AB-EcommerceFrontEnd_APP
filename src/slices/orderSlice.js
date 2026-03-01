import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMyOrders,
  fetchOrderById,
  saveOrder,
} from "../actions/orderAction";

const initialState = {
  order: null,
  myOrderDetail: null,
  myOrders: [],
  isUpdated: false,
  paymentIntentId: "",
  clientSecret: "",
  stripeApiKey: "",
  loading: false,
  loadingList: false,
  loadingDetail: false,
  error: null,
  errores: [],
  myOrdersPagination: {
    count: 0,
    pageIndex: 1,
    pageSize: 10,
    pageCount: 0,
    resultByPage: 0,
  },
};

export const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.isUpdated = false;
    },
    clearOrderError: (state) => {
      state.error = null;
      state.errores = null;
    },
  },
  extraReducers: {
    [saveOrder.pending]: (state) => {
      state.error = null;
      state.errores = null;
      state.loading = true;
    },
    [saveOrder.fulfilled]: (state, { payload }) => {
      state.order = payload;
      state.errores = null;
      state.loading = false;
      state.isUpdated = true;
      state.paymentIntentId = payload.paymentIntentId;
      state.clientSecret = payload.clientSecret;
      state.stripeApiKey = payload.stripeApiKey;
    },
    [saveOrder.rejected]: (state, action) => {
      state.error = action.payload;
      state.errores = action.payload;
      state.loading = false;
    },

    [fetchMyOrders.pending]: (state) => {
      state.loadingList = true;
      state.error = null;
    },
    [fetchMyOrders.fulfilled]: (state, { payload }) => {
      state.loadingList = false;
      const data = payload?.data || payload?.Data || [];
      state.myOrders = Array.isArray(data) ? data : data?.$values || [];
      state.myOrdersPagination = {
        count: payload?.count || payload?.Count || 0,
        pageIndex: payload?.pageIndex || payload?.PageIndex || state.myOrdersPagination.pageIndex,
        pageSize: payload?.pageSize || payload?.PageSize || state.myOrdersPagination.pageSize,
        pageCount: payload?.pageCount || payload?.PageCount || 0,
        resultByPage: payload?.resultByPage || payload?.ResultByPage || state.myOrders.length,
      };
      state.error = null;
    },
    [fetchMyOrders.rejected]: (state, action) => {
      state.loadingList = false;
      state.error = action.payload;
    },

    [fetchOrderById.pending]: (state) => {
      state.loadingDetail = true;
      state.error = null;
    },
    [fetchOrderById.fulfilled]: (state, { payload }) => {
      state.loadingDetail = false;
      state.myOrderDetail = payload?.data || payload?.Data || payload;
      state.error = null;
    },
    [fetchOrderById.rejected]: (state, action) => {
      state.loadingDetail = false;
      state.error = action.payload;
    },
  },
});

export const { resetUpdateStatus, clearOrderError } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
