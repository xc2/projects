import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgSchema,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const root = pgSchema("gss");

export const ciphersEnum = pgEnum("ss_ciphers", [
  "aes-128-gcm",
  "aes-256-gcm",
  "chacha20-ietf-poly1305",
]);

export const nodes = root.table(
  "nodes",
  {
    key: uuid("key").primaryKey().defaultRandom(),
    title: varchar("title", { length: 256 }).notNull().default(""),
    hostname: varchar("hostname", { length: 256 }).notNull().default(""),
    port: integer("port").notNull().default(0),
    tags: varchar("tags", { length: 256 }).array().default(sql`'{}'`),
    priority: integer("priority").default(100),
    sharedKey: varchar("shared_key", { length: 256 }).notNull().default(""),
    method: ciphersEnum("method").default("aes-128-gcm"),
    udp: boolean("udp").default(false),
    disabled: boolean("disabled").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => {
    return { hostnameIdx: index("hostname_idx").on(table.hostname) };
  }
);

export type nodes = typeof nodes;

export type NodesInsert = InferInsertModel<nodes>;
export type Nodes = InferSelectModel<nodes>;

export type FullSchema = {
  nodes: nodes;
};
