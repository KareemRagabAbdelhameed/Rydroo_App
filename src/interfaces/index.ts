export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role : "user" | "driver";
  }
  export interface LoginFormValues {
    email : string,
    password : string
  }
  
  export interface IInputProps {
    id: string;
    label: string;
    type: string;
    name: keyof RegisterFormValues;
    className?: string;
  }

  export interface ITripsData {
    title : string,
    seatsAvailable : number,
    time : string,
    day : string,
    date : string,
  }

  export type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed'