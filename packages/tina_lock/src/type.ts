import type { Collection } from "tinacms";

export interface TinaLock {
  schema: {
    version: {
      fullVersion: string;
      major: string;
      minor: string;
      patch: string;
    };
    meta: {
      flags: string[];
    };
    collections: Collection[];
    config: {
      media: {
        tina: {
          publicFolder: string;
          mediaRoot: string;
        };
      };
    };
  };
}
