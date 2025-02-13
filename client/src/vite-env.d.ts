/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_API_HOST: string;
  readonly VITE_APP_API_PORT: number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}