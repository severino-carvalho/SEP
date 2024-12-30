import { authService } from "@/services/auth-service";
import { IChildren } from "@/types/components/IChildren";
import { IJWTPayload } from "@/types/contexts/jwt-payload";
import { ILocalStorage } from "@/types/contexts/local-storage";
import { UsuarioAutenticado } from "@/types/contexts/usuario-autenticado";
import { LoginReqDto } from "@/types/dtos/services/login";
import { LOCAL_STORAGE_ENUM } from "@/types/enums/local-storage-key-enum";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { AuthContext } from "../auth-context";

interface AuthProviderProps extends IChildren {}

export function AuthProvider(props: Readonly<AuthProviderProps>) {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(data: LoginReqDto): Promise<void> {
    try {
      const { token } = await authService.login(data)
      const payload = jwtDecode<IJWTPayload>(token);

      const usuario: UsuarioAutenticado = {
        email: payload.sub
      }

      const tokenJson = JSON.stringify(token)
      const usuarioJson = JSON.stringify(usuario)

      localStorage.setItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN, tokenJson)
      localStorage.setItem(LOCAL_STORAGE_ENUM.SEP_USUARIO, usuarioJson)

      setIsAuthenticated(true)
      setUsuario(usuario)
    } catch (error) {
      throw error as AxiosError;
    }
  }

  function logout() {
    localStorage.removeItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_ENUM.SEP_USUARIO)

    setIsAuthenticated(false);
    setUsuario(undefined)
  }

  /**
   * @description Recupera dados existentes no localStorage case existam
   * @since 1.0
   * @returns LocalStorageType - Objeto contendo todas as informações do que é armazenado no LocalStorage
   */
  function recuperarLocalStorage(): ILocalStorage | null {
    const tokenJSON = localStorage.getItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN);
    const usuarioJSON = localStorage.getItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN);

    if (!!tokenJSON && !!usuarioJSON) {
      try {
        const token = JSON.parse(tokenJSON)
        const usuario = JSON.parse(usuarioJSON)

        return { token, usuario } as ILocalStorage
      } catch (error) {
        return null
      }
    }

    return null
  }

  function recuperarInformacoesLogin() {
    const localStorage = recuperarLocalStorage()

    if (!!localStorage) {
      setIsAuthenticated(true)
      setUsuario(localStorage.usuario)
    }
  }

  function isTokenValido() {
    const localStorage = recuperarLocalStorage()

    if (!localStorage) return false

    const payload = jwtDecode<IJWTPayload>(localStorage.token)
    if (payload.exp && payload.exp * 1000 < Date.now()) return false

    return true
  }

  useEffect(() => {
    if (isTokenValido()) {
      recuperarInformacoesLogin()
    } else logout()
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}