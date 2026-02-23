import type { Collection } from "tinacms";
import language from "./fields/language.ts";
import { t } from "i18next";
import { ns } from "../lib/util.ts";

const fields = ns("post.fields.");

export default {
  label: t("post.title"),
  name: "post",
  path: "content/posts",
  fields: [
    {
      type: "string",
      name: "title",
      label: t(fields("title.title")),
      required: true,
      isTitle: true,
      description: t(fields("title.description")),
    },
    {
      type: "string",
      name: "slug",
      label: t(fields("slug.title")),
      required: true,
      description: t(fields("slug.description")),
    },
    {
      type: "string",
      name: "description",
      label: t(fields("description.title")),
      description: t(fields("description.description")),
    },
    {
      type: "image",
      name: "cover_image",
      label: t(fields("cover_image.title")),
      description: t(fields("cover_image.description")),
    },
    {
      type: "datetime",
      name: "published_at",
      required: true,
      label: t(fields("published_at.title")),
      description: t(fields("published_at.description")),
    },
    {
      type: "datetime",
      name: "modified_at",
      label: t(fields("modified_at.title")),
      description: t(fields("modified_at.description")),
    },
    {
      type: "rich-text",
      name: "body",
      isBody: true,
      label: t(fields("body.title")),
      description: t(fields("body.description")),
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
      label: t(fields("authors.title")),
      description: t(fields("authors.description")),
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
      label: t(fields("tags.title")),
      description: t(fields("tags.description")),
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
      label: t(fields("categories.title")),
      description: t(fields("categories.description")),
    },
    language,
  ],
} satisfies Collection;
