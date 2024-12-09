import { UsuarioAutenticado } from "@/types/contexts/usuario-autenticado";
import { LoginReqDto } from "@/types/dtos/services/login";
import { createContext } from "react";

interface AuthContextType {
  usuario?: UsuarioAutenticado;
  isAuthenticated: boolean;
  login: (data: LoginReqDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
