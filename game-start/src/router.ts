import { Router, text } from "itty-router";
import { WorkerRouter } from "./types";
import yaml from "yaml";
import { getClashConfig } from "./render";
import { migrations } from "./db/migrations";

const router = Router() as WorkerRouter;

router.put("/db/migrate", async (request, env, context) => {
  const db = context.db;
  console.log(migrations);
  await db.dialect.migrate(migrations, db.session);
  return text("DONE");
});

router.get("/config/:name/:key/autoupdate/", (request, env, context) => {
  const { name, key } = request.params;
  const match = env["AUTOUPDATE_" + name] || "";
  if (key.toLowerCase() !== match.toLowerCase()) {
    return text("{}", { status: 401 });
  }
  const ua = request.headers.get("user-agent");

  if (/clash/i.test(ua)) {
    return text(yaml.stringify(getClashConfig([])));
  }
});

router.all("*", () => new Response("Not Found.", { status: 404 }));

export default router;
