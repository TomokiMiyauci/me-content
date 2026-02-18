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
  ],
  format: "json",
} satisfies Collection;
