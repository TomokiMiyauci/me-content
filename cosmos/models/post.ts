import type { Model } from "@cosmos/core";

export default {
  type: "map",
  fields: {
    title: {
      type: "string",
    },
    slug: {
      type: "string",
    },
    description: {
      type: "string",
    },
    // cover_image: {
    //   type: "asset",
    // },
    published_at: {
      type: "datetime",
    },
    modified_at: {
      type: "datetime",
    },
    body: {
      type: "string",
    },
    authors: {
      type: "list",
      field: {
        type: "reference",
        model: "author",
      },
    },
    tags: {
      type: "list",
      field: {
        type: "map",
        fields: {
          name: {
            type: "string",
          },
        },
      },
    },
    categories: {
      type: "list",
      field: {
        type: "instance",
        model: "category",
      },
    },
    language: {
      type: "string",
    },
  },
  required: ["title", "language", "slug"],
} satisfies Model;
