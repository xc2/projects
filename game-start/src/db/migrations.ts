/**
 * Generated
 **/
import type { MigrationMeta } from "drizzle-orm/migrator";

// prettier-ignore
export const migrations: MigrationMeta[] = [
  {
    sql: [
      'DO $$ BEGIN\n' +
        ` CREATE TYPE "ciphers" AS ENUM('aes-128-gcm', 'aes-256-gcm', 'chacha20-ietf-poly1305');\n` +
        'EXCEPTION\n' +
        ' WHEN duplicate_object THEN null;\n' +
        'END $$;\n',
      '\n' +
        'CREATE TABLE IF NOT EXISTS "nodes" (\n' +
        '\t"key" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,\n' +
        `\t"title" varchar(256) DEFAULT '' NOT NULL,\n` +
        `\t"hostname" varchar(256) DEFAULT '' NOT NULL,\n` +
        '\t"port" integer DEFAULT 0 NOT NULL,\n' +
        `\t"tags" varchar(256)[] DEFAULT '{}',\n` +
        '\t"priority" integer DEFAULT 100,\n' +
        `\t"shared_key" varchar(256) DEFAULT '' NOT NULL,\n` +
        `\t"method" "ciphers" DEFAULT 'aes-128-gcm',\n` +
        '\t"udp" boolean DEFAULT false,\n' +
        '\t"disabled" boolean DEFAULT false,\n' +
        '\t"created_at" timestamp DEFAULT now() NOT NULL,\n' +
        '\t"updated_at" timestamp DEFAULT now() NOT NULL\n' +
        ');\n',
      '\nCREATE INDEX IF NOT EXISTS "hostname_idx" ON "nodes" ("hostname");'
    ],
    bps: true,
    folderMillis: 1697475318074,
    hash: '0ca5ff89260d221814f0d1070b9a52c4ee528f7a57562d4d4eda224ab534524e'
  }
];
