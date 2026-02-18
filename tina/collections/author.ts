import type { Collection } from "tinacms";

export default {
  name: "author",
  path: "content/authors",
  fields: [
    {
      type: "string",
      name: "name",
      required: true,
      isTitle: true,
    },
  ],
  format: "json",
} satisfies Collection;
