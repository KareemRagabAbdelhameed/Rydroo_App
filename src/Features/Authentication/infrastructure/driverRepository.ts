import api from "../../../config/axiosConfig";
import type {
  DriverProfileResponse,
  DriverRegisterResponse,
} from "../domain/types";

export const driverRepository = {
  getDriverProfile: async (): Promise<DriverProfileResponse> => {
    const res = await api.get<DriverProfileResponse>("driver/getDriverProfile");
    return res.data;
  },

  registerDriverProfile: async (
    formData: FormData
  ): Promise<DriverRegisterResponse> => {
    const res = await api.post<DriverRegisterResponse>(
      "driver/register",
      formData
    );
    return res.data;
  },
};
