import type { Collection } from "tinacms";
import language from "./fields/language.ts";
import { t } from "i18next";
import { ns } from "../lib/util.ts";

const fields = ns("legal_document.fields.");

export default {
  name: "legal_document",
  path: "content/legal_documents",
  label: t("legal_document.title"),
  fields: [
    {
      type: "string",
      name: "type",
      required: true,
      options: [
        { value: "privacy_policy", label: "Privary Policy" },
      ],
      label: t(fields("type.title")),
      description: t(fields("type.description")),
    },
    {
      type: "rich-text",
      name: "body",
      isBody: true,
      label: t(fields("body.title")),
      description: t(fields("body.description")),
    },
    {
      type: "datetime",
      name: "effective_at",
      label: t(fields("effective_at.title")),
      description: t(fields("effective_at.description")),
    },
    language,
  ],
  format: "md",
} satisfies Collection;
