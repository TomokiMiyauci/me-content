import type { TinaField } from "tinacms";

export default {
  name: "language",
  type: "string",
  options: [
    { value: "en", label: "En" },
    { value: "ja", label: "Ja" },
  ],
  required: true,
} satisfies TinaField;
