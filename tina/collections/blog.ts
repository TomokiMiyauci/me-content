import type { Collection } from "tinacms";
import language from "./fields/language.ts";

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
        { type: "string", name: "title" },
      ],
    },
    language,
  ],
  format: "json",
} satisfies Collection;
