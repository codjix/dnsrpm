"use server";
import { db } from "#db/index";
import { proxyHosts, proxyStacks, dnsHosts, dnsStacks } from "#db/schema";

const EnabledOptions = {
  where: (stack: Record<string, unknown>, { eq }) => eq(stack?.enabled, true),
  with: { hosts: { where: (host: Record<string, unknown>, { eq }) => eq(host.enabled, true) } },
};

export const GetDnsStacks = async (mode: "count" | "expand", enabled?: boolean) => {
  type DnsType = typeof dnsStacks.$inferSelect;
  interface $DnsStack extends DnsType {
    hosts: (typeof dnsHosts.$inferSelect)[];
  }
  return (await db.query.dnsStacks.findMany({
    with: { hosts: mode === "expand" ? true : { columns: { id: true } } },
    ...(enabled ? EnabledOptions : {}),
  })) as $DnsStack[];
};

export const GetProxyStacks = async (mode: "count" | "expand", enabled?: boolean) => {
  type ProxyType = typeof proxyStacks.$inferSelect;
  interface $ProxyStack extends ProxyType {
    hosts: (typeof proxyHosts.$inferSelect)[];
  }
  return (await db.query.proxyStacks.findMany({
    with: { hosts: mode === "expand" ? true : { columns: { id: true } } },
    ...(enabled ? EnabledOptions : {}),
  })) as $ProxyStack[];
};

export const GetAllStacks = async (mode: "count" | "expand", enabled?: boolean) => {
  return {
    proxy: await GetProxyStacks(mode, enabled),
    dns: await GetDnsStacks(mode, enabled),
  };
};

export default GetAllStacks;
