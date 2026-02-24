import type { TinaLock } from "./type.ts";
import { fromFileUrl } from "@std/path";

export async function loadTinaLock(url: URL): Promise<TinaLock> {
  if (url.protocol === "file:") {
    const path = fromFileUrl(url);

    const content = await Deno.readTextFile(path);

    return parseTinaLock(content);
  }

  throw new Error("unimplemented");
}

function parseTinaLock(content: string): TinaLock {
  return JSON.parse(content);
}

export type { TinaLock } from "./type.ts";
