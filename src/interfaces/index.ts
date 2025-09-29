export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
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