import { ServerApi } from "@/lib/axios/server-api";
import { LoginReqDto, LoginResDto } from "@/types/dtos/services/login";
import { Service } from "./service";

class AuthService extends Service {
  constructor(url: string) {
    super(url, ServerApi)
  }

  public async login(data: LoginReqDto): Promise<LoginResDto> {
    const { data: responseData } = await this.serverAPI.post<LoginResDto>(`${this.url}/login`, data);
    return responseData;
  }
}

export const authService = new AuthService("/auth")