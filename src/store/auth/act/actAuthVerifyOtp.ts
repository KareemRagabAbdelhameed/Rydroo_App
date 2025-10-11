import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axiosConfig";

interface IVerifyOtpData {
  email: string;
  otp: string;
}

interface IVerifyOtpResponse {
  message: string;
  accessToken?: string;
}

const actAuthVerifyOtp = createAsyncThunk<IVerifyOtpResponse, IVerifyOtpData>(
  "auth/actAuthVerifyOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("user/verify-otp", formData);
      return res.data as IVerifyOtpResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

export default actAuthVerifyOtp;
