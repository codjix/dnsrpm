import { MainCols } from "#db/schema";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  ...MainCols,
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  role: text("role", { enum: ["admin", "user"] })
    .notNull()
    .default("user"),
  avatar: text("avatar"),
  password: text("password").notNull(),
  token: text("token"),
});
