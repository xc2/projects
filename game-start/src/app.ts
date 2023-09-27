import { Hono } from "hono";
import { CloudflareAccess, DrizzleD1DB, NodeService } from "./lib";
import { migrations } from "./db/migrations";
import yaml from "yaml";
import { getClashConfig } from "./render";
import { HTTPException } from "hono/http-exception";
import type { JWTVerifyResult } from "jose";

declare global {
  interface Env {
    db: DrizzleD1DB;
    Node: NodeService;
    app: Hono<{ Bindings: Env }>;
    CloudflareAccess: CloudflareAccess;
    [key: `AUTOUPDATE_${string}`]: string;
  }
}
type AppVars = {
  CloudflareUser: JWTVerifyResult;
};
export const app = new Hono<{ Bindings: Env; Variables: AppVars }>();

app.put("/db/migrate", async ({ text, env: { db } }) => {
  await db.dialect.migrate(migrations, db.session);
  return text("DONE");
});

app.get("/config/:name/:key/autoupdate/", async ({ text, req, env }) => {
  const { name, key } = req.param();
  const match = env[`AUTOUPDATE_${name}`] || "";

  if (key.toLowerCase() !== match.toLowerCase()) {
    return text("{}", { status: 401 });
  }
  const ua = req.header("user-agent");

  if (/clash/i.test(ua)) {
    const all = await env.Node.getAllNodes();
    return text(yaml.stringify(getClashConfig(all)));
  }
});

app.use("/api/*", async ({ req, set, env }, next) => {
  const token = req.header("Cf-Access-Jwt-Assertion");

  if (!token) {
    const res = new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Bearer realm="${req.url}",error="invalid_request",error_description="no token found in request"`,
      },
    });
    throw new HTTPException(401, { res });
  }
  try {
    const payload = await env.CloudflareAccess.VerifyJWT(
      token,
      env.CLOUDFLARE_APP_AUD,
    );
    set("CloudflareUser", payload);
  } catch (e) {
    const res = new Response("Unauthorized", {
      status: 401,
      statusText: e.message,
      headers: {
        "WWW-Authenticate": `Bearer realm="${req.url}",error="invalid_token",error_description="token verification failure"`,
      },
    });
    throw new HTTPException(401, { res });
  }

  await next();
});

app.get("/api/v1/user", ({ get, json }) => {
  return json(get("CloudflareUser"));
});
