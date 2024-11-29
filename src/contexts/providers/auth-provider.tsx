import { authService } from "@/services/auth.service";
import { IChildren } from "@/types/components/IChildren";
import { LoginReqDto } from "@/types/dtos/services/login";
import { LOCAL_STORAGE_ENUM } from "@/types/enums/local-storage-key-enum";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../auth-context";

export function AuthProvider({ children }: Readonly<IChildren>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(data: LoginReqDto): Promise<void> {
    try {
      const { token } = await authService.login(data)
      const tokenJson = JSON.stringify(token)

      localStorage.setItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN, tokenJson)
      setIsAuthenticated(true)
    } catch (error) {
      throw error as AxiosError;
    }
  }

  function logout() {
    localStorage.removeItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN)
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN);

    if (!!tokenLocalStorage) setIsAuthenticated(true)
    else setIsAuthenticated(false)
  }, [localStorage.getItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN)])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}