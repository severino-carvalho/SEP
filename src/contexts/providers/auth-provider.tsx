import { IChildren } from "@/types/components/IChildren";
import { useState } from "react";
import { AuthContext } from "../auth-context";

export function AuthProvider({ children }:  Readonly<IChildren>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}