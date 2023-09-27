/**
 * Generated
 **/
import type { MigrationMeta } from "drizzle-orm/migrator";

// prettier-ignore
export const migrations: MigrationMeta[] = [
  {
    sql: [
      'CREATE TABLE `nodes` (\n' +
        '\t`key` text PRIMARY KEY NOT NULL,\n' +
        "\t`title` text DEFAULT '' NOT NULL,\n" +
        "\t`hostname` text DEFAULT '' NOT NULL,\n" +
        '\t`port` integer DEFAULT 0 NOT NULL,\n' +
        "\t`tags` text DEFAULT '',\n" +
        '\t`priority` integer DEFAULT 100,\n' +
        "\t`shared_key` text DEFAULT '' NOT NULL,\n" +
        "\t`method` text DEFAULT 'aes-128-gcm',\n" +
        '\t`udp` integer DEFAULT false,\n' +
        '\t`disabled` integer DEFAULT false,\n' +
        '\t`created_at` integer DEFAULT CURRENT_TIMESTAMP,\n' +
        '\t`updated_at` integer DEFAULT CURRENT_TIMESTAMP\n' +
        ');'
    ],
    bps: true,
    folderMillis: 1695801520556,
    hash: 'bf7ccbd8e56af49ce1d5008a4241dd26adb5a18d634307a39a5e39d0527490de'
  }
];
