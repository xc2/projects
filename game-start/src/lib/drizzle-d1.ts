import { D1Transaction, drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { SQLiteAsyncDialect, SQLiteSession } from "drizzle-orm/sqlite-core";
import type { ExtractTablesWithRelations, DrizzleConfig } from "drizzle-orm";

function proxySession<T extends SQLiteSession<"async", unknown, any, any>>(
  session: T,
): T {
  const s = Object.create(session);
  s.transaction = async function transaction(transaction: any, config?: any) {
    const tx = new D1Transaction("async", this.dialect, this, this.schema);
    return await transaction(tx);
  };
  return s;
}

export interface DrizzleD1DB<
  TFullSchema extends Record<string, unknown> = Record<string, never>,
> extends DrizzleD1Database<TFullSchema> {
  dialect: SQLiteAsyncDialect;

  session: SQLiteSession<
    "async",
    D1Result,
    TFullSchema,
    ExtractTablesWithRelations<TFullSchema>
  >;
}
export function createDrizzleD1<
  TSchema extends Record<string, unknown> = Record<string, never>,
>(db: D1Database, config?: DrizzleConfig<TSchema>): DrizzleD1DB<TSchema> {
  const _db = drizzle(db, config) as DrizzleD1DB<TSchema>;
  _db.session = proxySession(_db.session);
  return _db;
}
