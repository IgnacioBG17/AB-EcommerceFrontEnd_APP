import { createSlice } from "@reduxjs/toolkit";
import {
  getProductById,
  getProductPagination,
  getProductPaginationAdmin,
  getProducts,
  registerProduct,
  updateProduct,
  updateStatusProduct,
} from "../actions/productsAction";

const initialState = {
  loading: false,
  submitting: false,
  error: null,
  successMessage: null,

  // Public products list/pagination
  products: [],
  count: 0,
  pageIndex: 1,
  pageSize: 2,
  pageCount: 0,
  resultByPage: 0,
  search: null,
  precioMax: null,
  precioMin: null,
  category: null,
  rating: null,

  // Product detail
  product: null,

  // Admin maintenance list
  adminProducts: [],
  adminCount: 0,
};

export const productMaintenanceSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // SEARCH
    searchPagination: (state, action) => {
      state.search = action.payload.search;
      state.pageIndex = 1;
    },
    // SET PAGE
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload.pageIndex;
    },
    // UPDATE PRICE FILTER
    updatePrecio: (state, action) => {
      state.precioMax = action.payload.precio[1];
      state.precioMin = action.payload.precio[0];
      state.pageIndex = 1;
    },
    // RESET FILTERS
    resetPagination: (state) => {
      state.precioMax = null;
      state.precioMin = null;
      state.pageIndex = 1;
      state.search = null;
      state.category = null;
      state.rating = null;
    },
    // UPDATE CATEGORY FILTER
    updateCategory: (state, action) => {
      state.category = action.payload.category;
      state.pageIndex = 1;
    },
    // UPDATE RATING FILTER
    updateRating: (state, action) => {
      state.rating = action.payload.rating;
      state.pageIndex = 1;
    },
    // RESET PRODUCT DETAIL
    resetGetById: (state) => {
      state.product = null;
      state.error = null;
      state.loading = false;
    },
    // CLEAR FEEDBACK MESSAGES
    clearProductMaintenanceMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: {
    // GET PRODUCTS LIST
    [getProducts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload?.data || [];
      state.error = null;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // GET PRODUCT BY ID
    [getProductById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload?.data || payload;
      state.error = null;
    },
    [getProductById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // GET PUBLIC PRODUCT PAGINATION
    [getProductPagination.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductPagination.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload?.data || [];
      state.count = payload?.count || 0;
      state.pageIndex = payload?.pageIndex || state.pageIndex;
      state.pageSize = payload?.pageSize || state.pageSize;
      state.pageCount = payload?.pageCount || 0;
      state.resultByPage = payload?.resultByPage || 0;
      state.error = null;
    },
    [getProductPagination.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // GET ADMIN PRODUCT PAGINATION
    [getProductPaginationAdmin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductPaginationAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.adminProducts = payload?.data || [];
      state.adminCount = payload?.count || 0;
      state.error = null;
    },
    [getProductPaginationAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // CREATE PRODUCT
    [registerProduct.pending]: (state) => {
      state.submitting = true;
      state.error = null;
      state.successMessage = null;
    },
    [registerProduct.fulfilled]: (state) => {
      state.submitting = false;
      state.successMessage = "Producto registrado correctamente";
    },
    [registerProduct.rejected]: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },

    // UPDATE PRODUCT
    [updateProduct.pending]: (state) => {
      state.submitting = true;
      state.error = null;
      state.successMessage = null;
    },
    [updateProduct.fulfilled]: (state) => {
      state.submitting = false;
      state.successMessage = "Producto actualizado correctamente";
    },
    [updateProduct.rejected]: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },

    // UPDATE PRODUCT STATUS
    [updateStatusProduct.pending]: (state) => {
      state.submitting = true;
      state.error = null;
      state.successMessage = null;
    },
    [updateStatusProduct.fulfilled]: (state) => {
      state.submitting = false;
      state.successMessage = "Estado del producto actualizado";
    },
    [updateStatusProduct.rejected]: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const {
  searchPagination,
  setPageIndex,
  updatePrecio,
  resetPagination,
  updateCategory,
  updateRating,
  resetGetById,
  clearProductMaintenanceMessages,
} = productMaintenanceSlice.actions;

export const productMaintenanceReducer = productMaintenanceSlice.reducer;
