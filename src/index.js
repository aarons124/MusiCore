import { MusiCore } from "./base/Client.js";
const client = new MusiCore();

(async () => {
  await client.start()
})().catch(() => {});