import type { Collection } from "tinacms";
import language from "./fields/language.ts";
import { t } from "i18next";
import { ns } from "../lib/util.ts";

const fields = ns("blog.fields.");

export default {
  name: "blog",
  path: "content/blog",
  label: t("blog.title"),
  fields: [
    {
      type: "string",
      name: "title",
      isTitle: true,
      required: true,
      label: t(fields("title.title")),
      description: t(fields("title.description")),
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
    language,
  ],
  format: "json",
} satisfies Collection;
