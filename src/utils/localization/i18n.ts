import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { useAppStore } from "@stores/appStore";
import translationEn from "./locale/en.json";
import translationZh from "./locale/zh.json";
import type { AppLocale } from "@utils/types";

const storedLang = useAppStore.getState().locale;

const resources = {
  en: { translation: translationEn },
  zh: { translation: translationZh },
};

const convertDetectedLanguage = (lng: string) => {
  // Custom logic to convert the detected language code
  // For example, to convert 'en-US' to 'en'
  const lngPrefix = lng.split("-")[0];
  let mappedLng: AppLocale;
  switch (lngPrefix) {
    case "zh":
      mappedLng = "zh";
      break;
    case "en":
    default:
      mappedLng = "en";
      break;
  }
  useAppStore.setState(({ locale }) =>
    locale ? { locale } : { locale: mappedLng }
  );
  return mappedLng;
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: storedLang,
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    nonExplicitSupportedLngs: true,
    detection: { convertDetectedLanguage },
  });

export { i18n };
