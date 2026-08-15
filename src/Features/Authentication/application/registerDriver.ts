import { isAxiosError } from "axios";
import type { DriverRegisterFormInput, DriverRegisterResponse } from "../domain/types";
import { driverRepository } from "../infrastructure/driverRepository";

function appendFile(formData: FormData, fieldName: string, fileList?: FileList) {
  if (fileList && fileList.length > 0) {
    formData.append(fieldName, fileList[0]);
  }
}

export function toDriverRegisterFormData(input: DriverRegisterFormInput): FormData {
  const formData = new FormData();

  formData.append("nationalIdNumber", input.nationalId);
  formData.append("make", input.carType);
  formData.append("color", input.carColor);
  formData.append("plateNumber", input.carPlate);
  formData.append("isDraft", "false");

  appendFile(formData, "nationalIdFrontImage", input.nationalIdFrontImage);
  appendFile(formData, "nationalIdBackImage", input.nationalIdBackImage);
  appendFile(formData, "licenseFrontImage", input.licenseFrontImage);
  appendFile(formData, "licenseBackImage", input.licenseBackImage);
  appendFile(formData, "itineraryLicenseFrontImage", input.itineraryLicenseFrontImage);
  appendFile(formData, "itineraryLicenseBackImage", input.itineraryLicenseBackImage);
  appendFile(formData, "vehicleLicenseFrontImage", input.vehicleLicenseFrontImage);
  appendFile(formData, "vehicleLicenseBackImage", input.vehicleLicenseBackImage);
  appendFile(formData, "vehiclePhoto", input.carImage);

  return formData;
}

export async function registerDriver(
  input: DriverRegisterFormInput
): Promise<DriverRegisterResponse> {
  const formData = toDriverRegisterFormData(input);
  return driverRepository.registerDriverProfile(formData);
}

export function getDriverRegisterErrorMessage(error: unknown): string {
  if (isAxiosError(error) && error.response?.data) {
    const data = error.response.data as { error?: string; message?: string };
    return data.error || data.message || "Something went wrong";
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Something went wrong";
}
