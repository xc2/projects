import { desc, eq, sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { sortBy } from "lodash";
import { NodeTypeEnum } from "surgio/build/types";
import { NodesInsert, nodes } from "../db/schema";
import { PaginationParam, createPaginationQuery } from "./pagination";
import { ShadowsocksNode } from "./types";

export class NodeService {
  private pagination = createPaginationQuery();
  constructor(private readonly db: NodePgDatabase<{ nodes: nodes }>) {}

  async list(pagination?: PaginationParam) {
    const [{ count }] = await this.db.select({ count: sql<number>`count(*)` }).from(nodes);
    const p = this.pagination(pagination, count);

    const r = await this.db
      .select()
      .from(nodes)
      .orderBy(desc(nodes.createdAt))
      .offset(p.cursor)
      .limit(p.limit);
    return { pagination: p, nodes: r };
  }
  async getByPrimaryKey(key: string) {
    return this.db.query.nodes.findFirst({ where: eq(nodes.key, key) });
  }

  async create({ key: _, createdAt, updatedAt, ...node }: NodesInsert) {
    const model = { ...node };
    const [r] = await this.db.insert(nodes).values(model).returning();
    return r;
  }

  async update(key: string, { key: _, createdAt, updatedAt, ...node }: NodesInsert) {
    const set = { ...node, updatedAt: new Date() };
    const [r] = await this.db.update(nodes).set(set).where(eq(nodes.key, key)).returning();
    return r;
  }

  async delete(key: string) {
    const [r] = await this.db.delete(nodes).where(eq(nodes.key, key)).returning();
    return r;
  }

  async getAllSurgioNodes(): Promise<ShadowsocksNode[]> {
    const all = await this.db.select().from(nodes).where(eq(nodes.disabled, false));
    return sortBy(all, [(node) => (node.priority === 0 ? 0 : node.priority || 100)]).map((node) => {
      return {
        key: `${node.key}`,
        type: NodeTypeEnum.Shadowsocks,
        nodeName: node.title,
        hostname: node.hostname,
        port: node.port,
        method: node.method,
        udpRelay: node.udp,
        password: node.sharedKey,
      } satisfies ShadowsocksNode;
    });
  }
}
