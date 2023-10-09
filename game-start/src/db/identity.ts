import { customType } from "drizzle-orm/pg-core";

export const identity = (name: string) =>
  customType<{
    data: number;
    notNull: true;
    default: true;
  }>({
    dataType() {
      return "INTEGER GENERATED ALWAYS AS IDENTITY";
    },
  })(name);
