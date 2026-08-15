import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRegisterErrorMessage,
  registerUser,
} from "../../../Features/Authentication/application/registerUser";
import type { RegisterFormInput, SignupResponse } from "../../../Features/Authentication/domain/types";

const actAuthRegister = createAsyncThunk<SignupResponse, RegisterFormInput>(
  "auth/actAuthRegister",
  async (formData, { rejectWithValue }) => {
    try {
      return await registerUser(formData);
    } catch (error) {
      return rejectWithValue(getRegisterErrorMessage(error));
    }
  }
);

export default actAuthRegister;
