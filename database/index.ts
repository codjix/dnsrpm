import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = "file:./data/sqlite.db";
const client = createClient({ url });
const db = drizzle(client, { schema });

export { db, schema };
