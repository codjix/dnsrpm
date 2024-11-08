import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: { url: "file:./data/sqlite.db" },
  schema: "./database/schema.ts",
  out: "./data/drizzle",
});
