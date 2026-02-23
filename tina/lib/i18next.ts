import i18next from "i18next";
import translation from "../locales/en.json" with { type: "json" };

i18next.init({
  lng: "en",
  showSupportNotice: false,
  resources: {
    en: {
      translation,
    },
  },
});

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    // custom resources type
    resources: {
      translation: typeof translation;
    };
  }
}
