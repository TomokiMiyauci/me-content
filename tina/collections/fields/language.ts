import type { TinaField } from "tinacms";
import { t } from "i18next";

export default {
  name: "language",
  type: "string",
  options: [
    { value: "en", label: "En" },
    { value: "ja", label: "Ja" },
  ],
  required: true,
  label: t("language.title"),
  description: t("language.description"),
} satisfies TinaField;
