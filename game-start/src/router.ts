import { Router, text } from "itty-router";
import { WorkerRouter } from "./types";
import yaml from "yaml";
import { getClashConfig } from "./render";

const router = Router() as WorkerRouter;

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
