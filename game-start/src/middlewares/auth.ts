import { HTTPException } from "hono/http-exception";
import { CloudflareJWTPayload } from "../lib";
import { MiddlewareHandler } from "hono";

declare global {
  interface AppVars {
    CloudflareUser: CloudflareJWTPayload;
  }
}

export const AuthMiddleware: MiddlewareHandler<{
  Bindings: Env;
  Variables: AppVars;
}> = async function AuthMiddleware({ req, set, env }, next) {
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
};
