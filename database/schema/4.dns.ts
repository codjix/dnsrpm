import { MainCols } from "#db/schema";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const dnsStacks = sqliteTable("dns_stacks", {
  ...MainCols,
  name: text("name").unique().notNull(),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
});

export const dnsHosts = sqliteTable("dns_hosts", {
  ...MainCols,
  domain: text("domain").notNull(),
  ip: text("ip").notNull(),
  stackId: integer("stack_id").references(() => dnsStacks.id),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
});

export const dnsStacksJoins = relations(dnsStacks, ({ many }) => ({
  hosts: many(dnsHosts),
}));

export const dnsHostsJoins = relations(dnsHosts, ({ one }) => ({
  stack: one(dnsStacks, {
    fields: [dnsHosts.stackId],
    references: [dnsStacks.id],
  }),
}));
