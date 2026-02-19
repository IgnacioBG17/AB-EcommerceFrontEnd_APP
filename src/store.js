import {configureStore} from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/categorySlice";
import { securityReducer } from "./slices/securitySlice";
import { forgotPasswordReducer } from "./slices/forgotPasswordSlice";
import { resetPasswordReducer } from "./slices/resetPasswordSlice";
import { cartReducer } from "./slices/cartSlice";
import { contryReducer } from "./slices/countrySlice";
import { orderReducer } from "./slices/orderSlice";
import { productMaintenanceReducer } from "./slices/productMaintenanceSlice";
import { reviewMaintenanceReducer } from "./slices/reviewMaintenanceSlice";
import { userMaintenanceReducer } from "./slices/userMaintenanceSlice";

export default configureStore({
    reducer:{
        product: productMaintenanceReducer,
        category: categoryReducer,
        security: securityReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        cart: cartReducer,
        country: contryReducer,
        order: orderReducer,
        reviewMaintenance: reviewMaintenanceReducer,
        userMaintenance: userMaintenanceReducer
    },
    middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({serializableCheck: false})
})