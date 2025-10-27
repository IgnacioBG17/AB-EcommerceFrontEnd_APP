import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveOrder = createAsyncThunk(
    "order/saveOrder",
    async(params, {rejectWithValue}) => {
        try {
            const requestConfig = {
                headers : {
                    "Content-Type": "application/json"
                }
            };

            const {data} = await axios.post(
                `/api/v1/order`,
                params,
                requestConfig
            );

            localStorage.setItem('stripeapi', data.stripeApiKey);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
)

export const confirmPayment = createAsyncThunk(
    "order/payment",
    async(params, {rejectWithValue}) => {
        try {
            const requestConfig = {
                headers : {
                    "Content-Type": "application/json"
                }
            }

            const {data} = await axios.post(
                `/api/v1/payment`,
                params,
                requestConfig
            );

            return data;

        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
)