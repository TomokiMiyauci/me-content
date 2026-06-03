import type { Model } from "@cosmos/core";

export default {
  type: "map",
  fields: {
    type: {
      type: "string",
    },
    body: {
      type: "markdown",
    },
    effective_at: {
      type: "datetime",
    },
    language: {
      type: "string",
    },
  },
  required: ["type", "language"],
} satisfies Model;
