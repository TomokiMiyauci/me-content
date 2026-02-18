import type { Collection } from "tinacms";

export default {
  name: "blog",
  path: "content/blog",
  fields: [
    {
      type: "string",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
    },
    {
      type: "object",
      name: "cover_image",
      fields: [
        { name: "source", type: "image" },
        { name: "description", type: "string" },
      ],
    },
  ],
  format: "json",
} satisfies Collection;
