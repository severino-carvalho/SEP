import { LoginReqDto } from "@/types/dtos/services/login";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginReqDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
