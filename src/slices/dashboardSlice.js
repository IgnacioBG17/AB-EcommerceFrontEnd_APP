import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardSummary,
  fetchSalesByCategory,
  fetchSalesByMonth,
  fetchTopProducts,
} from "../actions/dashboardAction";

const initialState = {
  summary: null,
  salesByMonth: [],
  topProducts: [],
  salesByCategory: [],
  loadingSummary: false,
  loadingCharts: false,
  error: null,
  startDate: "",
  endDate: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loadingSummary = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loadingSummary = false;
        state.summary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loadingSummary = false;
        state.error = action.payload;
      })
      .addCase(fetchSalesByMonth.pending, (state) => {
        state.loadingCharts = true;
      })
      .addCase(fetchSalesByMonth.fulfilled, (state, action) => {
        state.salesByMonth = action.payload;
      })
      .addCase(fetchSalesByMonth.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTopProducts.pending, (state) => {
        state.loadingCharts = true;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchSalesByCategory.pending, (state) => {
        state.loadingCharts = true;
      })
      .addCase(fetchSalesByCategory.fulfilled, (state, action) => {
        state.salesByCategory = action.payload;
        state.loadingCharts = false;
      })
      .addCase(fetchSalesByCategory.rejected, (state, action) => {
        state.loadingCharts = false;
        state.error = action.payload;
      });
  },
});

export const { setDateRange, clearDashboardError } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
