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
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "en";
    // custom resources type
    resources: {
      en: typeof translation;
    };
  }
}
