import type {
  DriverProfileFormInput,
  DriverVehicleFormInput,
} from "../domain/types";

export type DriverProfileDraft = {
  nationalId: string;
  nationalIdFrontImage?: File;
  nationalIdBackImage?: File;
  licenseFrontImage?: File;
  licenseBackImage?: File;
  itineraryLicenseFrontImage?: File;
  itineraryLicenseBackImage?: File;
};

export type DriverVehicleDraft = {
  carType: string;
  carColor: string;
  carPlate: string;
  vehicleLicenseFrontImage?: File;
  vehicleLicenseBackImage?: File;
  carImage?: File;
};

type DriverDraftState = {
  profile: DriverProfileDraft | null;
  vehicle: DriverVehicleDraft | null;
};

const draft: DriverDraftState = {
  profile: null,
  vehicle: null,
};

function firstFile(fileList?: FileList): File | undefined {
  return fileList && fileList.length > 0 ? fileList[0] : undefined;
}

export function toFileList(file?: File): FileList | undefined {
  if (!file) return undefined;
  const transfer = new DataTransfer();
  transfer.items.add(file);
  return transfer.files;
}

export function saveDriverProfileDraft(data: DriverProfileFormInput) {
  draft.profile = {
    nationalId: data.nationalId,
    nationalIdFrontImage: firstFile(data.nationalIdFrontImage),
    nationalIdBackImage: firstFile(data.nationalIdBackImage),
    licenseFrontImage: firstFile(data.licenseFrontImage),
    licenseBackImage: firstFile(data.licenseBackImage),
    itineraryLicenseFrontImage: firstFile(data.itineraryLicenseFrontImage),
    itineraryLicenseBackImage: firstFile(data.itineraryLicenseBackImage),
  };
}

export function saveDriverVehicleDraft(data: DriverVehicleFormInput) {
  draft.vehicle = {
    carType: data.carType,
    carColor: data.carColor,
    carPlate: data.carPlate,
    vehicleLicenseFrontImage: firstFile(data.vehicleLicenseFrontImage),
    vehicleLicenseBackImage: firstFile(data.vehicleLicenseBackImage),
    carImage: firstFile(data.carImage),
  };
}

export function getDriverProfileDraft(): DriverProfileDraft | null {
  return draft.profile;
}

export function getDriverVehicleDraft(): DriverVehicleDraft | null {
  return draft.vehicle;
}

export function getDriverProfileFormDefaults(): Partial<DriverProfileFormInput> | undefined {
  if (!draft.profile) return undefined;
  return {
    nationalId: draft.profile.nationalId,
    nationalIdFrontImage: toFileList(draft.profile.nationalIdFrontImage),
    nationalIdBackImage: toFileList(draft.profile.nationalIdBackImage),
    licenseFrontImage: toFileList(draft.profile.licenseFrontImage),
    licenseBackImage: toFileList(draft.profile.licenseBackImage),
    itineraryLicenseFrontImage: toFileList(draft.profile.itineraryLicenseFrontImage),
    itineraryLicenseBackImage: toFileList(draft.profile.itineraryLicenseBackImage),
  };
}

export function getDriverVehicleFormDefaults(): Partial<DriverVehicleFormInput> | undefined {
  if (!draft.vehicle) return undefined;
  return {
    carType: draft.vehicle.carType,
    carColor: draft.vehicle.carColor,
    carPlate: draft.vehicle.carPlate,
    vehicleLicenseFrontImage: toFileList(draft.vehicle.vehicleLicenseFrontImage),
    vehicleLicenseBackImage: toFileList(draft.vehicle.vehicleLicenseBackImage),
    carImage: toFileList(draft.vehicle.carImage),
  };
}

export function profileDraftToFormInput(
  profile: DriverProfileDraft
): DriverProfileFormInput {
  return {
    nationalId: profile.nationalId,
    nationalIdFrontImage: toFileList(profile.nationalIdFrontImage) as FileList,
    nationalIdBackImage: toFileList(profile.nationalIdBackImage) as FileList,
    licenseFrontImage: toFileList(profile.licenseFrontImage) as FileList,
    licenseBackImage: toFileList(profile.licenseBackImage) as FileList,
    itineraryLicenseFrontImage: toFileList(profile.itineraryLicenseFrontImage),
    itineraryLicenseBackImage: toFileList(profile.itineraryLicenseBackImage),
  };
}

export function clearDriverRegistrationDraft() {
  draft.profile = null;
  draft.vehicle = null;
}
