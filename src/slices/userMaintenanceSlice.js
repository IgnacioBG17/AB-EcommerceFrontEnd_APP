import { createSlice } from "@reduxjs/toolkit";
import {
  getPaginationUsersAdmin,
  getRolesList,
  updateAdminStatusUser,
  updateAdminUser,
} from "../actions/userAction";

const initialState = {
  loading: false,
  submitting: false,
  users: [],
  count: 0,
  roles: [],
  error: null,
  successMessage: null,
};

export const userMaintenanceSlice = createSlice({
  name: "userMaintenance",
  initialState,
  reducers: {
    clearUserMaintenanceMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: {
    [getPaginationUsersAdmin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPaginationUsersAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload?.data || [];
      state.count = payload?.count || 0;
      state.error = null;
    },
    [getPaginationUsersAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getRolesList.pending]: (state) => {
      state.error = null;
    },
    [getRolesList.fulfilled]: (state, { payload }) => {
      state.roles = payload || [];
      state.error = null;
    },
    [getRolesList.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [updateAdminUser.pending]: (state) => {
      state.submitting = true;
      state.error = null;
      state.successMessage = null;
    },
    [updateAdminUser.fulfilled]: (state) => {
      state.submitting = false;
      state.successMessage = "Usuario actualizado correctamente";
    },
    [updateAdminUser.rejected]: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },

    [updateAdminStatusUser.pending]: (state) => {
      state.submitting = true;
      state.error = null;
      state.successMessage = null;
    },
    [updateAdminStatusUser.fulfilled]: (state) => {
      state.submitting = false;
      state.successMessage = "Estado del usuario actualizado";
    },
    [updateAdminStatusUser.rejected]: (state, action) => {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const { clearUserMaintenanceMessages } = userMaintenanceSlice.actions;
export const userMaintenanceReducer = userMaintenanceSlice.reducer;
