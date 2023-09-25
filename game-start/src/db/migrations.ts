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
        '\t`name` text NOT NULL,\n' +
        '\t`hostname` text NOT NULL,\n' +
        '\t`port` integer NOT NULL,\n' +
        '\t`tags` text,\n' +
        '\t`priority` integer\n' +
        ');\n'
    ],
    bps: true,
    folderMillis: 1695640179538,
    hash: '930203d6aece811e234357f5a53f51dcff67c5aecdff2876cf4adc286ddf8ab4'
  }
];
