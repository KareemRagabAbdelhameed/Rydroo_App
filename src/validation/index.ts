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


    export const addTripSchema = yup.object({
        source: yup.string().required("Source is required"),
        destination: yup.string().required("Destination is required"),
        date: yup.date().required("Date is required").min(new Date(), "Date cannot be in the past"),
        time: yup.string().required("Time is required"),
        availableSeats: yup
          .number()
          .typeError("Seats must be a number")
          .required()
          .min(1)
          .max(14),
        price: yup
          .number()
          .typeError("Price must be a number")
          .required()
          .min(1),
        driverProfileId: yup.string().required("Driver is required"),
      });

      export const updateTripSchema = yup.object({
        source: yup.string().required("Source is required"),
        destination: yup.string().required("Destination is required"),
        date: yup
          .string()
          .required("Date is required"),
        time: yup.string().required("Time is required"),
        price: yup.number().required("Price is required").min(1,"Price must be greater than 0"),
        availableSeats: yup
          .number()
          .required()
          .min(1, "Seats must be greater than 0"),
        driverProfile: yup.string().required("Driver is required"),
      });