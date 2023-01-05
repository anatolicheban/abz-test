import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../models/models";

export const usersSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    addUsers: (state, action: PayloadAction<User[]>) => {
      return state.concat(action.payload);
    },
    clearUsers: (state, action: PayloadAction<void>) => {
      return [];
    },
  },
});

export const { addUsers, clearUsers } = usersSlice.actions;

export const getAllUsers = (state: RootState) => state.users;
