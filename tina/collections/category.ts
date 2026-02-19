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
    {
      type: "string",
      name: "slug",
      required: true,
    },
    {
      type: "string",
      name: "description",
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
