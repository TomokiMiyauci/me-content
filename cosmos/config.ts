import type { Config } from "@cosmos/core";
import { FsStorage } from "@cosmos/storage-fs";
import { DenoIO } from "@cosmos/storage-fs/deno";
import { FrontmatterFormatter } from "@cosmos/formatter-frontmatter";
import { FsLocator } from "@cosmos/locator-fs";
import { JsonFormatter } from "@cosmos/formatter-json";
import { YamlFormatter } from "@cosmos/formatter-yaml";
import { TextFormatter } from "@cosmos/formatter-text";
import { AssetCodec } from "@cosmos/codec-asset";
import { StringCodec } from "@cosmos/codec-string";
import { MapCodec } from "@cosmos/codec-map";
import { BooleanCodec } from "@cosmos/codec-boolean";
import { NumberCodec } from "@cosmos/codec-number";
import { ListCodec } from "@cosmos/codec-list";
import { InstanceCodec } from "@cosmos/codec-instance";
import { MarkdownCodec } from "@cosmos/codec-markdown";
import { ReferenceCodec } from "@cosmos/codec-reference";
import { DatetimeCodec } from "@cosmos/codec-datetime";
import { UnionCodec } from "@cosmos/codec-union";
import post from "./models/post.ts";
import author from "./models/author.ts";
import category from "./models/category.ts";
import blog from "./models/blog.ts";
import home from "./models/home.ts";
import legalDocument from "./models/legal_document.ts";
import { PathConverter } from "@cosmos/converter-path";
import { fromFileUrl } from "@std/path";

const io = new DenoIO();
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

  formats: {
    frontmatter: new FrontmatterFormatter(),
    json: new JsonFormatter(),
    yaml: new YamlFormatter(),
    text: new TextFormatter(),
  },
  codec: {
    string: new StringCodec(),
    asset: new AssetCodec(),
    map: new MapCodec(),
    boolean: new BooleanCodec(),
    number: new NumberCodec(),
    instance: new InstanceCodec(),
    list: new ListCodec(),
    markdown: new MarkdownCodec(["post"]),
    reference: new ReferenceCodec(),
    datetime: new DatetimeCodec(),
    union: new UnionCodec(),
  },
  resources: {
    posts: {
      type: "collection",
      model: "post",
      main: "body",
    },
    authors: {
      type: "collection",
      model: "author",
    },
    blogs: {
      type: "collection",
      model: "blog",
    },
    homes: {
      type: "collection",
      model: "home",
    },
    legalDocuments: {
      type: "collection",
      model: "legalDocument",
      main: "body",
    },
  },
  sources: [
    {
      resource: "posts",
      locator: {
        type: "fs",
        option: {
          patterns: ["/content/posts/**/*.md"],
        },
      },
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
    {
      resource: "authors",
      locator: {
        type: "fs",
        option: {
          patterns: ["/content/authors/**/*.json"],
        },
      },
      format: {
        type: "json",
      },
    },
    {
      resource: "blogs",
      locator: {
        type: "fs",
        option: {
          patterns: ["/content/blog/*.json"],
        },
      },
      format: {
        type: "json",
      },
    },
    {
      resource: "homes",
      locator: {
        type: "fs",
        option: {
          patterns: ["/content/home/*.json"],
        },
      },
      format: {
        type: "json",
      },
    },
    {
      resource: "legalDocuments",
      locator: {
        type: "fs",
        option: {
          patterns: ["/content/legal_documents/**/*.md"],
        },
      },
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
  ],
  storages: {
    file: new FsStorage(io),
  },
  locators: {
    fs: new FsLocator(rootDir),
  },
  assets: {
    assets: {
      locator: {
        type: "fs",
        option: {
          patterns: ["/content/**/*.png", "/content/**/*.jpg"],
        },
      },
    },
  },
  converters: {
    asset: new PathConverter(rootDir),
    reference: new PathConverter(rootDir),
  },
} satisfies Config;
