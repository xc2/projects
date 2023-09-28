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
        "\t`created_at` datetime DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),\n" +
        "\t`updated_at` datetime DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))\n" +
        ');'
    ],
    bps: true,
    folderMillis: 1695882150091,
    hash: '2b59566325e0b52a32a5b50dc9d7b63bef81511e2956067246efb0c4911b062a'
  }
];
