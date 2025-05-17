import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./authSlice";
import { userApi } from "../api/userApi"

export const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
})
