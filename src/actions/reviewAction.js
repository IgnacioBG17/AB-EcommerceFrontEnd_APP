import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { httpParams } from "../utilities/httpParams";

export const createReview = createAsyncThunk(
  "review/createReview",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/review", params);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al crear el review");
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/review/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al eliminar el review");
    }
  }
);

export const getPaginationReviews = createAsyncThunk(
  "review/getPaginationReviews",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = httpParams(params || {});
      const paramUrl = new URLSearchParams(queryParams).toString();
      const endpoint = paramUrl
        ? `/api/v1/review/paginationReviews?${paramUrl}`
        : "/api/v1/review/paginationReviews";

      const { data } = await axios.get(endpoint);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al listar reviews");
    }
  }
);
