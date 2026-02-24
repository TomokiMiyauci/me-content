import type {
  ReferenceDefinition,
  Source,
  ValidationDefinition,
} from "./type.ts";
import { existsSync, expandGlob } from "@std/fs";
import matter from "gray-matter";
import ajv from "ajv";
import { join } from "@std/path";

export async function* validate(
  defifinitions: ValidationDefinition[],
  options: { exclude?: string[]; rootDir: string },
): AsyncIterable<Error> {
  for (const definition of defifinitions) {
    for (const pattern of definition.source.patterns) {
      const iterator = expandGlob(pattern, { "exclude": options?.exclude });

      for await (const entry of iterator) {
        if (entry.isFile) {
          const content = await Deno.readTextFile(entry.path);
          const object = convertTo(content, definition.source);

          const c = new ajv.Ajv();

          c.addKeyword({
            keyword: "reference",
            async: false,
            validate: (schema: ReferenceDefinition, data: string): boolean => {
              switch (schema.type) {
                case "internal": {
                  const pathname = join(options.rootDir, schema.base, data);

                  return existsSync(pathname);
                }
                case "external": {
                  throw new Error();
                }
              }
            },
            errors: true,
          });

          const valid = c.validate(definition.schema, object);

          if (!valid) {
            yield new Error(entry.path);
          }
        }
      }
    }
  }
}

function convertTo(content: string, source: Source): object {
  switch (source.format) {
    case "markdown": {
      const { data, content: body } = matter(content);

      return {
        ...data,
        body,
      };
    }
    case "json": {
      return JSON.parse(content);
    }
    case "yaml": {
      throw new Error("unimplemented");
    }
  }
}
