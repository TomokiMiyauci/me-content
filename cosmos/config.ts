import type { Config } from "@cosmos/core";
import { FsStorage } from "@cosmos/storage-fs";
import { DenoIO } from "@cosmos/storage-fs/deno";
import { FrontmatterFormatterDefinition } from "@cosmos/formatter-frontmatter";
import { FsIndexer } from "@cosmos/index-fs";
import { JsonFormatterDefinition } from "@cosmos/formatter-json";
import { YamlFormatterDefinition } from "@cosmos/formatter-yaml";
import { TextFormatterDefinition } from "@cosmos/formatter-text";
import { AssetCodec } from "@cosmos/codec-asset";
import { StringCodec } from "@cosmos/codec-string";
import { MapField } from "@cosmos/codec-map";
import { BooleanCodec } from "@cosmos/codec-boolean";
import { NumberCodec } from "@cosmos/codec-number";
import { ListField } from "@cosmos/codec-list";
import { InstanceField } from "@cosmos/codec-instance";
import { MarkdownCodec } from "@cosmos/codec-markdown";
import { PathReferenceCodec } from "@cosmos/codec-path-reference";
import { DatetimeCodec } from "@cosmos/codec-datetime";
import { UnionField } from "@cosmos/field-union";
import post from "./models/post.ts";
import author from "./models/author.ts";
import category from "./models/category.ts";
import blog from "./models/blog.ts";
import home from "./models/home.ts";
import legalDocument from "./models/legal_document.ts";
import { fromFileUrl } from "@std/path";
import { PathResolver } from "@cosmos/resolver-path";
import { FieldCodec } from "@cosmos/field-codec";

const io = new DenoIO();
const storage = new FsStorage(io);
const file = import.meta.resolve("../");
const rootDir = fromFileUrl(file);

export default {
  models: {
    post,
    author,
    category,
    blog,
    home,
    legalDocument,
  },

  formatters: [
    new FrontmatterFormatterDefinition(),
    new JsonFormatterDefinition(),
    new YamlFormatterDefinition(),
    new TextFormatterDefinition(),
  ],
  field: new FieldCodec({
    string: new StringCodec(),
    asset: new AssetCodec(rootDir),
    map: new MapField(),
    boolean: new BooleanCodec(),
    number: new NumberCodec(),
    instance: new InstanceField(),
    list: new ListField(),
    markdown: new MarkdownCodec(),
    reference: new PathReferenceCodec(rootDir),
    datetime: new DatetimeCodec(),
    union: new UnionField(),
  }),
  indexes: [
    new FsIndexer(rootDir),
  ],
  resolver: new PathResolver(rootDir),
  resources: [
    {
      format: {
        type: "frontmatter",
        header: {
          type: "yaml",
        },
        body: {
          type: "text",
          field: "body",
        },
      },
      model: "post",
      indexer: {
        type: "fs",
        options: {
          pattern: "/content/posts/**/*.md",
        },
      },
    },
    {
      format: {
        type: "json",
      },
      model: "author",
      indexer: {
        type: "fs",
        options: {
          pattern: "/content/authors/**/*.json",
        },
      },
    },
    {
      model: "blog",
      format: {
        type: "json",
      },
      indexer: {
        type: "fs",
        options: {
          pattern: "/content/blog/*.json",
        },
      },
    },
    {
      model: "home",
      format: {
        type: "json",
      },
      indexer: {
        type: "fs",
        options: {
          pattern: "/content/home/*.json",
        },
      },
    },
    {
      model: "legalDocument",
      format: {
        type: "frontmatter",
        header: {
          type: "yaml",
        },
        body: {
          type: "text",
          field: "body",
        },
      },
      indexer: {
        type: "fs",
        options: {
          pattern: "/content/legal_documents/**/*.md",
        },
      },
    },
  ],
  storage,
  assets: [
    {
      indexer: { type: "fs", options: { pattern: "/content/**/*.png" } },
    },
    {
      indexer: { type: "fs", options: { pattern: "/content/**/*.jpg" } },
    },
  ],
} satisfies Config;
