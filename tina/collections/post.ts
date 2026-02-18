import type { Collection } from "tinacms";

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
      name: "description",
    },
    {
      type: "object",
      fields: [
        { type: "image", name: "source" },
        { type: "string", name: "description" },
        { type: "string", name: "title" },
      ],

      name: "cover_image",
    },
    {
      type: "datetime",
      name: "published_at",
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
  ],
} satisfies Collection;
