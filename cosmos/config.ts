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
  field: {
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
  },
  resources: {
    posts: {
      type: "document",
      model: "post",
      entity: "collection",
      format: {
        type: "frontmatter",
        header: {
          type: "yaml",
        },
        body: {
          type: "text",
        },
        bodyKey: "body",
      },
    },
    authors: {
      type: "document",
      entity: "collection",
      format: {
        type: "json",
      },
      model: "author",
    },
    blogs: {
      type: "document",
      entity: "collection",
      format: {
        type: "json",
      },
      model: "blog",
    },
    homes: {
      type: "document",
      entity: "collection",
      model: "home",
      format: {
        type: "json",
      },
    },
    legalDocuments: {
      type: "document",
      entity: "collection",
      model: "legalDocument",
      format: {
        type: "frontmatter",
        header: {
          type: "yaml",
        },
        body: {
          type: "text",
        },
        bodyKey: "body",
      },
    },
    assets: {
      type: "asset",
    },
  },
  sources: {
    posts: new FsIndexer(rootDir, {
      patterns: "/content/posts/**/*.md",
    }),
    authors: new FsIndexer(rootDir, {
      patterns: "/content/authors/**/*.json",
    }),
    blogs: new FsIndexer(rootDir, {
      patterns: "/content/blog/*.json",
    }),
    homes: new FsIndexer(rootDir, {
      patterns: "/content/home/*.json",
    }),
    legalDocuments: new FsIndexer(rootDir, {
      patterns: "/content/legal_documents/**/*.md",
    }),
    assets: new FsIndexer(rootDir, {
      patterns: ["/content/**/*.png", "/content/**/*.jpg"],
    }),
  },
  storage,
} satisfies Config;
