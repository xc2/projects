import {
  D1Transaction,
  drizzle,
  DrizzleD1Database,
  SQLiteD1Session,
} from "drizzle-orm/d1";
import type { MigrationMeta } from "drizzle-orm/migrator";

function proxySession<T extends SQLiteD1Session<any, any>>(session: T): T {
  const s = Object.create(session);
  s.transaction = async function transaction(transaction: any, config?: any) {
    const tx = new D1Transaction("async", this.dialect, this, this.schema);
    return await transaction(tx);
  };
  return s;
}

export default class Procedures {
  db: DrizzleD1Database;
  constructor(public readonly d1: D1Database) {
    this.db = drizzle(d1);
  }
  async migrate(migrations: MigrationMeta[]) {
    const db = this.db as any;
    try {
      const migrated = await db.dialect.migrate(
        migrations,
        proxySession(db.session),
      );
      console.log("migration done", migrated);
    } catch (e) {
      console.error("migration error");
      console.error(e.message);
      console.error(e.stack);
      console.error(e.cause);
    }
  }
}
