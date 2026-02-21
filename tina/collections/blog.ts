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
      type: "image",
      name: "cover_image",
    },
    language,
  ],
  format: "json",
} satisfies Collection;
