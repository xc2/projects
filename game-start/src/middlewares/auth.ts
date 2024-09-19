import { Context, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { CloudflareJWTPayload } from "../lib";

declare global {
  interface AppVars {
    CloudflareUser: CloudflareJWTPayload;
  }
}

function getToken(c: Context) {
  const token = c.req.header("Cf-Access-Jwt-Assertion");
  if (token) {
    return token;
  }

  const cookie = getCookie(c);
  return cookie.CF_Authorization;
}

export const AuthMiddleware: MiddlewareHandler<{
  Bindings: Env;
  Variables: AppVars;
}> = async function AuthMiddleware(c, next) {
  const env = c.env,
    req = c.req;
  const token = getToken(c);

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
    const payload = await env.CloudflareAccess.VerifyJWT(token, env.CLOUDFLARE_APP_AUD);
    c.set("CloudflareUser", payload);
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
