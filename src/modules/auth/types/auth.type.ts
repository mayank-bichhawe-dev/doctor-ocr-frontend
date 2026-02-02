export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export type AuthMode = "login" | "signup";
