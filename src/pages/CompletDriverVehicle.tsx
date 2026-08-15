import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CloudUpload } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../store/auth/hooks";
import actDriverRegister from "../store/auth/act/actDriverRegister";
import type { RootState } from "../store/store";
import type {
  DriverProfileFormInput,
  DriverVehicleFormInput,
} from "../Features/Authentication/domain/types";
import {
  clearDriverRegistrationDraft,
  getDriverProfileDraft,
  getDriverVehicleDraft,
  profileDraftToFormInput,
  saveDriverVehicleDraft,
  toFileList,
} from "../Features/Authentication/application/driverRegistrationDraft";

const inputClass =
  "w-full bg-transparent border border-maincolor text-black py-3 px-4 rounded-xl outline-none focus:outline-none focus:border-maincolor focus:ring-2 focus:ring-maincolor transition placeholder:text-gray-600";
const uploadClass =
  "relative border border-maincolor rounded-xl flex flex-col items-center justify-center py-6 gap-2 bg-transparent transition cursor-pointer hover:border-maincolor hover:bg-[#fff9f4] focus-within:border-maincolor focus-within:ring-2 focus-within:ring-maincolor";

function resolveFileList(
  current: FileList | undefined,
  saved?: File
): FileList | undefined {
  if (current && current.length > 0) return current;
  return toFileList(saved);
}

const CompletDriverVehicle = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  const profileFromState = location.state?.profileData as DriverProfileFormInput | undefined;
  const profileFromDraft = getDriverProfileDraft();
  const profileData =
    profileFromState ||
    (profileFromDraft ? profileDraftToFormInput(profileFromDraft) : undefined);
  const savedVehicleDraft = getDriverVehicleDraft();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<DriverVehicleFormInput>({
    defaultValues: {
      carType: savedVehicleDraft?.carType || "",
      carColor: savedVehicleDraft?.carColor || "",
      carPlate: savedVehicleDraft?.carPlate || "",
    },
  });

  const vehicleLicenseFrontImage = watch("vehicleLicenseFrontImage");
  const vehicleLicenseBackImage = watch("vehicleLicenseBackImage");
  const carImage = watch("carImage");

  const displayLicenseFront = resolveFileList(
    vehicleLicenseFrontImage,
    savedVehicleDraft?.vehicleLicenseFrontImage
  );
  const displayLicenseBack = resolveFileList(
    vehicleLicenseBackImage,
    savedVehicleDraft?.vehicleLicenseBackImage
  );
  const displayCarImage = resolveFileList(carImage, savedVehicleDraft?.carImage);

  useEffect(() => {
    if (!user) {
      toast.error(t("driverRegister.loginRequired"));
      navigate("/login");
      return;
    }
    if (user.role !== "driver") {
      toast.error(t("driverRegister.driverOnly"));
      navigate("/");
      return;
    }
    if (!profileData) {
      toast.error(t("driverRegister.profileDataMissing"));
      navigate("/complete-driver-profile");
    }
  }, [user, profileData, navigate, t]);

  const handleBack = () => {
    saveDriverVehicleDraft({
      ...getValues(),
      vehicleLicenseFrontImage: resolveFileList(
        getValues("vehicleLicenseFrontImage"),
        savedVehicleDraft?.vehicleLicenseFrontImage
      ) as FileList,
      vehicleLicenseBackImage: resolveFileList(
        getValues("vehicleLicenseBackImage"),
        savedVehicleDraft?.vehicleLicenseBackImage
      ) as FileList,
      carImage: resolveFileList(
        getValues("carImage"),
        savedVehicleDraft?.carImage
      ) as FileList,
    });
    navigate("/complete-driver-profile");
  };

  const onSubmit: SubmitHandler<DriverVehicleFormInput> = async (data) => {
    if (!profileData) {
      toast.error(t("driverRegister.profileDataMissing"));
      navigate("/complete-driver-profile");
      return;
    }

    const merged: DriverVehicleFormInput = {
      carType: data.carType,
      carColor: data.carColor,
      carPlate: data.carPlate,
      vehicleLicenseFrontImage: resolveFileList(
        data.vehicleLicenseFrontImage,
        savedVehicleDraft?.vehicleLicenseFrontImage
      ) as FileList,
      vehicleLicenseBackImage: resolveFileList(
        data.vehicleLicenseBackImage,
        savedVehicleDraft?.vehicleLicenseBackImage
      ) as FileList,
      carImage: resolveFileList(data.carImage, savedVehicleDraft?.carImage) as FileList,
    };

    if (
      !merged.vehicleLicenseFrontImage?.length ||
      !merged.vehicleLicenseBackImage?.length ||
      !merged.carImage?.length
    ) {
      toast.error(t("driverRegister.fieldRequired"));
      return;
    }

    saveDriverVehicleDraft(merged);

    const result = await dispatch(
      actDriverRegister({
        ...profileData,
        ...merged,
      })
    );

    if (actDriverRegister.fulfilled.match(result)) {
      clearDriverRegistrationDraft();
      toast.success(
        result.payload.message || t("driverRegister.submitSuccess"),
        { autoClose: 3000 }
      );
      setTimeout(() => navigate("/"), 3000);
    } else {
      toast.error((result.payload as string) || t("driverRegister.submitError"));
    }
  };

  const renderFileText = (fileList: FileList | undefined, defaultText: string) => {
    if (fileList && fileList.length > 0) {
      return (
        <p className="text-center text-sm font-medium text-maincolor truncate px-4 w-full">
          {fileList[0].name}
        </p>
      );
    }
    return <p className="text-center text-sm font-medium text-gray-800">{defaultText}</p>;
  };

  if (!user || user.role !== "driver" || !profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-forthMainColor py-12 px-6 font-futura text-black overflow-y-auto" dir="rtl">
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-8">
        <h1 className="text-2xl font-bold text-black mb-10">{t("driverRegister.completeTitle")}</h1>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.carType")}
            </label>
            <input type="text" {...register("carType", { required: true })} className={inputClass} />
            {errors.carType && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.carColor")}
            </label>
            <input type="text" {...register("carColor", { required: true })} className={inputClass} />
            {errors.carColor && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.carPlate")}
            </label>
            <input type="text" {...register("carPlate", { required: true })} className={inputClass} />
            {errors.carPlate && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span>{" "}
              {t("driverRegister.vehicleLicenseFront")}
            </label>
            <div
              className={`${uploadClass} ${displayLicenseFront?.length ? "bg-[#fff9f4]" : ""}`}
            >
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("vehicleLicenseFrontImage", {
                  required: !displayLicenseFront?.length,
                })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayLicenseFront, t("driverRegister.uploadFrontHint"))}
            </div>
            {errors.vehicleLicenseFrontImage && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span>{" "}
              {t("driverRegister.vehicleLicenseBack")}
            </label>
            <div
              className={`${uploadClass} ${displayLicenseBack?.length ? "bg-[#fff9f4]" : ""}`}
            >
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("vehicleLicenseBackImage", {
                  required: !displayLicenseBack?.length,
                })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayLicenseBack, t("driverRegister.uploadBackHint"))}
            </div>
            {errors.vehicleLicenseBackImage && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.carImage")}
            </label>
            <div className={`${uploadClass} ${displayCarImage?.length ? "bg-[#fff9f4]" : ""}`}>
              <input
                type="file"
                accept="image/*"
                {...register("carImage", { required: !displayCarImage?.length })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayCarImage, t("driverRegister.carImageHint"))}
            </div>
            {errors.carImage && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex gap-3 justify-center mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="w-full max-w-[220px] border border-maincolor text-maincolor hover:bg-[#fff9f4] font-bold py-3 rounded-full transition flex justify-center items-center text-xl"
            >
              {t("driverRegister.back")}
            </button>
            <button
              type="submit"
              disabled={loading === "pending"}
              className="w-full max-w-[220px] bg-maincolor hover:bg-[#d68432] text-white font-bold py-3 rounded-full transition flex justify-center items-center text-xl"
            >
              {loading === "pending" ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                t("driverRegister.confirmSubmit")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompletDriverVehicle;
