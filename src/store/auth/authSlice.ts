import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../interfaces";
import actAuthRegister from "./act/actAuthRegister";
import actAuthVerifyOtp from "./act/actAuthVerifyOtp";
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
}
const initialState : IAuthState = {
    user : null,
    successMessage : null,
    accessToken : null,
    loading : "idle",
    error : null,
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
            state.accessToken = action.payload.accessToken || null;
            state.successMessage = action.payload.message;
          });
          
          builder.addCase(actAuthVerifyOtp.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
          });
    }
});
export default authSlice.reducer