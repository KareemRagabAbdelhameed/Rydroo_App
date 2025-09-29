import { ArrowRight } from "lucide-react"
import CircleShape from "../components/ui/CircleShape"
import Input from "../components/ui/Input"
import { RegisterData } from "../mock/Data"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validation"
import type { RegisterFormValues } from "../interfaces"
import { Link } from "react-router-dom"

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema),
        mode : "onBlur",
      })
      const onSubmit = (data: any) => console.log(data)
    const renderRegisterInputData = RegisterData.map(({id,label,name,type})=>
    <div key={id}>
        <Input id={id} label={label} {...register(name as keyof RegisterFormValues)} type={type} />
        <p className="text-red-500">{errors[name]?.message}</p>
    </div>
    )
  return (
    <div className="flex gap-48">
      <div>
    <CircleShape text1="Hey" text2="Join now!" />
    <div className="px-9 sm:px-20 py-4">
    <form className="w-[300px] mx-auto sm:mx-0" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterInputData}
        <div className="py-4">
            <div className="flex justify-between">
            <h2 className="text-xl font-bold text-secondMainColor">Sign Up</h2>
            <span className="bg-secondMainColor w-[40px] h-[40px] rounded-full p-2">
                <button type="submit">
                <ArrowRight className="text-white text-lg" />

                </button>
            </span>
            </div>
            <p className="text-secondMainColor">Already Have Account? <Link to="/login" className="font-semibold underline">Login</Link></p>
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

export default Register
