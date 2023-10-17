CREATE SCHEMA "gss";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ss_ciphers" AS ENUM('aes-128-gcm', 'aes-256-gcm', 'chacha20-ietf-poly1305');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gss"."nodes" (
	"key" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) DEFAULT '' NOT NULL,
	"hostname" varchar(256) DEFAULT '' NOT NULL,
	"port" integer DEFAULT 0 NOT NULL,
	"tags" varchar(256)[] DEFAULT '{}',
	"priority" integer DEFAULT 100,
	"shared_key" varchar(256) DEFAULT '' NOT NULL,
	"method" "ss_ciphers" DEFAULT 'aes-128-gcm',
	"udp" boolean DEFAULT false,
	"disabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hostname_idx" ON "gss"."nodes" ("hostname");