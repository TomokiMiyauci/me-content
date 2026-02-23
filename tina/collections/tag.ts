import type { Collection } from "tinacms";
import language from "./fields/language.ts";
import { t } from "i18next";
import { ns } from "../lib/util.ts";

const fields = ns("tag.fields.");

export default {
  name: "tag",
  path: "content/tags",
  label: t("tag.title"),
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
      type: "string",
      name: "description",
      label: t(fields("description.title")),
      description: t(fields("description.description")),
    },
    {
      type: "string",
      name: "slug",
      required: true,
      label: t(fields("slug.title")),
      description: t(fields("slug.description")),
    },
    language,
  ],
  format: "json",
} satisfies Collection;
