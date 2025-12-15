/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_API_KEY: string;
  readonly VITE_GOOGLE_SERVICE_ACCOUNT_API_KEY: string;
  readonly VITE_POC_SHEET_ID: string;
  readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string;
  readonly VITE_AUTH_SERVICE_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
