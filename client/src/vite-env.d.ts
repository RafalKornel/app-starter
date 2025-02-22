/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_API_HOST: string;
  readonly VITE_APP_API_PORT: number;
  readonly VITE_APP_ACCESS_TOKEN_TIME: number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}