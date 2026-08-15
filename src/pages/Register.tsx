import { useState } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import type { RegisterFormValues } from "../interfaces";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/auth/hooks";
import actAuthRegister from "../store/auth/act/actAuthRegister";
import type { RootState } from "../store/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/logo.png";
import { savePendingAuthPreferences } from "../Features/Authentication/application/pendingAuthPreferences";

const fieldClass =
  "w-full bg-transparent border border-maincolor text-black py-3 px-4 rounded-2xl outline-none focus:outline-none focus:border-maincolor focus:ring-2 focus:ring-maincolor placeholder:text-gray-600";
const passwordFieldClass =
  "w-full bg-transparent border border-maincolor text-black py-3 pl-12 pr-4 rounded-2xl outline-none focus:outline-none focus:border-maincolor focus:ring-2 focus:ring-maincolor text-left text-lg";

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema) as Resolver<RegisterFormValues>,
    mode: "onBlur",
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const result = await dispatch(
      actAuthRegister({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
      })
    );
    if (actAuthRegister.fulfilled.match(result)) {
      savePendingAuthPreferences(data.role, data.email);
      toast.success(
        result.payload.message || "Registration successful! Please verify your email.",
        { autoClose: 3000 }
      );
      setTimeout(() => navigate("/verify"), 3000);
    } else {
      toast.error(
        (result.payload as string) || "Something went wrong during registration."
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdf4ec] py-12 px-6 font-futura text-black overflow-y-auto" dir="rtl">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <Link to="/" className="mb-4 block cursor-pointer">
          <div
            className="h-20 w-40 bg-maincolor"
            style={{
              WebkitMask: `url(${logo}) center/contain no-repeat`,
              mask: `url(${logo}) center/contain no-repeat`,
            }}
            title="Rydroo Logo"
          ></div>
        </Link>

        <h1 className="text-2xl font-bold text-black mb-1">{t("انشئ حسابك")}</h1>
        <p className="text-gray-600 mb-8">{t("احجز رحلتك في أقل من دقيقة")}</p>

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex bg-transparent border border-maincolor rounded-full p-1">
              <label className="flex-1 text-center cursor-pointer">
                <input type="radio" value="user" {...register("role")} className="peer sr-only" />
                <div className="py-2 rounded-full peer-checked:bg-maincolor peer-checked:text-white text-maincolor transition font-medium text-lg">
                  {t("مسافر")}
                </div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input type="radio" value="driver" {...register("role")} className="peer sr-only" />
                <div className="py-2 rounded-full peer-checked:bg-maincolor peer-checked:text-white text-maincolor transition font-medium text-lg">
                  {t("سائق")}
                </div>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1 px-2">{t(errors.role.message || "")}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={t("الاسم الأول")}
                {...register("firstName")}
                className={fieldClass}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1 px-2">{t(errors.firstName.message || "")}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder={t("اسم العائلة")}
                {...register("lastName")}
                className={fieldClass}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1 px-2">{t(errors.lastName.message || "")}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2">{t("رقم الهاتف")}</label>
            <div className="relative flex items-center bg-transparent border border-maincolor rounded-2xl overflow-hidden focus-within:border-maincolor focus-within:ring-2 focus-within:ring-maincolor">
              <div
                className="flex items-center gap-2 px-4 border-l border-maincolor bg-transparent text-black"
                dir="ltr"
              >
                <img src="https://flagcdn.com/w20/eg.png" alt="Egypt" className="w-6 h-auto" />
                <span className="text-lg">+20</span>
              </div>
              <input
                type="tel"
                placeholder="+2010..."
                {...register("phoneNumber")}
                className="w-full bg-transparent border-none text-black px-4 py-3 outline-none focus:outline-none focus:ring-0 text-left text-lg placeholder:text-gray-600"
                dir="ltr"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm px-2">{t(errors.phoneNumber.message || "")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2">{t("البريد الالكتروني")}</label>
            <input
              type="email"
              placeholder="name@gmail.com"
              {...register("email")}
              className={`${fieldClass} text-left text-lg`}
              dir="ltr"
            />
            {errors.email && (
              <p className="text-red-500 text-sm px-2">{t(errors.email.message || "")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2">{t("كلمة المرور")}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={passwordFieldClass}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 left-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm px-2">{t(errors.password.message || "")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2">{t("تأكيد كلمة المرور")}</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={passwordFieldClass}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 left-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm px-2">{t(errors.confirmPassword.message || "")}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("acceptTerms")}
                className="w-5 h-5 rounded-full border-maincolor text-maincolor focus:ring-maincolor focus:ring-offset-[#fdf4ec] bg-transparent"
              />
              <span className="text-black text-lg">
                {t("لقد قرأت وأوافق علي")}{" "}
                <span className="text-maincolor hover:underline">{t("الشروط والأحكام")}</span>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm mt-[-8px]">{t(errors.acceptTerms.message || "")}</p>
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("acceptPrivacy")}
                className="w-5 h-5 rounded-full border-maincolor text-maincolor focus:ring-maincolor focus:ring-offset-[#fdf4ec] bg-transparent"
              />
              <span className="text-black text-lg">
                {t("لقد قرأت وأوافق علي")}{" "}
                <span className="text-maincolor hover:underline">{t("سياسة الخصوصية")}</span>
              </span>
            </label>
            {errors.acceptPrivacy && (
              <p className="text-red-500 text-sm mt-[-8px]">{t(errors.acceptPrivacy.message || "")}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading === "pending"}
            className="w-full bg-maincolor hover:bg-[#d68432] text-white font-bold py-3 rounded-2xl mt-4 transition flex justify-center items-center text-xl"
          >
            {loading === "pending" ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t("انشاء حساب")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
