import type { Collection } from "tinacms";

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
    {
      type: "string",
      name: "language",
      options: [
        { value: "en", label: "en" },
        { value: "ja", label: "ja" },
      ],
      required: true,
    },
  ],
  format: "json",
} satisfies Collection;
