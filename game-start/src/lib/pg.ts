import { sql } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { FullSchema } from "../db/schema";

export function isPgTable<T extends TableConfig>(item: any): item is PgTableWithColumns<T> {
  return Boolean(item?.constructor?.Symbol?.Columns);
}
export function getPgTableMeta(item: PgTableWithColumns<any>) {
  const v = item as any;
  const { Name, Schema, OriginalName, BaseName, Columns } = v.constructor.Symbol as Record<
    string,
    symbol
  >;
  return {
    Name: v[Name] as string,
    Schema: v[Schema] as string,
    OriginalName: v[OriginalName] as string,
    BaseName: v[BaseName] as string,
    Columns: v[Columns] as any[],
  };
}

export async function createOnUpdateAt(db: NodePgDatabase<FullSchema>, schema: FullSchema) {
  const functions = new Set<string>();
  const triggers = new Set<string>();

  for (const [, s] of Object.entries(schema)) {
    if (!isPgTable(s)) {
      continue;
    }
    const meta = getPgTableMeta(s);
    const fn = `${meta.Schema}.on_records_update`;
    const tr = `update_updated_at_on_${meta.Name}`;
    const tbl = `${meta.Schema}.${meta.OriginalName}`;
    functions.add(`CREATE OR REPLACE FUNCTION ${fn}()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql'`);
    triggers.add(
      `CREATE OR REPLACE TRIGGER ${tr} BEFORE UPDATE ON ${tbl} FOR EACH ROW EXECUTE PROCEDURE ${fn}()`
    );
  }

  await db.transaction(async (tx) => {
    for (const fn of functions) {
      await tx.execute(sql.raw(fn));
    }
    for (const tr of triggers) {
      await tx.execute(sql.raw(tr));
    }
  });
}
