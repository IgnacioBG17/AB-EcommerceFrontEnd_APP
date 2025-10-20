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