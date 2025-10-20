import {configureStore} from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";

export default configureStore({
    reducer:{
        products: productsReducer
    },
    middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({serializableCheck: false})
})