/**
 * Generated
 **/
import type { MigrationMeta } from "drizzle-orm/migrator";

// prettier-ignore
export const migrations: MigrationMeta[] = [
  {
    sql: [
      'CREATE SCHEMA "gss";\n',
      "\n" +
        "DO $$ BEGIN\n" +
        ` CREATE TYPE "ss_ciphers" AS ENUM('aes-128-gcm', 'aes-256-gcm', 'chacha20-ietf-poly1305');\n` +
        "EXCEPTION\n" +
        " WHEN duplicate_object THEN null;\n" +
        "END $$;\n",
      "\n" +
        'CREATE TABLE IF NOT EXISTS "gss"."nodes" (\n' +
        '\t"key" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,\n' +
        `\t"title" varchar(256) DEFAULT '' NOT NULL,\n` +
        `\t"hostname" varchar(256) DEFAULT '' NOT NULL,\n` +
        '\t"port" integer DEFAULT 0 NOT NULL,\n' +
        `\t"tags" varchar(256)[] DEFAULT '{}',\n` +
        '\t"priority" integer DEFAULT 100,\n' +
        `\t"shared_key" varchar(256) DEFAULT '' NOT NULL,\n` +
        `\t"method" "ss_ciphers" DEFAULT 'aes-128-gcm',\n` +
        '\t"udp" boolean DEFAULT false,\n' +
        '\t"disabled" boolean DEFAULT false,\n' +
        '\t"created_at" timestamp DEFAULT now() NOT NULL,\n' +
        '\t"updated_at" timestamp DEFAULT now() NOT NULL\n' +
        ");\n",
      "\n" + 'CREATE INDEX IF NOT EXISTS "hostname_idx" ON "gss"."nodes" ("hostname");',
    ],
    bps: true,
    folderMillis: 1697554043189,
    hash: "cea3024501e3e91a38e603f0c275b0b3fb0b809ab8b49340bc7436c4762ef5ea",
  },
];
