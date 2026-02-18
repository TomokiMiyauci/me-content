import type { Collection } from "tinacms";

export default {
  name: "tag",
  path: "content/tags",
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
