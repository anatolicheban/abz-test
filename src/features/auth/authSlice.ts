import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;
