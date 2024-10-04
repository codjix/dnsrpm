import { db } from "./index";

db.query.proxyStacks.findMany().then(console.log);
