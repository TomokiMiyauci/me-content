import type { Collection } from "tinacms";
import { t } from "i18next";
import { ns } from "../lib/util.ts";

const fields = ns("translation_metadata.fields.");
const tFields = ns("translation_metadata.fields.translations.fields.");

export default {
  name: "translation_metadata",
  path: "content/translation_metadata",
  label: t("translation_metadata.title"),
  fields: [
    {
      type: "object",
      name: "translations",
      label: t(fields("translations.title")),
      description: t(fields("translations.description")),
      list: true,
      fields: [
        {
          name: "value",
          type: "reference",
          collections: ["post"],
          label: t(tFields("value.title")),
          description: t(tFields("value.description")),
        },
        {
          name: "key",
          type: "string",
          label: t(tFields("key.title")),
          description: t(tFields("key.description")),
        },
      ],
    },
  ],
  format: "json",
} satisfies Collection;
