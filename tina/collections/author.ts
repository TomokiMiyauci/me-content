import type { Collection } from "tinacms";
import { t } from "i18next";
import { ns } from "../lib/util.ts";

const fields = ns("author.fields.");

export default {
  name: "author",
  path: "content/authors",
  label: t("author.title"),
  fields: [
    {
      type: "string",
      name: "name",
      required: true,
      isTitle: true,
      label: t(fields("name.title")),
      description: t(fields("name.description")),
    },
    {
      type: "image",
      name: "cover_image",
      label: t(fields("cover_image.title")),
      description: t(fields("cover_image.description")),
    },
  ],
  format: "json",
} satisfies Collection;
