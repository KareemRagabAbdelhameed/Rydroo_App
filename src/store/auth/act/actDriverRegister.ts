import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDriverRegisterErrorMessage,
  registerDriver,
} from "../../../Features/Authentication/application/registerDriver";
import type {
  DriverRegisterFormInput,
  DriverRegisterResponse,
} from "../../../Features/Authentication/domain/types";

const actDriverRegister = createAsyncThunk<
  DriverRegisterResponse,
  DriverRegisterFormInput
>("auth/actDriverRegister", async (formData, { rejectWithValue }) => {
  try {
    return await registerDriver(formData);
  } catch (error) {
    return rejectWithValue(getDriverRegisterErrorMessage(error));
  }
});

export default actDriverRegister;
