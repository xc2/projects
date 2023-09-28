import { Hono } from "hono";
import { CloudflareAccess, DrizzleD1DB, NodeService } from "./lib";
import { migrations } from "./db/migrations";
import { AuthMiddleware } from "./middlewares/auth";
import { getClashConfig } from "./render";
import { stringify } from "yaml";
import { FullSchema } from "./db/schema";

declare global {
  interface Env {
    db: DrizzleD1DB<FullSchema>;
    Node: NodeService;
    app: Hono<{ Bindings: Env }>;
    CloudflareAccess: CloudflareAccess;
  }
}

export const app = new Hono<{ Bindings: Env; Variables: AppVars }>();

app.put("/db/migrate/", async (c) => {
  const db = c.env.db;
  await db.dialect.migrate(migrations, db.session);
  return c.text("DONE");
});

app.get("/config/:name/:key/autoupdate/", async (c) => {
  const { name, key } = c.req.param();
  const match = c.env[`AUTOUPDATE_${name}`] || "";

  if (key.toLowerCase() !== match.toLowerCase()) {
    return c.text("{}", { status: 401 });
  }
  const ua = c.req.header("user-agent");

  if (/clash/i.test(ua)) {
    const all = await c.env.Node.getAllSurgioNodes();
    return c.text(stringify(getClashConfig(all)));
  }
});

app.use("/api/*", AuthMiddleware);

app.get("/api/v1/user", (c) => {
  return c.json(c.get("CloudflareUser"));
});

app.get("/api/v1/nodes", async (c) => {
  const r = await c.env.Node.list(c.req.queries());
  return c.json(r);
});

app.get("/api/v1/nodes/:key", async (c) => {
  const r = await c.env.Node.getByPrimaryKey(c.req.param("key"));
  return c.json(r);
});

app.post("/api/v1/nodes", async (c) => {
  const r = await c.env.Node.create(await c.req.json<any>());
  return c.json(r);
});

app.patch("/api/v1/nodes/:key", async (c) => {
  const r = await c.env.Node.update(
    c.req.param("key"),
    await c.req.json<any>(),
  );
  return c.json(r);
});

app.delete("/api/v1/nodes/:key", async (c) => {
  const r = await c.env.Node.delete(c.req.param("key"));
  return c.json(r);
});