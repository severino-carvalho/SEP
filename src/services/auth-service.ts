import { ServerApi } from "@/lib/axios/server-api";
import { LoginReqDto, LoginResDto } from "@/types/dtos/services/login";

class AuthService {
  protected readonly serverAPI;

  constructor(protected readonly url: string) {
    this.serverAPI = ServerApi;
  }

  public async login(data: LoginReqDto): Promise<LoginResDto> {
    const { data: responseData } = await this.serverAPI.post<LoginResDto>(`${this.url}/login`, data);
    return responseData;
  }
}

export const authService = new AuthService("/auth")