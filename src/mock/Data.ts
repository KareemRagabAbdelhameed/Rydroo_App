import type { IInputProps, ITripsData } from "../interfaces";
export const RegisterData : IInputProps[] = [
    {
        id : "firstName",
        label : "inputs.firstName",
        name : "firstName",
        type : "text",
    },
    {
        id : "lastName",
        label : "inputs.lastName",
        name : "lastName",
        type : "text",
    },
    {
        id : "email",
        label : "inputs.email",
        name : "email",
        type : "email",
    },
    {
        id : "password",
        label : "inputs.password",
        name : "password",
        type : "password",
    },
    {
        id : "confirmPassword",
        label : "inputs.confirmPassword",
        name : "confirmPassword",
        type : "password",
    },
]

export const RoleData = [
    {
      id: "role-user",
      label: "roles.user",
      value: "user",
    },
    {
      id: "role-driver",
      label: "roles.driver",
      value: "driver",
    },
  ] as const;
  


export const LoginData : IInputProps[] = [
    {
        id : "email",
        label : "loginInputs.email",
        name : "email",
        type : "email",
    },
    {
        id : "password",
        label : "loginInputs.password",
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