import { validate } from "./util.ts";
import { tinaLockToValidationDefinitions } from "./type.ts";
import { join, toFileUrl } from "@std/path";
import { loadTinaLock } from "@miyauci/tina-lock";

if (import.meta.main) {
  const rootDir = Deno.cwd();
  const absolutePath = join(rootDir, "tina", "tina-lock.json");
  const url = toFileUrl(absolutePath);

  // deno-lint-ignore no-top-level-await
  const tinaLock = await loadTinaLock(url);

  const definitions = tinaLockToValidationDefinitions(
    tinaLock,
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
