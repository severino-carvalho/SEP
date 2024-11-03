import { ServerApi } from "@/lib/axios/server-api";
import { Service } from "./service";

class AuthService extends Service {
  constructor(url: string) {
    super(url, ServerApi)
  }

  public async login(data: unknown) {
    const { data: responseData } = await this.serverAPI.post<unknown>(`${this.url}/login`, data);
    return responseData;
  }
}

export const authService = new AuthService("/auth")