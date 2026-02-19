import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { httpParams } from "../utilities/httpParams";

export const login = createAsyncThunk(
  "user/login",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        heraders: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/usuario/login`,
        params,
        requestConfig
      );

      localStorage.setItem("token", data.token);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params, { rejectWithValue }) => {
    
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `/api/v1/usuario/register`,
        params,
        requestConfig
      );
   
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const update = createAsyncThunk(
  "user/update",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        `/api/v1/usuario/update`,
        params,
        requestConfig
      );

      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

/** Cargar la información del usuario autenticado(es decir que ya esta en sesion) desde el servidor
y guardarla tanto en el store de Redux como en el localStorage. */
export const loadUser = createAsyncThunk(
  "user/getUser",
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/usuario`);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

//actualizar password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        heraders: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/usuario/updatepassword`,
        params,
        requestConfig
      );
      
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

//recuperar password olvidado por correo
export const forgotSendPassword = createAsyncThunk(
  "user/updatePassword",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        heraders: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/usuario/forgotpassword`,
        params,
        requestConfig
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, password, confirmPassword, token }, { rejectWithValue }) => {
    try {
      const requestConfig = {
        heraders: {
          "Content-Type": "application/json",
        },
      };

      const request = {
        email,
        password,
        confirmPassword,
        token,
      };

      const { data } = await axios.post(
        `/api/v1/usuario/resetPassword`,
        request,
        requestConfig
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getPaginationUsersAdmin = createAsyncThunk(
  "user/getPaginationUsersAdmin",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = httpParams(params || {});
      const paramUrl = new URLSearchParams(queryParams).toString();
      const endpoint = paramUrl
        ? `/api/v1/usuario/paginationAdmin?${paramUrl}`
        : "/api/v1/usuario/paginationAdmin";

      const { data } = await axios.get(endpoint);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al listar usuarios");
    }
  }
);

export const getUserByIdAdmin = createAsyncThunk(
  "user/getUserByIdAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/usuario/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al obtener usuario por Id");
    }
  }
);

export const getUserByUsernameAdmin = createAsyncThunk(
  "user/getUserByUsernameAdmin",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/usuario/username/${username}`);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al obtener usuario por username");
    }
  }
);

export const getRolesList = createAsyncThunk(
  "user/getRolesList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/usuario/roles`);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al listar roles");
    }
  }
);

export const updateAdminUser = createAsyncThunk(
  "user/updateAdminUser",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/usuario/updateAdminUser`, params);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al actualizar usuario");
    }
  }
);

export const updateAdminStatusUser = createAsyncThunk(
  "user/updateAdminStatusUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/usuario/updateAdminStatusUser`, { id });
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error al actualizar estado del usuario");
    }
  }
);
