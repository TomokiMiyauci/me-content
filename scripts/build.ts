import { Indexer } from "@cosmos/indexer";
import { SqliteStore } from "@cosmos/store-sqlite";
import config from "../cosmos/config.ts";
import { DatabaseSync } from "node:sqlite";
import { fromFileUrl, join } from "@std/path";

const rootUrl = import.meta.resolve("../");
const rootDir = fromFileUrl(rootUrl);
const dbPath = join(rootDir, "content.sqlite");

const db = new DatabaseSync(dbPath);
const store = new SqliteStore(db);
const indexer = new Indexer(
  config,
  new URL(import.meta.resolve("../cosmos/config.ts")),
);

const result = await indexer.index(store);
const manifest = JSON.stringify(result.manifest, null, 2);

await Deno.writeTextFile("./manifest.json", manifest);
