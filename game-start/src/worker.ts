/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import apiRouter from "./router";
import { createDrizzleD1, DrizzleD1DB, NodeService } from "./lib";

declare global {
  interface ExecutionContext {
    db: DrizzleD1DB;
    Node: NodeService;
  }
}

// Export a default object containing event handlers
export default {
  // The fetch handler is invoked when this worker receives a HTTP(S) request
  // and should return a Response (optionally wrapped in a Promise)
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const db = createDrizzleD1(env.DB);
    const node = new NodeService(db);

    ctx.db = db;
    ctx.Node = node;
    return apiRouter.handle(request, env, ctx);
  },
};
