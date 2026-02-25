// deno-lint-ignore-file no-process-global
import "./lib/i18next.ts";
import { defineConfig } from "tinacms";
import schema from "./schema.ts";

const clientId = process.env["TINA_CLIENT_ID"];
const token = process.env["TINA_TOKEN"];
const branch = process.env["TINA_BRANCH"];
const indexerToken = process.env["TINA_SEARCH_TOKEN"];

export default defineConfig({
  branch,
  clientId,
  token,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "content",
      mediaRoot: "",
    },
  },
  build: {
    publicFolder: "dist", // The public asset folder for your framework
    outputFolder: "./", // within the public folder
  },
  search: {
    tina: { indexerToken },
  },
  schema,
  client: { skip: true },
  ui: {
    regexValidation: {
      folderNameRegex: "^[a-z0-9_]+$",
    },
  },
});
