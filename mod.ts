import { Delivery } from "@cosmos/delivery";
import { Asset } from "@cosmos/delivery/asset";
import { GraphqlProtocol, SchemaBuilder } from "@cosmos/protocol-graphql";
import { RelayPlugin } from "@cosmos/protocol-graphql/relay";
import { OpenCrud } from "@cosmos/protocol-graphql/opencrud";
import { NodePlugin } from "@cosmos/protocol-graphql/node";
import manifest from "./manifest.json" with { type: "json" };
import { createDatalayer } from "@cosmos/indexer";
import { DatabaseSync } from "node:sqlite";
import { SqliteStore } from "@cosmos/store-sqlite";
import { SchemaTransformer } from "@miyauci/graphql-schema-transformer";
import { NamerPlugin } from "@miyauci/graphql-schema-transformer/namer";

const db = new DatabaseSync("./content.sqlite");
const store = new SqliteStore(db);

const datalayer = createDatalayer(store);
const builder = new SchemaBuilder({
  plugins: [new RelayPlugin(), new OpenCrud(), new NodePlugin()],
});
const schema = builder.build({
  manifest,
  datalayer,
});

const transformer = new SchemaTransformer({
  plugins: [new NamerPlugin()],
});
const finalSchema = transformer.transform(schema);

const delivery = new Delivery({
  protocol: new GraphqlProtocol(finalSchema),
  manifest,
  datalayer,
  middleware: [new Asset()],
});

export default {
  fetch(req): Promise<Response> {
    return delivery.handle(req);
  },
} satisfies Deno.ServeDefaultExport;
