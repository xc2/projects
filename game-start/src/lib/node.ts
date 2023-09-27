import { DrizzleD1DB } from "./drizzle-d1";
import { ProxyNode } from "./types";
import { NodeTypeEnum } from "surgio/build/types";
import { nodes } from "../db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { sortBy } from "lodash";
import { createPaginationQuery, PaginationParam } from "./pagination";

export class NodeService {
  pagination = createPaginationQuery();
  constructor(private readonly db: DrizzleD1DB<{ nodes: typeof nodes }>) {}

  async getNodes(pagination?: PaginationParam) {
    const [{ count }] = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(nodes);
    const p = this.pagination(pagination, count);

    const r = await this.db
      .select()
      .from(nodes)
      .orderBy(desc(nodes.createdAt))
      .offset(p.cursor)
      .limit(p.limit);
    return { pagination: p, nodes: r };
  }

  async getAllSurgioNodes(): Promise<
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
