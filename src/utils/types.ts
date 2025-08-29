export const APP_LOCALES = ["en", "zh"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type Nullable<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | null : T[P];
};
