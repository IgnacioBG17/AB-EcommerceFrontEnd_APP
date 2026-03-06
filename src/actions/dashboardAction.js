import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

const buildQuery = ({ startDate, endDate }) => ({
  params: {
    startDate: startDate || "",
    endDate: endDate || "",
  },
});

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.Data)) return payload.Data;
  if (Array.isArray(payload?.$values)) return payload.$values;
  return [];
};

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/dashboard/summary", buildQuery({ startDate, endDate }));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Error cargando resumen"
      );
    }
  }
);

export const fetchSalesByMonth = createAsyncThunk(
  "dashboard/fetchSalesByMonth",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/api/v1/dashboard/sales-by-month",
        buildQuery({ startDate, endDate })
      );
      return normalizeList(response.data);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Error cargando ventas mensuales"
      );
    }
  }
);

export const fetchTopProducts = createAsyncThunk(
  "dashboard/fetchTopProducts",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/dashboard/top-products", buildQuery({ startDate, endDate }));
      return normalizeList(response.data);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Error cargando top productos"
      );
    }
  }
);

export const fetchSalesByCategory = createAsyncThunk(
  "dashboard/fetchSalesByCategory",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/api/v1/dashboard/sales-by-category",
        buildQuery({ startDate, endDate })
      );
      return normalizeList(response.data);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Error cargando ventas por categoría"
      );
    }
  }
);
