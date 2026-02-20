import type { Collection } from "tinacms";
import language from "./fields/language.ts";

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
    {
      type: "string",
      name: "slug",
      required: true,
    },
    {
      type: "string",
      name: "description",
    },
    language,
  ],
  format: "json",
} satisfies Collection;
