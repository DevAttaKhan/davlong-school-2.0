import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/types/auth.interface";

// Define a type for the slice state
interface AuthState {
  token?: string;
  refreshToken?: string;
  user?: User;
  isValidToken: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: "",
  refreshToken: "",
  user: undefined,
  isValidToken: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },

    setUser: (
      state,
      action: PayloadAction<{
        user?: User;
      }>
    ) => {
      state.user = action.payload.user;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user?: User;
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    setIsValidToken: (state, action: PayloadAction<boolean>) => {
      state.isValidToken = action.payload;
    },

    flushAuthState: (state) => {
      state.token = "";
      state.refreshToken = "";
      state.user = undefined;
      state.isValidToken = false;
    },
  },
});

export const {
  setToken,
  setCredentials,
  setIsValidToken,
  flushAuthState,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
