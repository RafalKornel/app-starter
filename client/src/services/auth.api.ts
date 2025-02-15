import { ApiClient } from "./api";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
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
  public async login(body: LoginBody) {
    return this.fetch<LoginResponse, LoginBody>("/auth/login", "POST", body);
  }

  public async register(body: RegisterBody) {
    return this.fetch<RegisterResponse, RegisterBody>(
      "/auth/register",
      "POST",
      body
    );
  }
}

export const authApi = new AuthApi();
