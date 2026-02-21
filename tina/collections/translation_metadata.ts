import type { Collection } from "tinacms";

export default {
  name: "translation_metadata",
  path: "content/translation_metadata",
  fields: [
    {
      type: "object",
      name: "translations",
      list: true,
      fields: [
        {
          name: "value",
          type: "reference",
          collections: ["post"],
        },
        {
          name: "key",
          type: "string",
        },
      ],
    },
  ],
  format: "json",
} satisfies Collection;
