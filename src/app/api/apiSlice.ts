import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl: "https://frontend-test-assignment-api.abz.agency/api/v1",
  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set("Token", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/token", api, extraOptions);

    if (refreshResult?.data) {
      const data = refreshResult?.data as { succes: boolean; token: string };
      api.dispatch(setCredentials({ accessToken: data.token }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users"],
  reducerPath: "api",
  endpoints: (builder) => ({}),
});
