import { apiSlice } from "../../app/api/apiSlice";
import { getPositionsResponse, UsersResponse } from "../../models/models";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, number>({
      query: (page) => ({
        url: "/users",
        params: {
          count: 6,
          page,
        },
      }),
      providesTags: ["Users"],
    }),
    getPositions: builder.query<getPositionsResponse, void>({
      query: () => ({
        url: "positions",
      }),
    }),
    signUp: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/users",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetPositionsQuery, useSignUpMutation } = usersApiSlice;
