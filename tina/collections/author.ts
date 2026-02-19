import type { Collection } from "tinacms";
import picture from "./picture.ts";

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
      templates: [
        picture,
      ],
    },
  ],
  format: "json",
} satisfies Collection;
