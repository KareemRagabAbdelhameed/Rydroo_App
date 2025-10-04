import { ArrowRight } from "lucide-react";
import CircleShape from "../components/ui/CircleShape";
import Input from "../components/ui/Input";
import { LoginData } from "../mock/Data";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import type { LoginFormValues } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";
import busImage from "../assets/images/busImage.png";
import { useAppDispatch, useAppSelector } from "../store/auth/hooks";
import actAuthLogin from "../store/auth/act/actAuthLogin";
import { toast } from "react-toastify";
import type { RootState } from "../store/store";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error , successMessage } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await dispatch(actAuthLogin(data));

    if (actAuthLogin.fulfilled.match(result)) {
      toast.success(successMessage || "Login successful!", { autoClose: 3000 });
      setTimeout(() => navigate("/"), 3000); // navigate to home
    } else {
      toast.error(result.payload as string, { autoClose: 3000 });
    }
  };

  const renderLoginInputData = LoginData.map(({ id, label, name, type }) => (
    <div key={id}>
      <Input
        id={id}
        label={label}
        {...register(name as keyof LoginFormValues)}
        type={type}
      />
      <p className="text-red-500">
        {errors[name as keyof LoginFormValues]?.message}
      </p>
    </div>
  ));

  return (
    <div className="flex gap-48">
      <div className="font-futura">
        <CircleShape text1="Welcome" text2="Back" />
        <div className="px-9 sm:px-20 py-8">
          <form
            className="w-[300px] mx-auto sm:mx-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            {renderLoginInputData}
            <div className="py-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-secondMainColor dark:text-white">
                  Login
                </h2>
                <span className="bg-secondMainColor w-[40px] h-[40px] rounded-full p-2 flex items-center justify-center">
                  <button type="submit" disabled={loading === "pending"}>
                    {loading === "pending" ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <ArrowRight className="text-white text-lg" />
                    )}
                  </button>
                </span>
              </div>

              {error && <p className="text-red-500 mt-2">{error}</p>}

              <p className="text-secondMainColor dark:text-white mt-2">
                Don't Have Account?{" "}
                <Link to="/register" className="font-semibold underline">
                  Register Now
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

export default Login;
