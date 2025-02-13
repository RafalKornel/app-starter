class ApiClient {
  private readonly url: string;

  constructor() {
    const host = import.meta.env.VITE_APP_API_HOST;
    const port = import.meta.env.VITE_APP_API_PORT;

    this.url = `http://${host}:${port}`;

    console.log(this.url);
  }

  public async getCoffees() {
    return fetch(this.url + `/coffee`).then((res) => res.json());
  }
}

export const apiClient = new ApiClient();
