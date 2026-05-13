import { createDelivery } from "@cosmos/delivery";
import deliveryConfig from "./cosmos/delivery.ts";

const handle = await createDelivery(deliveryConfig);

export default {
  fetch(req): Promise<Response> | Response {
    return handle(req);
  },
} satisfies Deno.ServeDefaultExport;
