import { IRequest, Router, json as asJson, status as asStatus, text as asText } from "itty-router";
import { getFirewallListScript } from "./firewall";
import { getCIDRList } from "./gist";

// now let's create a router (note the lack of "new")
const router = Router<Request & IRequest>();

// POST to the collection (we'll use async here)
router.get("/ip/firewall/list", async (request) => {
  const name = request.query.name;
  if (!name || typeof name !== "string") return asStatus(400);
  const list = await getCIDRList(name);

  return asText(
    getFirewallListScript({
      name,
      listName: typeof request.query.list === "string" ? request.query.list : undefined,
      force: request.query.force === "true",
      list,
    })
  );
});

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

export default router;
