export type AuthRole = "user" | "driver";

export interface SignupRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: AuthRole;
}

export interface SignupResponse {
  message?: string;
  data?: {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    role: AuthRole | "admin";
    phoneNumber?: string;
  };
  error?: string;
}

/** Form input that may include UI-only fields beyond the API contract. */
export type RegisterFormInput = SignupRequest & {
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
};

export type DriverProfileStatus =
  | "draft"
  | "pending"
  | "inactive"
  | "available"
  | "on-trip"
  | "suspended"
  | "rejected";

export interface DriverProfileData {
  status?: DriverProfileStatus;
  nationalIdNumber?: string;
  [key: string]: unknown;
}

export interface DriverProfileResponse {
  status: string;
  data: DriverProfileData;
  message?: string;
  error?: string;
}

export interface DriverRegisterResponse {
  status: string;
  message?: string;
  data?: {
    profile?: DriverProfileData;
    vehicle?: unknown;
    routePermit?: unknown;
  };
  error?: string;
}

/** Profile step form values (files kept in memory between steps). */
export interface DriverProfileFormInput {
  nationalId: string;
  nationalIdFrontImage: FileList;
  nationalIdBackImage: FileList;
  licenseFrontImage: FileList;
  licenseBackImage: FileList;
  itineraryLicenseFrontImage?: FileList;
  itineraryLicenseBackImage?: FileList;
}

export interface DriverVehicleFormInput {
  carType: string;
  carColor: string;
  carPlate: string;
  vehicleLicenseFrontImage: FileList;
  vehicleLicenseBackImage: FileList;
  carImage: FileList;
}

export type DriverRegisterFormInput = DriverProfileFormInput & DriverVehicleFormInput;
