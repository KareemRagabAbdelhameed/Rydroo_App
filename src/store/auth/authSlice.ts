import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../interfaces";
import actAuthRegister from "./act/actAuthRegister";
import actAuthVerifyOtp from "./act/actAuthVerifyOtp";
import actAuthLogin from "./act/actAuthLogin";
import Cookies from "js-cookie";
import actAuthLogout from "./act/actAuthLogout";
interface IAuthState {
    user : {
        id : number,
        firstName : string,
        lastName : string,
        email : string
    } | null,
    successMessage : string | null,
    accessToken : string | null,

    loading : TLoading,
    error : string | null,
    isVerified : boolean,
}
const initialState : IAuthState = {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
    successMessage : null,
    accessToken: Cookies.get("accessToken") || null,
    loading : "idle",
    error : null,
    isVerified : false
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        // register
        builder.addCase(actAuthRegister.pending,(state)=>{
            state.loading = "pending";
            state.error = null;
            state.successMessage = null;
        });
        builder.addCase(actAuthRegister.fulfilled,(state,action)=>{
            state.loading = "succeeded";
            state.user = action.payload.data;
            console.log(state.user);
            state.successMessage = action.payload.message;
        });
        builder.addCase(actAuthRegister.rejected,(state,action)=>{
            state.error = action.payload as string;
            state.loading = "failed";
            state.successMessage = null;
        });
        // verify OTP
        builder.addCase(actAuthVerifyOtp.pending, (state) => {
            state.loading = "pending";
            state.error = null;
          });
          
          builder.addCase(actAuthVerifyOtp.fulfilled, (state, action) => {
            state.loading = "succeeded";
           state.isVerified = true,
           state.user = null,
            state.successMessage = action.payload.message;
          });
          
          builder.addCase(actAuthVerifyOtp.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
          });

        // Login
        builder.addCase(actAuthLogin.pending,(state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAuthLogin.fulfilled,(state,action)=>{
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.data.user;
            console.log(state.user);
            state.successMessage = action.payload.message;
            console.log(state.successMessage)

            Cookies.set("user", JSON.stringify(action.payload.data.user), { expires: 7 });

        });
        builder.addCase(actAuthLogin.rejected,(state,action)=>{
            state.error = action.payload as string;
            state.loading = "failed";
        });

        // Logout reducers
    builder.addCase(actAuthLogout.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      });
      builder.addCase(actAuthLogout.fulfilled, (state) => {
        state.loading = "succeeded";
        state.user = null;
        state.accessToken = null;
        state.error = null;
        // Clean up the cookies on the client side
        Cookies.remove("user");
        Cookies.remove("accessToken");
      });
      builder.addCase(actAuthLogout.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
    }
});
export default authSlice.reducer