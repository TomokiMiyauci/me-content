import type { Template } from "tinacms";

export default {
  name: "picture",
  fields: [
    { name: "source", type: "image" },
    { name: "description", type: "string" },
    { type: "string", name: "title" },
  ],
} satisfies Template;
