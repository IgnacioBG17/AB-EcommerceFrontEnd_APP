import { createSlice } from "@reduxjs/toolkit";
import { getCountries } from "../actions/countryAction";

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

export const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: {
    [getCountries.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCountries.fulfilled]: (state, { payload }) => {
      state.countries = payload;
      state.loading = false;
      state.error = null;
    },
    [getCountries.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const contryReducer = countrySlice.reducer;
