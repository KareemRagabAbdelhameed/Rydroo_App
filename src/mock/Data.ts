import type { IInputProps } from "../interfaces";

export const RegisterData : IInputProps[] = [
    {
        id : "firstName",
        label : "First Name",
        name : "firstName",
        type : "text",
    },
    {
        id : "lastName",
        label : "Last Name",
        name : "lastName",
        type : "text",
    },
    {
        id : "email",
        label : "Email",
        name : "email",
        type : "email",
    },
    {
        id : "password",
        label : "Password",
        name : "password",
        type : "password",
    },
    {
        id : "confirmPassword",
        label : "Confirm Password",
        name : "confirmPassword",
        type : "password",
    },
]


export const LoginData : IInputProps[] = [
    {
        id : "email",
        label : "Email",
        name : "email",
        type : "email",
    },
    {
        id : "password",
        label : "Password",
        name : "password",
        type : "password",
    },
]