import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import type { LoginFormValues } from "../interfaces";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/auth/hooks";
import actAuthLogin from "../store/auth/act/actAuthLogin";
import actGetDriverProfile from "../store/auth/act/actGetDriverProfile";
import { toast } from "react-toastify";
import type { RootState } from "../store/store";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/logo.png";
import {
  clearPendingAuthPreferences,
  getPendingAuthEmail,
  getPendingAuthRole,
} from "../Features/Authentication/application/pendingAuthPreferences";

const fieldClass =
  "w-full bg-transparent border border-maincolor text-black px-4 py-3 rounded-2xl outline-none focus:outline-none focus:border-maincolor focus:ring-2 focus:ring-maincolor text-left text-lg placeholder:text-gray-700";
const passwordFieldClass =
  "w-full bg-transparent border border-maincolor text-black py-3 pl-12 pr-4 rounded-2xl outline-none focus:outline-none focus:border-maincolor focus:ring-2 focus:ring-maincolor text-left text-lg";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, user } = useAppSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const locationRole =
    location.state?.role === "driver" || location.state?.role === "user"
      ? location.state.role
      : undefined;
  const defaultRole =
    locationRole ||
    (user?.role === "driver" ? "driver" : undefined) ||
    getPendingAuthRole();
  const defaultEmail =
    (typeof location.state?.email === "string" && location.state.email) ||
    user?.email ||
    getPendingAuthEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      role: defaultRole,
      email: defaultEmail,
    },
  });

  const resolveDriverDestination = async () => {
    const profileResult = await dispatch(actGetDriverProfile());
    if (actGetDriverProfile.fulfilled.match(profileResult)) {
      const status = profileResult.payload.data?.status;
      if (!status || status === "draft") {
        return "/complete-driver-profile";
      }
      return "/";
    }

    const rejection = profileResult.payload as { status?: number } | undefined;
    if (rejection?.status === 404) {
      return "/complete-driver-profile";
    }
    return "/";
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await dispatch(actAuthLogin(data));

    if (actAuthLogin.fulfilled.match(result)) {
      clearPendingAuthPreferences();
      const userRole = result.payload.data?.user?.role;
      toast.success(result.payload.message || t("تم تسجيل الدخول بنجاح!"), {
        autoClose: 3000,
      });

      let destination = "/";
      if (userRole === "admin") {
        destination = "/admin";
      } else if (userRole === "driver") {
        destination = await resolveDriverDestination();
      }

      setTimeout(() => {
        navigate(destination);
      }, 3000);
    } else {
      toast.error(
        (result.payload as string) || t("حدث خطأ أثناء تسجيل الدخول.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-forthMainColor py-12 px-6 font-futura text-black overflow-y-auto" dir="rtl">
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-6">
        <Link to="/" className="mb-4 block cursor-pointer">
          <div
            className="h-20 w-40 bg-maincolor mx-auto"
            style={{
              WebkitMask: `url(${logo}) center/contain no-repeat`,
              mask: `url(${logo}) center/contain no-repeat`,
            }}
            title="Rydroo Logo"
          ></div>
        </Link>

        <h1 className="text-2xl font-bold text-black mb-2">{t("مرحبًا بعودتك")}</h1>
        <p className="text-gray-800 text-lg mb-8 text-center">
          {t("سجل الدخول إلى حسابك للمتابعة")}
        </p>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex bg-transparent border border-maincolor rounded-full p-1">
              <label className="flex-1 text-center cursor-pointer">
                <input type="radio" value="user" {...register("role")} className="peer sr-only" />
                <div className="py-2 rounded-full peer-checked:bg-maincolor peer-checked:text-white text-black transition font-medium text-lg">
                  {t("مسافر")}
                </div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input type="radio" value="driver" {...register("role")} className="peer sr-only" />
                <div className="py-2 rounded-full peer-checked:bg-maincolor peer-checked:text-white text-black transition font-medium text-lg">
                  {t("سائق")}
                </div>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1 px-2">{t(errors.role.message || "")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-lg pr-2">
              {t("البريد الالكتروني أو رقم الهاتف")}
            </label>
            <input
              type="text"
              placeholder="name@gmail.com"
              {...register("email")}
              className={fieldClass}
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

          {error && <p className="text-red-500 text-center text-md">{t(error)}</p>}

          <button
            type="submit"
            disabled={loading === "pending"}
            className="w-full bg-maincolor hover:bg-[#d68432] text-white font-bold py-3 rounded-full mt-4 transition flex justify-center items-center text-xl shadow-sm"
          >
            {loading === "pending" ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t("تسجيل الدخول")
            )}
          </button>

          <p className="text-center text-black text-lg mt-2">
            {t("ليس لديك حساب؟")}{" "}
            <Link to="/register" className="text-maincolor hover:underline font-medium">
              {t("سجل الآن")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
