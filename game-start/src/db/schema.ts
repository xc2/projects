import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { identity } from "./identity";

export const ciphersEnum = pgEnum("ciphers", [
  "aes-128-gcm",
  "aes-256-gcm",
  "chacha20-ietf-poly1305",
]);

export const nodes = pgTable("nodes", {
  key: identity("key").primaryKey(),
  title: varchar("title", { length: 256 }).notNull().default(""),
  hostname: varchar("hostname", { length: 256 }).notNull().default(""),
  port: integer("port").notNull().default(0),
  tags: varchar("tags", { length: 256 }).array().default([]),
  priority: integer("priority").default(100),
  sharedKey: varchar("shared_key", { length: 256 }).notNull().default(""),
  method: ciphersEnum("method").default("aes-128-gcm"),
  udp: boolean("udp").default(false),
  disabled: boolean("disabled").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type nodes = typeof nodes;

export type NodesInsert = InferInsertModel<nodes>;
export type Nodes = InferSelectModel<nodes>;

export type FullSchema = {
  nodes: nodes;
};
