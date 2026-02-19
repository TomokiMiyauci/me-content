import type { Collection } from "tinacms";
import picture from "./picture.ts";

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
      templates: [picture],
    },
    {
      type: "string",
      name: "language",
      options: [
        { value: "en", label: "en" },
        { value: "ja", label: "ja" },
      ],
      required: true,
    },
  ],
  format: "json",
} satisfies Collection;
