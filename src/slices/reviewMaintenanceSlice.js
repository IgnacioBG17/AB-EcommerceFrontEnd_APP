import { createSlice } from "@reduxjs/toolkit";
import { createReview, deleteReview, getPaginationReviews } from "../actions/reviewAction";

const initialState = {
  loading: false,
  submitting: false,
  reviews: [],
  count: 0,
  error: null,
  successMessage: null,
};

export const reviewMaintenanceSlice = createSlice({
  name: "reviewMaintenance",
  initialState,
  reducers: {
    clearReviewMaintenanceMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: {
    [getPaginationReviews.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPaginationReviews.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.reviews = payload?.data || [];
      state.count = payload?.count || 0;
      state.error = null;
    },
    [getPaginationReviews.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [createReview.pending]: (state) => {
      state.submitting = true;
      state.error = null;
      state.successMessage = null;
    },
    [createReview.fulfilled]: (state) => {
      state.submitting = false;
      state.successMessage = "Review registrado correctamente";
    },
    [createReview.rejected]: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },

    [deleteReview.pending]: (state) => {
      state.submitting = true;
      state.error = null;
      state.successMessage = null;
    },
    [deleteReview.fulfilled]: (state) => {
      state.submitting = false;
      state.successMessage = "Review eliminado correctamente";
    },
    [deleteReview.rejected]: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const { clearReviewMaintenanceMessages } = reviewMaintenanceSlice.actions;
export const reviewMaintenanceReducer = reviewMaintenanceSlice.reducer;
