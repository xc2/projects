import { drizzle } from "drizzle-orm/node-postgres";
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Pool } from "pg";

import { app } from "./app";
import * as schema from "./db/schema";
import { CloudflareAccess, NodeService } from "./lib";

// Export a default object containing event handlers
export default {
  // The fetch handler is invoked when this worker receives a HTTP(S) request
  // and should return a Response (optionally wrapped in a Promise)
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const pool = new Pool({ connectionString: env.PG_URL });
    const db = drizzle(pool, { schema });
    const node = new NodeService(db);

    env.db = db;
    env.Node = node;
    env.CloudflareAccess = new CloudflareAccess(env.CLOUDFLARE_ACCESS_TEAM);
    return app.fetch(request, env, ctx);
  },
};
