import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const nodes = sqliteTable("nodes", {
  key: text("key").primaryKey(),
  title: text("name").notNull(),
  hostname: text("hostname").notNull(),
  port: integer("port").notNull(),
  tags: text("tags"),
  priority: integer("priority"),
});
