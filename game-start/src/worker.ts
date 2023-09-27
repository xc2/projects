/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { CloudflareAccess, createDrizzleD1, NodeService } from "./lib";
import { app } from "./app";
import * as schema from "./db/schema";

// Export a default object containing event handlers
export default {
  // The fetch handler is invoked when this worker receives a HTTP(S) request
  // and should return a Response (optionally wrapped in a Promise)
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const db = createDrizzleD1(env.DB, { schema });
    const node = new NodeService(db);

    env.db = db;
    env.Node = node;
    env.CloudflareAccess = new CloudflareAccess(env.CLOUDFLARE_ACCESS_TEAM);
    return app.fetch(request, env, ctx);
  },
};
