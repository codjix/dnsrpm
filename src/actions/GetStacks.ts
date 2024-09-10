"use server";
import { count, eq, getTableColumns } from "drizzle-orm";
import { proxyHosts, proxyStacks, dnsHosts, dnsStacks } from "#db/schema";
import { db } from "#db/index";

// ================================================= //

type ProxyType = typeof proxyStacks.$inferSelect;
interface ProxyExpand extends ProxyType {
  hosts: (typeof proxyHosts.$inferSelect)[];
}
interface ProxyCount extends ProxyType {
  count: number;
}
export type ProxyResult<T> = T extends "count" ? ProxyCount : T extends "expand" ? ProxyExpand : never;

export const GetProxyStacks = async <T extends "count" | "expand">(mode: T): Promise<ProxyResult<T>[]> =>
  mode == "count"
    ? ((await db
        .select({ ...getTableColumns(proxyStacks), count: count(proxyHosts.id) })
        .from(proxyStacks)
        .leftJoin(proxyHosts, eq(proxyStacks.id, proxyHosts.stackId))
        .groupBy(proxyStacks.id)) as any)
    : ((await db.query.proxyStacks.findMany({
        with: {
          hosts: true,
        },
      })) as any);

// ================================================= //

type DnsType = typeof dnsStacks.$inferSelect;
interface DnsExpand extends DnsType {
  hosts: (typeof dnsHosts.$inferSelect)[];
}
interface DnsCount extends DnsType {
  count: number;
}
export type DnsResult<T> = T extends "count" ? DnsCount : T extends "expand" ? DnsExpand : never;

export const GetDnsStacks = async <T extends "count" | "expand">(mode: T): Promise<DnsResult<T>[]> =>
  mode == "count"
    ? ((await db
        .select({ ...getTableColumns(dnsStacks), count: count(dnsHosts.id) })
        .from(dnsStacks)
        .leftJoin(dnsHosts, eq(dnsStacks.id, dnsHosts.stackId))
        .groupBy(dnsStacks.id)) as any)
    : ((await db.query.dnsStacks.findMany({
        with: {
          hosts: true,
        },
      })) as any);

// ================================================= //

export const GetAllStacks = async <T extends "count" | "expand">(mode: T) => {
  return {
    dns: await GetDnsStacks<T>(mode),
    proxy: await GetProxyStacks<T>(mode),
  };
};

export default GetAllStacks;
