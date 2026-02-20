import type { Collection } from "tinacms";
import language from "./fields/language.ts";

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
    {
      type: "string",
      name: "description",
    },
    {
      type: "string",
      name: "slug",
      required: true,
    },
    language,
  ],
  format: "json",
} satisfies Collection;
