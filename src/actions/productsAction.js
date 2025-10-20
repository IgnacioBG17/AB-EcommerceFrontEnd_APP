import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async(ThunkApi, {rejectWithValue}) => {
        try{
            return await axios.get(`/api/v1/product/list`);
        }catch(err){
            return rejectWithValue(`Errores: ${err.message}`);
        }
    }
)

export const getProductById = createAsyncThunk(
    "products/getProductId",
    async(id, {rejectWithValue}) => {
        try {
            return await axios.get(`/api/v1/product/${id}`);
        } catch (err) {
            return rejectWithValue(`Errores: ${err.message}`);
        }
    }
)