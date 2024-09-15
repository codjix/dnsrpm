import { MainCols } from "#db/schema";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const proxyStacks = sqliteTable("proxy_stacks", {
  ...MainCols,
  name: text("name").unique().notNull(),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
});

export const proxyHosts = sqliteTable("proxy_hosts", {
  ...MainCols,
  domains: text("domains", { mode: "json" }).notNull().$type<string[]>(),
  targetProtocol: text("target_protocol", { enum: ["http", "https"] })
    .notNull()
    .default("http"),
  targetHost: text("target_host").notNull(),
  targetPort: integer("target_port").notNull(),
  stackId: integer("stack_id").references(() => proxyStacks.id),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  isHttps: integer("isHttps", { mode: "boolean" }).notNull().default(false),
  ws: integer("ws", { mode: "boolean" }).notNull().default(false),
  cert: text("cert"),
  key: text("key"),
  rewrites: text("rewrites", { mode: "json" }).notNull().default([]).$type<
    {
      path: string;
      protocol: "http" | "https";
      host: string;
      port: number;
      conf?: string;
    }[]
  >(),
});

export const proxyStacksJoins = relations(proxyStacks, ({ many }) => ({
  hosts: many(proxyHosts),
}));

export const proxyHostsJoins = relations(proxyHosts, ({ one }) => ({
  stack: one(proxyStacks, {
    fields: [proxyHosts.stackId],
    references: [proxyStacks.id],
  }),
}));
