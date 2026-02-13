import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { httpParams } from "../utilities/httpParams";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (ThunkApi, { rejectWithValue }) => {
    try {
      return await axios.get(`/api/v1/product/list`);
    } catch (err) {
      return rejectWithValue(`Errores: ${err.message}`);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductId",
  async (id, { rejectWithValue }) => {
    try {
      return await axios.get(`/api/v1/product/${id}`);
    } catch (err) {
      return rejectWithValue(`Errores: ${err.message}`);
    }
  }
);

export const getProductPagination = createAsyncThunk(
  "products/getProductPagination",
  async (params, { rejectWithValue }) => {
    try {
      params = httpParams(params);
      const paramUrl = new URLSearchParams(params).toString();

      const results = axios.get(`api/v1/product/pagination?${paramUrl}`);
      return (await results).data;
    } catch (err) {
      return rejectWithValue(`Errores: ${err.message}`);
    }
  }
);

export const getProductPaginationAdmin = createAsyncThunk(
  "products/getProductPaginationAdmin",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = httpParams(params || {});
      const paramUrl = new URLSearchParams(queryParams).toString();
      const endpoint = paramUrl
        ? `/api/v1/product/paginationAdmin?${paramUrl}`
        : "/api/v1/product/paginationAdmin";

      const { data } = await axios.get(endpoint);
      return data;
    } catch (err) {
      return rejectWithValue(`Errores: ${err.message}`);
    }
  }
);

export const registerProduct = createAsyncThunk(
  "product/register",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/v1/product/create`, params, requestConfig);

      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al registrar el producto");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(`/api/v1/product/update`, params, requestConfig);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al actualizar el producto");
    }
  }
);

export const updateStatusProduct = createAsyncThunk(
  "product/updateStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/product/status/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al cambiar estado del producto");
    }
  }
);
