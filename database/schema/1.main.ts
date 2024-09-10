import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const MainCols = {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
  updated: text("updated")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
};

export const settings = sqliteTable("settings", {
  ...MainCols,
  value: text("value", { mode: "json" }).notNull(),
  key: text("key").unique().notNull(),
});
