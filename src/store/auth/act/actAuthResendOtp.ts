import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import api from "../../../config/axiosConfig";

interface IResendOtpData {
  email: string;
}

interface IResendOtpResponse {
  message: string;
}

const actAuthResendOtp = createAsyncThunk<IResendOtpResponse, IResendOtpData>(
  "auth/actAuthResendOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("user/resend-otp", formData);
      return res.data as IResendOtpResponse;
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        const data = error.response.data as { message?: string; error?: string };
        return rejectWithValue(data.message || data.error || "Failed to resend OTP");
      }
      return rejectWithValue("Failed to resend OTP");
    }
  }
);

export default actAuthResendOtp;
