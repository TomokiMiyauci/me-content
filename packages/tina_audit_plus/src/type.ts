// deno-lint-ignore-file no-explicit-any
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import type { Collection, TinaField } from "tinacms";
import type { ContentFormat } from "@tinacms/schema-tools";
import { join } from "@std/path";
import type { TinaLock } from "@miyauci/tina-lock";

export type Source =
  | {
    format: "markdown";
    patterns: string[];
    bodyKey?: string;
  }
  | {
    format: "json" | "yaml";
    patterns: string[];
  };

export interface ValidationDefinition {
  schema: JSONSchema7;
  source: Source;
}

export function tinaLockToValidationDefinitions(
  tinaLock: TinaLock,
  rootDir: string,
): ValidationDefinition[] {
  const { collections, config } = tinaLock.schema;

  const mediaRoot = join(
    config.media.tina.publicFolder,
    config.media.tina.mediaRoot,
  );

  return collections.map((collection) =>
    collectionToValidationDefinition(collection, mediaRoot)
  ).map((def) => {
    return {
      source: {
        ...def.source,
        patterns: def.source.patterns.map((value) => join(rootDir, value)),
      },
      schema: def.schema,
    };
  });
}

function collectionToValidationDefinition(
  collection: Collection,
  mediaRoot: string,
): ValidationDefinition {
  const { fields = [], path, format } = collection;
  const source = pathToSource(path, format ?? "md");
  const schema = toSchema(fields, mediaRoot);

  return { source, schema };
}

function toSchema(fields: TinaField[], mediaRoot: string): JSONSchema7 {
  const properties = fieldsToProperties(fields, mediaRoot);
  const required = fields.filter((field) => field.required).map((field) =>
    field.name
  );

  return {
    type: "object",
    properties,
    required,
  };
}

function pathToSource(
  path: string,
  contentFormat: ContentFormat,
): Source {
  const ext = formatToExt(contentFormat);
  const pattern = join(path, "**", "*" + ext);
  const patterns = [pattern];

  switch (contentFormat) {
    case "markdown":
    case "mdx":
    case "md": {
      return {
        patterns,
        format: "markdown",
      };
    }
    case "json": {
      return {
        patterns,
        format: "json",
      };
    }
    case "yaml":
    case "yml":
    case "toml": {
      return {
        patterns,
        format: "yaml",
      };
    }
  }
}

function formatToExt(format: ContentFormat): `.${string}` {
  switch (format) {
    case "md":
    case "markdown": {
      return ".md";
    }
    case "mdx": {
      return ".mdx";
    }
    case "json": {
      return ".json";
    }
    case "yaml": {
      return ".yaml";
    }
    case "yml": {
      return ".yml";
    }
    case "toml": {
      return ".toml";
    }
  }
}

function fieldsToProperties(
  fields: TinaField[],
  mediaRoot: string,
): JSONSchema7["properties"] {
  return fields.reduce((acc, cur) => {
    const value = tinaFieldToDefinition(cur, mediaRoot);

    return {
      ...acc,
      [cur.name]: value,
    };
  }, {});
}

function tinaFieldToDefinition(
  tinaField: TinaField,
  mediaRoot: string,
): JSONSchema7Definition {
  const { list } = tinaField;
  const def = typeToDefinition(tinaField, mediaRoot);

  if (list) {
    return {
      type: "array",
      items: def,
    };
  }

  return def;
}

function typeToDefinition(
  field: TinaField,
  mediaRoot: string,
): JSONSchema7Definition {
  switch (field.type) {
    case "string": {
      const enumValues = field.options?.map((option) => {
        if (typeof option === "string") return option;
        return option.value;
      });
      return {
        type: "string",
        enum: enumValues,
      };
    }
    case "number": {
      return {
        type: "number",
      };
    }
    case "boolean": {
      return {
        type: "boolean",
      };
    }
    case "rich-text": {
      return {
        type: "string",
      };
    }
    case "datetime": {
      return {
        type: "object",
      };
    }
    case "object": {
      const properties = fieldsToProperties(field.fields ?? [], mediaRoot);

      return {
        type: "object",
        properties,
      };
    }
    case "image": {
      const reference = {
        type: "internal",
        base: mediaRoot,
      } satisfies ReferenceDefinition;

      return {
        type: "string",
        reference,
      } as any;
    }
    case "reference": {
      const reference = {
        type: "internal",
        base: "",
      } satisfies ReferenceDefinition;

      return {
        type: "string",
        reference,
      } as any;
    }
    case "password": {
      return {};
    }
  }
}

export type ReferenceDefinition =
  | {
    type: "external";
  }
  | {
    type: "internal";
    base: string;
  };
