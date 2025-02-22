export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export class ApiClient {
  private static ACCESS_TOKEN_LOCALSTORAGE_KEY = "accessToken";

  private readonly url: string;

  constructor() {
    const host = import.meta.env.VITE_APP_API_HOST;
    const port = import.meta.env.VITE_APP_API_PORT;

    this.url = `http://${host}:${port}`;
  }

  protected async fetch<
    TResponse extends Record<string, any>,
    TBody extends Record<string, any>,
  >(endpoint: string, method: Method, body?: TBody) {
    const res = await fetch(this.url + endpoint, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        ...(this.accessToken
          ? { Authorization: "Bearer " + this.accessToken }
          : {}),
      },
      credentials: "include",
    });

    const json: TResponse = await res.json();

    if (!res.ok) {
      throw json as unknown as ApiError;
    }

    return json;
  }

  get accessToken(): string | null {
    return localStorage.getItem(ApiClient.ACCESS_TOKEN_LOCALSTORAGE_KEY);
  }

  protected setAccessToken(token: string) {
    localStorage.setItem(ApiClient.ACCESS_TOKEN_LOCALSTORAGE_KEY, token);
  }
}
