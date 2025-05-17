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
    logoutUser: builder.mutation({
      query: (formData) => ({
        url: "/logout",
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
      providesTags: ["Refreshing_user"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/delete-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refreshing_user"],
    }),
    updateUser: builder.mutation({
      query: ({ formData, userId }) => ({
        url: `/update-user/${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refreshing_user"],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLogoutUserMutation,
  useGetALlUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
