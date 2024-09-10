import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

const sqlite = new Database("./data/sqlite.db");
const db = drizzle(sqlite, { schema });

export { db, schema };
