import {
  type ReferenceDefinition,
  type Source,
  type TinaLock,
  tinaLockToValidationDefinitions,
  type ValidationDefinition,
} from "./schema.ts";
import tinaLock from "../tina/tina-lock.json" with { type: "json" };
import { existsSync, expandGlob } from "@std/fs";
import matter from "gray-matter";
import ajv from "ajv";
import { join, resolve } from "@std/path";

async function* validate(
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

if (import.meta.main) {
  const dirname = import.meta.dirname;

  if (!dirname) {
    throw new Error("dirname is not defined");
  }

  const rootDir = resolve(dirname, "..");

  const definitions = tinaLockToValidationDefinitions(
    tinaLock as TinaLock,
    rootDir,
  );
  const result = validate(definitions, {
    exclude: ["**/.gitkeep.*"],
    rootDir: rootDir,
  });

  // deno-lint-ignore no-top-level-await
  const errors = await Array.fromAsync(result);

  if (errors.length) {
    throw new AggregateError(errors);
  } else {
    console.info("Ok");
  }
}
