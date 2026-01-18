import { User } from "firebase/auth";

export interface AuthContextType{
    user: User | null;
    loading: boolean;
}

export interface RegisterData{
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

