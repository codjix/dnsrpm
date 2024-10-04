import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const MainCols = {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  created: text("created").default(new Date().toUTCString()),
  updated: text("updated")
    .notNull()
    .default(new Date().toUTCString()),
};

export const settings = sqliteTable("settings", {
  ...MainCols,
  value: text("value", { mode: "json" }).notNull(),
  key: text("key").unique().notNull(),
});