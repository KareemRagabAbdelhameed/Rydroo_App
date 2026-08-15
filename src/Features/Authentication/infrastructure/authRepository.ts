import api from "../../../config/axiosConfig";
import type { SignupRequest, SignupResponse } from "../domain/types";

export const authRepository = {
  signup: async (payload: SignupRequest): Promise<SignupResponse> => {
    const res = await api.post<SignupResponse>("user/signup", payload);
    return res.data;
  },
};
