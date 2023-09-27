import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const nodes = sqliteTable("nodes", {
  key: text("key").primaryKey(),
  title: text("title").notNull().default(""),
  hostname: text("hostname").notNull().default(""),
  port: integer("port").notNull().default(0),
  tags: text("tags").default(""),
  priority: integer("priority").default(100),
  sharedKey: text("shared_key").notNull().default(""),
  method: text("method", {
    enum: ["aes-128-gcm", "aes-256-gcm", "chacha20-ietf-poly1305"],
  }).default("aes-128-gcm"),
  udp: integer("udp", { mode: "boolean" }).default(false),
  disabled: integer("disabled", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});
