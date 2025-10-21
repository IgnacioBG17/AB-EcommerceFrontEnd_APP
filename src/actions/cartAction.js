import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

// metodo para guardar una direccion de un usuario
export const saveAddressInfo = createAsyncThunk(
  "shoppingCart/saveAddressInfo",
  async (params, { rejectedWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `api/v1/order/address`,
        params,
        requestConfig
      );

      return data;
    } catch (err) {
      return rejectedWithValue(err.response.data.message);
    }
  }
);
