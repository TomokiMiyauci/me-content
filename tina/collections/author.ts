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
      type: "image",
      name: "cover_image",
    },
  ],
  format: "json",
} satisfies Collection;
