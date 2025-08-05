/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INDMONEY_AUTH_TOKEN?: string;
  readonly VITE_API_BASE_URL?: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
