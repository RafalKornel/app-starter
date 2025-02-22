import { refreshTokenRevokedChannel } from "@/auth/refresh-token-revoked.channel";
import { ApiClient } from "./api";

export interface LoginBody {
  email: string;
  password: string;
}

export interface Profile {
  id: number;
  email: string;
  username: string;
  avatar?: string;
}

export interface LoginResponse {
  accessToken: string;
  profile: Profile;
}

export interface RegisterBody {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  username: string;
  email: string;
}

class AuthApi extends ApiClient {
  private refreshInterval: NodeJS.Timeout | undefined;
  private accessTokenTimeInS: number;

  constructor() {
    super();

    this.accessTokenTimeInS = import.meta.env.VITE_APP_ACCESS_TOKEN_TIME || 600;
  }

  public async login(body: LoginBody) {
    const response = await this.fetch<LoginResponse, LoginBody>(
      "/auth/login",
      "POST",
      body
    );

    this.setAccessToken(response.accessToken);

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = setInterval(() => {
      this.refreshToken();
    }, this.accessTokenTimeInS * 1000);

    return response;
  }

  public async logout() {
    await this.fetch("/auth/logout", "POST");

    this.clearToken();
  }

  public async refreshToken() {
    try {
      const { accessToken } = await this.fetch(
        "/auth/refresh-access-token",
        "POST"
      );

      this.setAccessToken(accessToken);
    } catch (e) {
      this.clearToken();

      refreshTokenRevokedChannel.emit();
    }
  }

  public async register(body: RegisterBody) {
    return this.fetch<RegisterResponse, RegisterBody>(
      "/auth/register",
      "POST",
      body
    );
  }

  public async getProfile() {
    return this.fetch<Profile>("/auth/profile", "GET");
  }
}

export const authApi = new AuthApi();
