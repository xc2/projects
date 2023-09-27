import { createRemoteJWKSet, JWTPayload, jwtVerify } from "jose";

export interface CloudflareJWTPayload extends JWTPayload {
  email: string;
  type: string;
  identity_nonce: string;
  country: string;
}
export class CloudflareAccess {
  JWKS: ReturnType<typeof createRemoteJWKSet>;
  constructor(team: string) {
    this.JWKS = createRemoteJWKSet(
      new URL(`https://${team}.cloudflareaccess.com/cdn-cgi/access/certs`),
    );
  }
  async VerifyJWT(jwt: string, audience: string) {
    const { payload } = await jwtVerify(jwt, this.JWKS, { audience });
    return payload as CloudflareJWTPayload;
  }
}
