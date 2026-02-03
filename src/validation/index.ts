import * as yup from "yup";
export const registerSchema = yup.object({
    firstName : yup.string().required("validation.firstNameRequired"),
    lastName : yup.string().required("validation.lastNameRequired"),
    email : yup.string().required("validation.emailRequired").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"validation.emailInvalid"),
    password: yup.string()
    .required("validation.passwordRequired")
    .min(8, "validation.passwordMin")
    .matches(/[a-z]/, "validation.passwordLower")
    .matches(/[A-Z]/, "validation.passwordUpper")
    .matches(/\d/, "validation.passwordNumber")
    .matches(/[@$!%*?&]/, "validation.passwordSpecial"),
    confirmPassword: yup.string()
    .required("validation.confirmPasswordRequired")
    .oneOf([yup.ref("password")], "validation.passwordsNotMatch"),
    role: yup
    .mixed<"user" | "driver">()
    .oneOf(["user", "driver"], "*Role is required")
    .required("validation.roleRequired"),
}).required();

    export const loginSchema = yup.object({
        email : yup.string().required("loginValidation.email.required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"loginValidation.email.invalid"),
        password: yup.string()
        .required("loginValidation.password.required")
        .min(8, "loginValidation.password.min")
        .matches(/[a-z]/, "loginValidation.password.lowercase")
        .matches(/[A-Z]/, "loginValidation.password.uppercase")
        .matches(/\d/, "loginValidation.password.number")
        .matches(/[@$!%*?&]/, "loginValidation.password.special"),
    }).required();