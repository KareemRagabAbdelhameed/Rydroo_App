import * as yup from "yup";
import { loginSchema, registerSchema } from "../validation";

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
export type LoginFormValues = yup.InferType<typeof loginSchema>;
  
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