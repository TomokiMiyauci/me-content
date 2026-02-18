import type { Collection } from "tinacms";

export default {
  name: "category",
  path: "content/category",
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
