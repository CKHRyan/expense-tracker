/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown;
}

type ImportMetaEnvKey =
  | "VITE_GOOGLE_API_KEY"
  | "VITE_GOOGLE_OAUTH_CLIENT_ID"
  | "VITE_AUTH_SERVICE_HOST"
  | "VITE_ENABLE_AUTH_SERVICE"
  | "VITE_QUERY_STALE_TIME"
  | "VITE_QUERY_GC_TIME";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ImportMetaEnv extends Record<ImportMetaEnvKey, string> {}

interface ImportMeta {
  readonly env: Record<ImportMetaEnvKey, string>;
}

declare module "virtual:pwa-register" {
  import type { RegisterSWOptions } from "vite-plugin-pwa/types";

  export type { RegisterSWOptions };

  export function registerSW(
    options?: RegisterSWOptions,
  ): (reloadPage?: boolean) => Promise<void>;
}
