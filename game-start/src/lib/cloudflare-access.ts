import { createRemoteJWKSet, jwtVerify } from "jose";

export class CloudflareAccess {
  JWKS: ReturnType<typeof createRemoteJWKSet>;
  constructor(team: string) {
    this.JWKS = createRemoteJWKSet(
      new URL(`https://${team}.cloudflareaccess.com/cdn-cgi/access/certs`),
    );
  }
  VerifyJWT(jwt: string, audience: string) {
    return jwtVerify(jwt, this.JWKS, { audience });
  }
}
