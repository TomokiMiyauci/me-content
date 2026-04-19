import type { Model } from "@cosmos/core";

export default {
  type: "map",
  fields: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    cover_image: {
      type: "asset",
    },
    language: { type: "string" },
  },
  required: ["title", "language"],
} satisfies Model;
