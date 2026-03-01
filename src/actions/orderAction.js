import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { httpParams } from "../utilities/httpParams";

export const saveOrder = createAsyncThunk(
    "order/saveOrder",
    async(params, {rejectWithValue}) => {
        try {
            const requestConfig = {
                headers : {
                    "Content-Type": "application/json"
                }
            };

            const {data} = await axios.post(
                `/api/v1/order`,
                params,
                requestConfig
            );

            localStorage.setItem('stripeapi', data.stripeApiKey);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
)

export const confirmPayment = createAsyncThunk(
    "order/payment",
    async(params, {rejectWithValue}) => {
        try {
            const requestConfig = {
                headers : {
                    "Content-Type": "application/json"
                }
            }

            const {data} = await axios.post(
                `/api/v1/payment`,
                params,
                requestConfig
            );

            return data;

        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
)

export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = httpParams(params || {});
      const paramUrl = new URLSearchParams(queryParams).toString();
      const endpoint = paramUrl
        ? `/api/v1/order/paginationByUsername?${paramUrl}`
        : "/api/v1/order/paginationByUsername";

      const { data } = await axios.get(endpoint);
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "No se pudieron obtener tus órdenes"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "No se pudo obtener el detalle de la orden"
      );
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = httpParams(params || {});
      const paramUrl = new URLSearchParams(queryParams).toString();
      const endpoint = paramUrl
        ? `/api/v1/order/paginationAdmin?${paramUrl}`
        : "/api/v1/order/paginationAdmin";

      const { data } = await axios.get(endpoint);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "No se pudieron obtener las órdenes");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {

    try {
      const { data } = await axios.put(`/api/v1/order`, { orderId, status });
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "No se pudo actualizar el estado de la orden");
    }
  }
);

