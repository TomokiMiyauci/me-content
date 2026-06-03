import { fromFileUrl, join } from "@std/path";

function createContent(token: string): string {
  return `@TomokiMiyauci:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${token}`;
}

const token = Deno.env.get("AUTH_TOKEN");

if (typeof token !== "string") throw new Error("AUTH_TOKEN is required");

if (import.meta.main) {
  const rootUrl = import.meta.resolve("../");
  const rootDir = fromFileUrl(rootUrl);
  const filePath = join(rootDir, ".npmrc");
  const content = createContent(token);

  await Deno.writeTextFile(filePath, content);
}
