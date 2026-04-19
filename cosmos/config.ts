import type {
  Config,
  Field,
  FieldCodec,
  FieldContext,
  Node,
  StructureValue,
} from "@cosmos/core";
import { FsStorage } from "@cosmos/storage-fs";
import { DenoIO } from "@cosmos/storage-fs/deno";
import { FrontmatterFormatterDefinition } from "@cosmos/formatter-frontmatter";
import { FsIndexer } from "@cosmos/index-fs";
import { JsonFormatterDefinition } from "@cosmos/formatter-json";
import { YamlFormatterDefinition } from "@cosmos/formatter-yaml";
import { TextFormatterDefinition } from "@cosmos/formatter-text";
import { AssetFieldCodec } from "@cosmos/field-asset";
import { StringFieldCodec } from "@cosmos/field-string";
import { MapField } from "@cosmos/field-map";
import { BooleanFieldCodec } from "@cosmos/field-boolean";
import { NumberFieldCodec } from "@cosmos/field-number";
import { ListField } from "@cosmos/field-list";
import { InstanceField } from "@cosmos/field-instance";
import { MarkdownCodec } from "@cosmos/field-markdown";
import { PathReferenceFieldCodec } from "@cosmos/field-path-reference";
import { DatetimeFieldCodec } from "@cosmos/field-datetime";
import { UnionField } from "@cosmos/field-union";
import post from "./models/post.ts";
import author from "./models/author.ts";
import category from "./models/category.ts";
import { fromFileUrl } from "@std/path";
import { PathResolver } from "@cosmos/resolver-path";

const io = new DenoIO();
const storage = new FsStorage(io);

type Definition = {
  stirng: FieldCodec;
  number: FieldCodec;
  boolean: FieldCodec;
  map: FieldCodec;
  instance: FieldCodec;
  reference: FieldCodec;
  list: FieldCodec;
  datetime: FieldCodec;
  markdown: FieldCodec;
  asset: FieldCodec;
  union: FieldCodec;
};

class Def implements FieldCodec {
  constructor(private def: Definition) {}
  parse(structure: StructureValue, field: Field, ctx: FieldContext) {
    switch (field.type) {
      case "string": {
        return this.def.stirng.parse(structure, field, ctx);
      }
      case "number": {
        return this.def.number.parse(structure, field, ctx);
      }
      case "boolean": {
        return this.def.boolean.parse(structure, field, ctx);
      }
      case "instance": {
        return this.def.instance.parse(structure, field, ctx);
      }
      case "reference": {
        return this.def.reference.parse(structure, field, ctx);
      }
      case "list": {
        return this.def.list.parse(structure, field, ctx);
      }
      case "asset": {
        return this.def.asset.parse(structure, field, ctx);
      }
      case "map": {
        return this.def.map.parse(structure, field, ctx);
      }
      case "datetime": {
        return this.def.datetime.parse(structure, field, ctx);
      }
      case "markdown": {
        return this.def.markdown.parse(structure, field, ctx);
      }
      case "union": {
        return this.def.union.parse(structure, field, ctx);
      }
    }
  }
  stringify(
    node: Node,
    field: Field,
  ): StructureValue | Promise<StructureValue> {
    return "";
  }
}

const file = import.meta.resolve("../");
const rootDir = fromFileUrl(file);

export default {
  models: {
    post,
    author,
    category,
  },
  formatters: [
    new FrontmatterFormatterDefinition(),
    new JsonFormatterDefinition(),
    new YamlFormatterDefinition(),
    new TextFormatterDefinition(),
  ],
  field: new Def({
    stirng: new StringFieldCodec(),
    asset: new AssetFieldCodec(rootDir),
    map: new MapField(),
    boolean: new BooleanFieldCodec(),
    number: new NumberFieldCodec(),
    instance: new InstanceField(),
    list: new ListField(),
    markdown: new MarkdownCodec(),
    reference: new PathReferenceFieldCodec(rootDir),
    datetime: new DatetimeFieldCodec(),
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
  ],
  storage,
  assets: [
    {
      indexer: { type: "fs", options: { pattern: "/content/posts/**/*.png" } },
    },
  ],
} satisfies Config;
