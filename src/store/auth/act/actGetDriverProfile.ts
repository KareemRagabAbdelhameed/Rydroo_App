import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { driverRepository } from "../../../Features/Authentication/infrastructure/driverRepository";
import type { DriverProfileResponse } from "../../../Features/Authentication/domain/types";

const actGetDriverProfile = createAsyncThunk<DriverProfileResponse, void>(
  "auth/actGetDriverProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await driverRepository.getDriverProfile();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue({
          status: error.response.status,
          message:
            (error.response.data as { error?: string; message?: string })
              ?.error ||
            (error.response.data as { message?: string })?.message ||
            "Driver profile not found",
        });
      }
      return rejectWithValue({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
);

export default actGetDriverProfile;
