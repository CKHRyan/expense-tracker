import "i18next";
import translationEn from "@utils/localization/locale/en.json";
import translationZh from "@utils/localization/locale/zh.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof translationEn;
      zh: typeof translationZh;
    };
  }
}
