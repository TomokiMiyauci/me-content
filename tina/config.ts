import { defineConfig } from "tinacms";
import collections from "./collection.ts";

const clientId = Deno.env.get("TINA_CLIENT_ID");
const token = Deno.env.get("TINA_TOKEN");

export default defineConfig({
  branch: "main",
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
      publicFolder: "media",
      mediaRoot: "./",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "./", // within the public folder
  },
  schema: { collections },
});
