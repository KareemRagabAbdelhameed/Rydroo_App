import { ArrowRight } from "lucide-react"
import CircleShape from "../components/ui/CircleShape"
import Input from "../components/ui/Input"
import { LoginData } from "../mock/Data"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../validation"
import type { LoginFormValues } from "../interfaces"
import { Link } from "react-router-dom"

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
        mode : "onBlur",
      })
      const onSubmit = (data: any) => console.log(data)
    const renderLoginInputData = LoginData.map(({id,label,name,type})=>
    <div key={id}>
        <Input id={id} label={label} {...register(name as keyof LoginFormValues)} type={type} />
        <p className="text-red-500">{errors[name as keyof LoginFormValues]?.message}</p>
    </div>
    )
  return (
    <div className="flex gap-48">
      <div>
    <CircleShape text1="Hey" text2="Join now!" />
    <div className="px-9 sm:px-20 py-28">
    <form className="w-[300px] mx-auto sm:mx-0" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginInputData}
        <div className="py-6">
            <div className="flex justify-between">
            <h2 className="text-xl font-bold text-secondMainColor">Login</h2>
            <span className="bg-secondMainColor w-[40px] h-[40px] rounded-full p-2">
                <button type="submit">
                <ArrowRight className="text-white text-lg" />

                </button>
            </span>
            </div>
            <p className="text-secondMainColor">Don't Have Account? <Link to="/" className="font-semibold underline">Register Now</Link></p>
        </div>
    </form>
    </div>
    </div>
    <div className="hidden sm:block w-full p-4">
    <div className="mx-auto my-auto">
      <img src="https://static.vecteezy.com/system/resources/previews/025/679/489/non_2x/orange-sports-car-and-car-illustration-design-yellow-color-and-car-banner-design-and-template-and-car-logo-design-vector.jpg" alt="" />
    </div>
    </div>
    </div>
  )
}

export default Login
