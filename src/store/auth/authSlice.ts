import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../interfaces";
import actAuthRegister from "./act/actAuthRegister";
import actAuthVerifyOtp from "./act/actAuthVerifyOtp";
import actAuthLogin from "./act/actAuthLogin";
import Cookies from "js-cookie";
import actAuthLogout from "./act/actAuthLogout";
import actDriverRegister from "./act/actDriverRegister";

interface IAuthState {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "driver" | "admin";
  } | null;
  successMessage: string | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
  isVerified: boolean;
}

const initialState: IAuthState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
  successMessage: null,
  accessToken: Cookies.get("accessToken") || null,
  loading: "idle",
  error: null,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.data) {
        state.user = {
          id: action.payload.data.id ?? 0,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          role: action.payload.data.role,
        };
      }
      state.successMessage = action.payload.message ?? null;
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
      state.successMessage = null;
    });

    // verify OTP — keep user so email remains available until login
    builder.addCase(actAuthVerifyOtp.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthVerifyOtp.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.isVerified = true;
      state.successMessage = action.payload.message;
    });
    builder.addCase(actAuthVerifyOtp.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.data.user;
      state.successMessage = action.payload.message;
      Cookies.set("user", JSON.stringify(action.payload.data.user), { expires: 7 });
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });

    // Logout
    builder.addCase(actAuthLogout.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogout.fulfilled, (state) => {
      state.loading = "succeeded";
      state.user = null;
      state.accessToken = null;
      state.error = null;
      Cookies.remove("user");
      Cookies.remove("accessToken");
    });
    builder.addCase(actAuthLogout.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    // Driver register
    builder.addCase(actDriverRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actDriverRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.successMessage = action.payload.message ?? null;
    });
    builder.addCase(actDriverRegister.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
