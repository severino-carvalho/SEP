import { JwtPayload } from "jwt-decode";

export interface IJWTPayload extends JwtPayload {
  nome: string
} 