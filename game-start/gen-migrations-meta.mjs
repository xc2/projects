import { writeFileSync } from "node:fs";
import * as Path from "node:path";
import { inspect } from "node:util";
import { readMigrationFiles } from "drizzle-orm/migrator";

function resolvePath(target) {
  const dirname = Path.dirname(new URL(import.meta.url).pathname);
  return Path.resolve(dirname, target);
}

const r = readMigrationFiles({
  migrationsFolder: resolvePath("./migrations"),
});

// for (const record of r) {
//   record.sql = record.sql
//     .map((line) => {
//       line = line.replace(/^\n+/, "").replace(/\n+$/, "");
//       if (line.startsWith("/*") && line.endsWith("*/")) {
//         return "";
//       }
//       return line;
//     })
//     .filter(Boolean);
// }

const ts =
  `
/**
 * Generated
 **/
import type { MigrationMeta } from "drizzle-orm/migrator";

// biome-ignore format: generated
export const migrations: MigrationMeta[] = ${inspect(r)};
`.trim() + "\n";

writeFileSync(resolvePath("./src/db/migrations.ts"), ts, "utf8");
