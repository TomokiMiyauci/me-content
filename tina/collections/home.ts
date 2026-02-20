import type { Collection } from "tinacms";

export default {
  name: "home",
  path: "content/home",
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
      name: "image",
      fields: [
        { name: "source", type: "image" },
        { name: "description", type: "string" },
        { type: "string", name: "title" },
      ],
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
