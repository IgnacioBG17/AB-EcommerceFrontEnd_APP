import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

export const getCategories = createAsyncThunk(
    "category/getCategories",
    async(thunkApi, { rejectedWithValue }) => {
        try {
            return await axios.get(`/api/v1/category/list`);
        } catch (err) {
            return rejectedWithValue(`Errores: ${err.message}`);
        }
    }
)