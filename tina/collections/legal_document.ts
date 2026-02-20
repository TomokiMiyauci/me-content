import type { Collection } from "tinacms";
import language from "./fields/language.ts";

export default {
  name: "legal_document",
  path: "content/legal_documents",
  fields: [
    {
      type: "string",
      name: "type",
      required: true,
      options: [
        { value: "privacy_policy", label: "Privary Policy" },
      ],
    },
    {
      type: "rich-text",
      name: "body",
      isBody: true,
    },
    {
      type: "datetime",
      name: "effective_at",
    },
    language,
  ],
  format: "json",
} satisfies Collection;
