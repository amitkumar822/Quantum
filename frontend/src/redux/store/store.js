import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { userApi } from "../api/userApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      userApi.middleware,
    ),
});
