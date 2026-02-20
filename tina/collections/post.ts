import type { Collection } from "tinacms";
import language from "./fields/language.ts";

export default {
  label: "Blog Posts",
  name: "post",
  path: "content/posts",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
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
      type: "image",
      name: "cover_image",
    },
    {
      type: "datetime",
      name: "published_at",
      required: true,
    },
    {
      type: "datetime",
      name: "modified_at",
    },
    {
      type: "rich-text",
      label: "Blog Post Body",
      name: "body",
      isBody: true,
    },
    {
      name: "authors",
      list: true,
      type: "object",
      fields: [
        {
          type: "reference",
          name: "author",
          collections: ["author"],
        },
      ],
    },
    {
      name: "tags",
      list: true,
      type: "object",
      fields: [
        {
          type: "reference",
          name: "tag",
          collections: ["tag"],
        },
      ],
    },
    {
      name: "categories",
      list: true,
      type: "object",
      fields: [
        {
          type: "reference",
          name: "category",
          collections: ["category"],
        },
      ],
    },
    language,
  ],
} satisfies Collection;
