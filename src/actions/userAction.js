import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

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

