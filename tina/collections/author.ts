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
    {
      type: "object",
      name: "image",
      fields: [
        { name: "source", type: "image" },
        { name: "description", type: "string" },
        { type: "string", name: "title" },
      ],
    },
  ],
  format: "json",
} satisfies Collection;
