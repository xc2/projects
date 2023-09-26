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
        '\t`udp` integer DEFAULT false\n' +
        ');'
    ],
    bps: true,
    folderMillis: 1695749749614,
    hash: '521cb7281a2c53af97c311f1314384b81bc7a72502da09188d5c13027a91e4e2'
  }
];
