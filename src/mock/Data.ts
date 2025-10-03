import type { IInputProps, ITripsData } from "../interfaces";

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

export const TripsData : ITripsData[] = [
    {
        title : "Ramses Trip",
        seatsAvailable : 4,
        time : "12:00 PM",
        day : "Monday",
        date : "5/10/2025"
    },
    {
        title : "Almarg Trip",
        seatsAvailable : 6,
        time : "08:00 PM",
        day : "Saturday",
        date : "9/10/2025"
    },
]