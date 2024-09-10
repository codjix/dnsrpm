import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./database/schema.ts",
  out: "./data/drizzle",
  dbCredentials: {
    url: "./data/sqlite.db",
  },
});
