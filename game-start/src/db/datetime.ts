import { sql } from "drizzle-orm";
import { customType } from "drizzle-orm/pg-core";

export const datetime = customType<{ data: Date; driverData: string }>({
  dataType() {
    return `datetime`;
  },
  fromDriver(value: string | null): Date | null {
    if (!value) {
      return null;
    }
    const d = new Date(value);
    return d.getTime() ? d : null;
  },
  toDriver(value: Date | number | string): string | null {
    if (value === null || value === undefined || value === "") {
      return null;
    }
    const d = new Date(value);

    return d.getTime() ? d.toISOString() : null;
  },
});

export function now() {
  return sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`;
}
