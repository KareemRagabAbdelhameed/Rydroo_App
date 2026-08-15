import { isAxiosError } from "axios";
import type { RegisterFormInput, SignupRequest, SignupResponse } from "../domain/types";
import { authRepository } from "../infrastructure/authRepository";

export function toSignupRequest(input: RegisterFormInput): SignupRequest {
  return {
    firstName: input.firstName,
    lastName: input.lastName,
    phoneNumber: input.phoneNumber,
    email: input.email,
    password: input.password,
    confirmPassword: input.confirmPassword,
    role: input.role,
  };
}

export async function registerUser(input: RegisterFormInput): Promise<SignupResponse> {
  const payload = toSignupRequest(input);
  return authRepository.signup(payload);
}

export function getRegisterErrorMessage(error: unknown): string {
  if (isAxiosError(error) && error.response?.data) {
    const data = error.response.data as { error?: string; message?: string };
    return data.error || data.message || "Something went wrong";
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Something went wrong";
}
