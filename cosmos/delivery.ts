import type { DeliveryConfig } from "@cosmos/delivery";
import { GraphqlProtocol, SchemaBuilder } from "@cosmos/protocol-graphql";
import { RelayPlugin } from "@cosmos/protocol-graphql/relay";
import { OpenCrud } from "@cosmos/protocol-graphql/opencrud";
import { NodePlugin } from "@cosmos/protocol-graphql/node";
import config from "./config.ts";
import { Asset } from "@cosmos/delivery/asset";
import { SqliteStore } from "@cosmos/store-sqlite";
import { DatabaseSync } from "node:sqlite";
import { fromFileUrl } from "@std/path";
import { NamerPlugin } from "@miyauci/graphql-schema-transformer/namer";

const db = new DatabaseSync(
  fromFileUrl(import.meta.resolve("../content.sqlite")),
);

export default {
  protocol: new GraphqlProtocol(
    new SchemaBuilder({
      plugins: [
        new RelayPlugin(),
        new OpenCrud(),
        new NodePlugin(),
      ],
      transformers: [
        new NamerPlugin(),
      ],
    }),
  ),
  base: {
    config,
    location: new URL(import.meta.resolve("./config.ts")),
  },
  middleware: [new Asset()],
  store: new SqliteStore(db),
} satisfies DeliveryConfig;
