import { ArrowRight } from "lucide-react";
import CircleShape from "../components/ui/CircleShape";
import Input from "../components/ui/Input";
import { RegisterData } from "../mock/Data";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import type { RegisterFormValues } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";
import busImage from "../assets/images/busImage.png";
import { useAppDispatch, useAppSelector } from "../store/auth/hooks";
import actAuthRegister from "../store/auth/act/actAuthRegister";
import type { RootState } from "../store/store";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading  } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async(data) => {
    const result = await dispatch(actAuthRegister(data));
    if (actAuthRegister.fulfilled.match(result)) {
      // عرض رسالة النجاح والتحويل إلى صفحة التحقق
      toast.success(result.payload.message || "Registration successful! Please verify your email.", {
        onClose: () => navigate("/verify"),
      });
    } else {
      // عرض رسالة الخطأ
      toast.error(result.payload as string || "Something went wrong during registration.");
    }
  };

  // // ✅ Toasts
  // useEffect(() => {
  //   if (user) {
  //     toast.success(successMessage , {
  //       onClose: () => navigate("/verify"), 
  //     });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(typeof error === "string" ? error : "Something went wrong");
  //   }
  // }, [error]);

  const renderRegisterInputData = RegisterData.map(
    ({ id, label, name, type }) => (
      <div key={id}>
        <Input
          id={id}
          label={label}
          {...register(name as keyof RegisterFormValues)}
          type={type}
        />
        <p className="text-red-500">{errors[name]?.message}</p>
      </div>
    )
  );

  return (
    <div className="flex gap-48">
      <div className="font-futura">
        <CircleShape text1="Hey" text2="Join now!" />
        <div className="px-9 sm:px-20 py-4 mx-auto sm:mx-0">
          <form className="w-[300px]" onSubmit={handleSubmit(onSubmit)}>
            {renderRegisterInputData}
            <div className="py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-secondMainColor dark:text-white">
                  Sign Up
                </h2>
                <span className="bg-secondMainColor w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  <button type="submit" disabled={loading==="pending"}>
                    {loading ==="pending" ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ArrowRight className="text-white text-lg" />
                    )}
                  </button>
                </span>
              </div>

              <p className="text-secondMainColor dark:text-white mt-3">
                Already Have Account?{" "}
                <Link to="/login" className="font-semibold underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden sm:block w-full p-4">
        <div className="mx-auto my-auto mt-16">
          <img src={busImage} alt="Rydroo Bus" />
        </div>
      </div>
    </div>
  );
};

export default Register;
