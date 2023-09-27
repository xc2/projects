import { DrizzleD1DB } from "./drizzle-d1";
import { ProxyNode } from "../types";
import { NodeTypeEnum } from "surgio/build/types";
import { nodes } from "../db/schema";
import { eq } from "drizzle-orm";
import { sortBy } from "lodash";

export class NodeService {
  constructor(private readonly db: DrizzleD1DB) {}
  async getAllNodes(): Promise<
    Extract<ProxyNode, { type: NodeTypeEnum.Shadowsocks }>[]
  > {
    const all = await this.db
      .select()
      .from(nodes)
      .where(eq(nodes.disabled, false))
      .all();
    return sortBy(all, [
      (node) => (node.priority === 0 ? 0 : node.priority || 100),
    ]).map((node) => {
      return {
        type: NodeTypeEnum.Shadowsocks,
        nodeName: node.title,
        hostname: node.hostname,
        port: node.port,
        method: node.method,
        udp: node.udp,
        password: node.sharedKey,
      };
    });
  }
}
