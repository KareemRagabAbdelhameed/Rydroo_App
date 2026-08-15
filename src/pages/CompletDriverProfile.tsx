import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CloudUpload } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/auth/hooks";
import type { RootState } from "../store/store";
import type { DriverProfileFormInput } from "../Features/Authentication/domain/types";
import {
  getDriverProfileDraft,
  saveDriverProfileDraft,
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

const CompletDriverProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const savedDraft = getDriverProfileDraft();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DriverProfileFormInput>({
    defaultValues: {
      nationalId: savedDraft?.nationalId || "",
    },
  });

  const nationalIdFrontImage = watch("nationalIdFrontImage");
  const nationalIdBackImage = watch("nationalIdBackImage");
  const licenseFrontImage = watch("licenseFrontImage");
  const licenseBackImage = watch("licenseBackImage");
  const itineraryLicenseFrontImage = watch("itineraryLicenseFrontImage");
  const itineraryLicenseBackImage = watch("itineraryLicenseBackImage");

  const displayNationalIdFront = resolveFileList(
    nationalIdFrontImage,
    savedDraft?.nationalIdFrontImage
  );
  const displayNationalIdBack = resolveFileList(
    nationalIdBackImage,
    savedDraft?.nationalIdBackImage
  );
  const displayLicenseFront = resolveFileList(
    licenseFrontImage,
    savedDraft?.licenseFrontImage
  );
  const displayLicenseBack = resolveFileList(
    licenseBackImage,
    savedDraft?.licenseBackImage
  );
  const displayRouteFront = resolveFileList(
    itineraryLicenseFrontImage,
    savedDraft?.itineraryLicenseFrontImage
  );
  const displayRouteBack = resolveFileList(
    itineraryLicenseBackImage,
    savedDraft?.itineraryLicenseBackImage
  );

  useEffect(() => {
    if (!user) {
      toast.error(t("driverRegister.loginRequired"));
      navigate("/login");
    } else if (user.role !== "driver") {
      toast.error(t("driverRegister.driverOnly"));
      navigate("/");
    }
  }, [user, navigate, t]);

  const onSubmit: SubmitHandler<DriverProfileFormInput> = (data) => {
    const merged: DriverProfileFormInput = {
      nationalId: data.nationalId,
      nationalIdFrontImage: resolveFileList(
        data.nationalIdFrontImage,
        savedDraft?.nationalIdFrontImage
      ) as FileList,
      nationalIdBackImage: resolveFileList(
        data.nationalIdBackImage,
        savedDraft?.nationalIdBackImage
      ) as FileList,
      licenseFrontImage: resolveFileList(
        data.licenseFrontImage,
        savedDraft?.licenseFrontImage
      ) as FileList,
      licenseBackImage: resolveFileList(
        data.licenseBackImage,
        savedDraft?.licenseBackImage
      ) as FileList,
      itineraryLicenseFrontImage: resolveFileList(
        data.itineraryLicenseFrontImage,
        savedDraft?.itineraryLicenseFrontImage
      ),
      itineraryLicenseBackImage: resolveFileList(
        data.itineraryLicenseBackImage,
        savedDraft?.itineraryLicenseBackImage
      ),
    };

    if (
      !merged.nationalIdFrontImage?.length ||
      !merged.nationalIdBackImage?.length ||
      !merged.licenseFrontImage?.length ||
      !merged.licenseBackImage?.length
    ) {
      toast.error(t("driverRegister.fieldRequired"));
      return;
    }

    saveDriverProfileDraft(merged);
    navigate("/complete-driver-vehicle", {
      state: { profileData: merged },
    });
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

  if (!user || user.role !== "driver") {
    return null;
  }

  return (
    <div className="min-h-screen bg-forthMainColor py-12 px-6 font-futura text-black overflow-y-auto" dir="rtl">
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-8">
        <h1 className="text-2xl font-bold text-black mb-10">{t("driverRegister.completeTitle")}</h1>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2">{t("driverRegister.nationalId")}</label>
            <input type="text" {...register("nationalId", { required: true })} className={inputClass} />
            {errors.nationalId && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.nationalIdFront")}
            </label>
            <div className={`${uploadClass} ${displayNationalIdFront?.length ? "bg-[#fff9f4]" : ""}`}>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("nationalIdFrontImage", { required: !displayNationalIdFront?.length })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayNationalIdFront, t("driverRegister.uploadFrontHint"))}
            </div>
            {errors.nationalIdFrontImage && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.nationalIdBack")}
            </label>
            <div className={`${uploadClass} ${displayNationalIdBack?.length ? "bg-[#fff9f4]" : ""}`}>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("nationalIdBackImage", { required: !displayNationalIdBack?.length })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayNationalIdBack, t("driverRegister.uploadBackHint"))}
            </div>
            {errors.nationalIdBackImage && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.licenseFront")}
            </label>
            <div className={`${uploadClass} ${displayLicenseFront?.length ? "bg-[#fff9f4]" : ""}`}>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("licenseFrontImage", { required: !displayLicenseFront?.length })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayLicenseFront, t("driverRegister.uploadFrontHint"))}
            </div>
            {errors.licenseFrontImage && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              <span className="text-maincolor text-xl mt-1">*</span> {t("driverRegister.licenseBack")}
            </label>
            <div className={`${uploadClass} ${displayLicenseBack?.length ? "bg-[#fff9f4]" : ""}`}>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("licenseBackImage", { required: !displayLicenseBack?.length })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayLicenseBack, t("driverRegister.uploadBackHint"))}
            </div>
            {errors.licenseBackImage && (
              <p className="text-red-500 text-sm px-2">{t("driverRegister.fieldRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              {t("driverRegister.routeLicenseFront")}
            </label>
            <div className={`${uploadClass} ${displayRouteFront?.length ? "bg-[#fff9f4]" : ""}`}>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("itineraryLicenseFrontImage")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayRouteFront, t("driverRegister.uploadFrontOptionalHint"))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2 flex items-center gap-1">
              {t("driverRegister.routeLicenseBack")}
            </label>
            <div className={`${uploadClass} ${displayRouteBack?.length ? "bg-[#fff9f4]" : ""}`}>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("itineraryLicenseBackImage")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <CloudUpload className="text-maincolor w-10 h-10" strokeWidth={1.5} />
              {renderFileText(displayRouteBack, t("driverRegister.uploadBackOptionalHint"))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full max-w-[220px] mx-auto bg-maincolor hover:bg-[#d68432] text-white font-bold py-3 rounded-full mt-6 transition flex justify-center items-center text-xl"
          >
            {t("driverRegister.next")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompletDriverProfile;
