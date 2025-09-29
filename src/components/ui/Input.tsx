import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IInputProps {
  id: string;
  label: string;
  type: string;
  name: keyof RegisterFormValues;
  className?: string;
}

export default function Input({
  id,
  label,
  name,
  type,
  ...rest
}: IInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="py-2 relative">
      <label
        htmlFor={id}
        className="block mb-2 text-lg font-medium text-secondMainColor dark:text-white"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          className="bg-thirdMainColor border border-thirdMainColor text-secondMainColor text-md py-4 sm:py-2 rounded-lg focus:ring-secondMainColor focus:border-secondMainColor block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...rest}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-secondMainColor dark:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
