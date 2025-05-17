import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mainAPI } from "../mainApi";

const baseURL = `${mainAPI}/user`;

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Refreshing_user"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Refreshing_user"],
    }),
    login: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Refreshing_user"],
    }),
    getALlUsers: builder.query({
      query: () => ({
        url: "/get-all-users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useGetALlUsersQuery,
} = userApi;
